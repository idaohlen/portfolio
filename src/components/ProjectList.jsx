import { useState } from 'react'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import ProjectPreview from '@/components/ProjectPreview'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff2e;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  border: 1px solid transparent;
  transition: all .3s;

  &:hover {
    cursor: pointer;
    border-color: white;
  }
`

const Title = styled.div`
  font-weight: 800;
  margin-right: auto;
`

const ExtLink = styled.div`
  display: flex;
  align-items: center;
  gap: .3rem;
`

export default function ProjectList({projects}) {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  function openPreview(e, project) {
    if (!e.target.closest('.link')) {
      setSelectedProject(project)
      setModalOpen(true)
    }
  }

  function closePreview() {
    setModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className='flex flex-col gap-2'>
      {projects.map(project => (
        <Card key={`${project.title}-${project.date}`} onClick={(e) => openPreview(e, project)}>

        <div className='flex align-top gap-2 mb-2'>
          <Title>{project.title}</Title>
          <ExtLink className='link'>
            <Icon icon='mdi:github' className='text-2xl' />
            <a href={project.repoUrl}>GitHub</a>
          </ExtLink>
          <ExtLink className='link'>
            <Icon icon='material-symbols:search-rounded' className='text-2xl' />
            <a href={project.previewUrl}>Preview</a>
          </ExtLink>
        </div>

          <div className='text-sm'>{project.tagline}</div>

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