import { useState, useMemo } from 'react'
import { Tabs, Tab, Input } from '@heroui/react'
import ProjectList from '@/components/ProjectList'
import PageTransition from '@/components/PageTransition'
import PageTitle from '@/components/PageTitle'
import schoolProjects from '@/data/projects/school-work.js'
import personalProjects from '@/data/projects/personal.js'
import otherProjects from '@/data/projects/other.js'

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filters, setFilters] = useState([])

  const allProjects = useMemo(() => {
    return [
      ...schoolProjects.map(project => ({ ...project, category: 'school' })),
      ...personalProjects.map(project => ({ ...project, category: 'personal' })),
      ...otherProjects.map(project => ({ ...project, category: 'other' }))
    ]
  }, [])

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let projects = allProjects;
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      projects = projects.filter(project => project.category === selectedCategory)
    }
    
    if (filters.length > 0) {
      projects = projects.filter(project => {
        return filters.every(filter => project.tags.includes(filter))
      })
    }
    
    // Sort by year (newest first)
    return projects.sort((a, b) => {
      return b.year - a.year;
    })
    
  }, [allProjects, selectedCategory, filters])

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

        <ProjectList projects={filteredProjects} />
      </div>
    </PageTransition>
  )
}