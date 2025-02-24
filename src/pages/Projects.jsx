import ProjectList from '@/components/ProjectList'
import PageTransition from '@/components/PageTransition'
import schoolProjects from '@/data/school-projects.js'

export default function Projects() {

  return (
    <PageTransition>
      <div className='page'>
        <h1>Projects</h1>

        <h2>School projects</h2>
        <ProjectList projects={schoolProjects} />

      </div>
    </PageTransition>
  )
}