import { useState } from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import ProjectPreview from '@/components/ProjectPreview'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff2e;
  border-radius: 8px;
  padding: 1.4rem;
  flex: 1;
`

const Title = styled.div`
  font-weight: 800;
`

const ExtLink = styled.div`
  display: flex;
  align-items: center;
  gap: .3rem;
  margin-top: 1rem;
`

export default function ProjectList({projects}) {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  function openPreview(project) {
    setSelectedProject(project)
    setModalOpen(true)
  }

  function closePreview() {
    setModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className='flex flex-col gap-2'>
      {projects.map(project => (
        <Card key={`${project.title}-${project.date}`} onClick={() => openPreview(project)}>
          <Title>{project.title}</Title>
          <div>{project.tagline}</div>
          <div className='flex gap-2 mt-auto'>
            <ExtLink>
              <Icon icon='mdi:github' className='text-2xl' />
              <a href={project.repoUrl}>GitHub</a>
            </ExtLink>
            <ExtLink>
              <Icon icon='material-symbols:search-rounded' className='text-2xl' />
              <a href={project.previewUrl}>Preview</a>
            </ExtLink>
          </div>
        </Card>
      ))}
      <ProjectPreview
        isOpen={modalOpen}
        onOpen={setModalOpen}
        project={selectedProject}
        onClose={closePreview}
      />
    </div>
  )
}