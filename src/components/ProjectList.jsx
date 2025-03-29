import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'motion/react'
import { Chip, Tooltip, Pagination } from '@heroui/react'
import ProjectPreview from '@/components/ProjectPreview'
import IconButton from '@/components/IconButton'
import { handleRedirect } from '@/utils/utils'

export default function ProjectList({projects}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 5
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  
  // Get current page projects
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 960)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Helper function to conditionally wrap with tooltip
  function wrapWithTooltip(content, project) {
    if (!isDesktop || !project.images || project.images.length === 0) {
      return content
    }

    return (
      <Tooltip
        key={`${project.title}-${project.date}`}
        content={(<TooltipContent src={`/images/projects/${project.images[0]}`} />)}
        placement='right-start'
        classNames={{
          content: "p-0 overflow-hidden"
        }}
      >
        {content}
      </Tooltip>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <AnimatePresence mode="wait">
        {currentProjects.map((project, index) => {
          const card = (
            <Card
              onClick={(e) => openPreview(e, project)}
              key={`project-${project.title}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.15, 
                ease: "easeOut"
              }}
            >
              <div className='flex align-top gap-1 mb-1'>
                <Title>{project.title}</Title>
                <IconButton icon='mdi:github' textColor='white' label='GitHub' onPress={() => handleRedirect(project.repoUrl)} />
                <IconButton icon='material-symbols:search-rounded' textColor='white' label='Preview' onPress={() => handleRedirect(project.previewUrl)} />
              </div>
              <div className='text-sm'>{project.tagline}</div>
              <div className='flex gap-2 mt-3 text-ellipsis overflow-hidden'>
                {project.tags.map(tag => <Chip key={tag} size='sm' variant='bordered' className='text-white border-small border-white/30'>{tag}</Chip>)}
              </div>
            </Card>
          );
          
          return wrapWithTooltip(card, project);
        })}
      </AnimatePresence>

      {/* Pagination Component - Only show if more than one page */}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination 
            total={totalPages} 
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
            color="primary"
            size="sm"
            variant="light"
            showControls
            classNames={{
              base: "gap-2",
              item: "text-white hover:text-zinc-900 hover:bg-white/90",
              cursor: "bg-white text-zinc-900",
              next: "text-white hover:text-zinc-900",
              prev: "text-white hover:text-zinc-900",
            }}
          />
        </PaginationContainer>
      )}

      <ProjectPreview
        isOpen={modalOpen}
        onOpen={setModalOpen}
        project={selectedProject}
        onClose={closePreview}
      />
    </div>
  )
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all .3s;

  &:hover {
    cursor: pointer;
    border-color: rgba(255, 255, 255, 0.8);
  }
`

const Title = styled.div`
  font-weight: 800;
  margin-right: auto;
`

const TooltipContent = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  width: 190px;
  height: 120px;
  display: block;
`;