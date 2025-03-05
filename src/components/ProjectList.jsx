import { useState } from 'react'
import styled from 'styled-components'
import ProjectPreview from '@/components/ProjectPreview'
import IconButton from '@/components/IconButton'
import { handleRedirect } from '@/utils/utils'

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

        <div className='flex align-top gap-1 mb-1'>
          <Title>{project.title}</Title>
          <IconButton icon='mdi:github' textColor='white' label='GitHub' onPress={() => handleRedirect(project.repoUrl)} />
          <IconButton icon='material-symbols:search-rounded' textColor='white' label='Preview' onPress={() => handleRedirect(project.previewUrl)} />
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
