import { Tabs, Tab } from '@heroui/react'
import ProjectList from '@/components/ProjectList'
import PageTransition from '@/components/PageTransition'
import PageTitle from '@/components/PageTitle'
import schoolProjects from '@/data/school-projects.js'
import games from '@/data/games.js'

export default function Page() {

  return (
    <PageTransition>
      <div className='page'>
        <PageTitle title='Projects' icon='ion:code-slash' />

        <Tabs
          aria-label='Project categories'
          className='my-4'
          classNames={{
            tabList: 'bg-white/20',
            tab: '',
            tabContent: 'text-white'
          }}
        >
        <Tab key="school" title='School work'>
          <ProjectList projects={schoolProjects} />
        </Tab>
        <Tab key="games" title='Games'>
          <ProjectList projects={games} />
        </Tab>
      </Tabs>

      </div>
    </PageTransition>
  )
}