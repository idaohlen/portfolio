import { useState, useMemo } from 'react'
import { useFilter } from '@react-aria/i18n'
import { Tabs, Tab, Autocomplete, AutocompleteItem } from '@heroui/react'
import ProjectList from '@/components/ProjectList'
import PageTransition from '@/components/PageTransition'
import PageTitle from '@/components/PageTitle'
import schoolProjects from '@/data/projects/school-work.js'
import personalProjects from '@/data/projects/personal.js'
import otherProjects from '@/data/projects/other.js'

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [availableTags, setAvailableTags] = useState([])
  const { startsWith } = useFilter({ sensitivity: 'base' })

  const allProjects = useMemo(() => {
    return [
      ...schoolProjects.map(project => ({ ...project, category: 'school' })),
      ...personalProjects.map(project => ({ ...project, category: 'personal' })),
      ...otherProjects.map(project => ({ ...project, category: 'other' }))
    ]
  }, [])

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
  useMemo(() => {
    setAvailableTags(allTags)
  }, [allTags])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let projects = allProjects
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      projects = projects.filter(project => project.category === selectedCategory)
    }
    
    // Apply tag filter if one is selected
    if (selectedTag) {
      projects = projects.filter(project => 
        Array.isArray(project.tags) && project.tags.includes(selectedTag)
      )
    }
    
    // Sort by year (newest first)
    return projects.sort((a, b) => b.year - a.year)
  }, [allProjects, selectedCategory, selectedTag])

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

        <Tabs
          aria-label='Project categories'
          className='my-4'
          selectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
          classNames={{
            tabList: 'bg-white/20',
            tabContent: 'text-white'
          }}
        >
          <Tab key="all" title='All' />
          <Tab key="school" title='School' />
          <Tab key="personal" title='Personal' />
          <Tab key="other" title='Other' />
        </Tabs>
        <Autocomplete
          className="max-w-xs mb-4"
          inputValue={inputValue}
          items={availableTags}
          aria-label="Filter by tag"
          placeholder="Filter by tag"
          selectedKey={selectedTag}
          onInputChange={handleInputChange}
          onOpenChange={handleOpenChange}
          onSelectionChange={handleSelectionChange}
          isClearable={true}
          classNames={{
            base: "text-white",
            label: "text-white",
            listbox: "bg-zinc-800",
            popoverContent: "bg-zinc-800"
          }}
        >
          {(tag) => <AutocompleteItem key={tag.key}>{tag.label}</AutocompleteItem>}
        </Autocomplete>
        <ProjectList projects={filteredProjects} />
      </div>
    </PageTransition>
  )
}