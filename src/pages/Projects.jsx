import { useState, useEffect, useMemo } from 'react'
import { useFilter } from '@react-aria/i18n'
import { Tabs, Tab, Autocomplete, AutocompleteItem, Select, SelectItem } from '@heroui/react'
import config from '@/config'
import ProjectList from '@/components/ProjectList'
import PageTransition from '@/components/PageTransition'
import PageTitle from '@/components/PageTitle'
import schoolProjects from '@/data/projects/school-work.js'
import personalProjects from '@/data/projects/personal.js'
import otherProjects from '@/data/projects/other.js'
import { featuredProjects } from '@/data/projects/featured.js'

export default function Page() {
  document.title = config.pageTitle + ' - Projects'

  const [selectedCategory, setSelectedCategory] = useState('featured')
  const [selectedTag, setSelectedTag] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const { startsWith } = useFilter({ sensitivity: 'base' })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480)

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'featured', label: 'Featured' },
    { key: 'school', label: 'School' },
    { key: 'personal', label: 'Personal' },
    { key: 'other', label: 'Other' }
  ];

  const featured = useMemo(() => featuredProjects(6).map(project => ({ ...project, category: 'featured' })), [])

  const allProjects = useMemo(() => {
    return [
      ...schoolProjects.map(project => ({ ...project, category: 'school' })),
      ...personalProjects.map(project => ({ ...project, category: 'personal' })),
      ...otherProjects.map(project => ({ ...project, category: 'other' })),
      ...featured
    ]
  }, [featured])

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set()
    
    allProjects.forEach(project => {
      if (Array.isArray(project.tags)) {
        project.tags.forEach(tag => tagSet.add(tag))
      }
    })
    
    return Array.from(tagSet).sort().map(tag => ({
      key: tag,
      label: tag
    }))
  }, [allProjects])

  // Initialize available tags
  useEffect(() => {
    setAvailableTags(allTags)
  }, [allTags])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let projects = allProjects
    
    // Exclude featured projects when "All" is selected
    if (selectedCategory === 'all') {
      const uniqueProjects = new Map();

      // Add all non-featured projects first
      allProjects
        .filter(project => project.category !== 'featured')
        .forEach(project => {
          uniqueProjects.set(project.title, project);
        });
    
      // Then add any featured projects that weren't already included
      featured.forEach(project => {
        if (!uniqueProjects.has(project.title)) {
          uniqueProjects.set(project.title, project)
        }
      });
      
      // Convert map back to array
      projects = Array.from(uniqueProjects.values())
    }
    // Filter by category if not "all"
    else if (selectedCategory !== 'featured') {
      projects = projects.filter(project => project.category === selectedCategory)
    }
    // Show only featured projects when "Featured" is selected
    else if (selectedCategory === 'featured') {
      projects = featured;
    }
    
    // Apply tag filter if one is selected
    if (selectedTag) {
      projects = projects.filter(project => 
        Array.isArray(project.tags) && project.tags.includes(selectedTag)
      )
    }
    
    // Sort by year (newest first)
    return projects.sort((a, b) => b.year - a.year)
  }, [allProjects, featured, selectedCategory, selectedTag])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 480
      setIsMobile(mobile)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle tag selection
  function handleSelectionChange(key) {
    setSelectedTag(key)
    const selectedItem = allTags.find(tag => tag.key === key)
    setInputValue(selectedItem?.label || '')
  }

  // Handle input change
  function handleInputChange(value) {
    setInputValue(value)
    
    // Clear selection if input is empty
    if (value === '') {
      setSelectedTag(null)
    }
    
    // Filter available tags based on input
    setAvailableTags(
      allTags.filter(tag => startsWith(tag.label.toLowerCase(), value.toLowerCase()))
    )
  }

  // Show all tags when menu is opened manually
  function handleOpenChange(isOpen, menuTrigger) {
    if (menuTrigger === 'manual' && isOpen) {
      setAvailableTags(allTags)
    }
  }

  return (
    <PageTransition>
      <div className='page'>
        <PageTitle title='Projects' icon='ion:code-slash' />
        {isMobile ? (
          // Mobile: Show Select dropdown
          <Select
            aria-label="Project categories"
            className="my-4 w-full sm:max-w-xs"
            defaultSelectedKeys={[selectedCategory]}
            onSelectionChange={(key) => {
              const newKey = typeof key === 'object' ? Array.from(key)[0] : key;
              setSelectedCategory(newKey);
            }}
            classNames={{
              mainWrapper: "bg-white rounded-xl",
              trigger: "bg-white/20 text-zinc-800",
              value: "text-black",
              popoverContent: "bg-zinc-800"
            }}
          >
            {categories.map(category => (
              <SelectItem key={category.key}>{category.label}</SelectItem>
            ))}
          </Select>
        ) : (
          // Desktop: Show Tabs
          <Tabs
            aria-label='Project categories'
            className='my-4'
            selectedKeys={selectedCategory}
            onSelectionChange={setSelectedCategory}
            classNames={{
              tabList: 'bg-white/20',
              tabContent: 'text-white'
            }}
          >
            {categories.map(category => (
              <Tab key={category.key} title={category.label} />
            ))}
          </Tabs>
        )}
        
        <Autocomplete
          className='sm:max-w-xs mb-4'
          inputValue={inputValue}
          items={availableTags}
          aria-label='Filter by tag'
          placeholder='Filter by tag'
          selectedKey={selectedTag}
          onInputChange={handleInputChange}
          onOpenChange={handleOpenChange}
          onSelectionChange={handleSelectionChange}
          isClearable={true}
          classNames={{
            base: 'text-white',
            label: 'text-white',
            listbox: 'bg-zinc-800',
            popoverContent: 'bg-zinc-800'
          }}
        >
          {(tag) => <AutocompleteItem key={tag.key}>{tag.label}</AutocompleteItem>}
        </Autocomplete>
        <ProjectList projects={filteredProjects} />
      </div>
    </PageTransition>
  )
}