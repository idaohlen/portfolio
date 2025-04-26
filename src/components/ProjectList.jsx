import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Chip,
  Tooltip,
  Pagination,
  Image,
  Card,
  CardHeader,
  CardFooter,
} from "@heroui/react";
import ProjectPreview from "@/components/ProjectPreview";
import IconButton from "@/components/IconButton";
import { handleRedirect } from "@/utils/utils";

export default function ProjectList({ projects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current page projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  useEffect(() => { setCurrentPage(1) }, [projects]);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 960);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function openPreview(e, project) {
    if (!e.target.closest(".link")) {
      setSelectedProject(project);
      setModalOpen(true);
    }
  }

  function closePreview() {
    setModalOpen(false);
    setSelectedProject(null);
  }

  // Helper function to conditionally wrap with tooltip
  function wrapWithTooltip(content, project, index) {
    if (!isDesktop || !project.images || project.images.length === 0) {
      return content;
    }

    const placement = index % 2 === 0 ? "left-start" : "right-start";

    return (
      <Tooltip
        key={`${project.title}-${project.date}`}
        content={
          <TooltipContent
            src={`/images/projects/min/${project.images[0]}`}
            className="object-cover"
          />
        }
        placement={placement}
        classNames={{
          content: "p-0 overflow-hidden",
        }}
      >
        {content}
      </Tooltip>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentProjects.map((project, index) => {
          const card = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: "easeOut" 
              }}
              onClick={(e) => openPreview(e, project)}
              key={`project-${project.title}-${index}`}
            >
              <ProjectCard isFooterBlurred={true} className="bg-none">
                <CardHeader className="absolute">
                  <div className="absolute right-3 top-3 flex gap-1">
                    {project.repoUrl && (
                      <StyledIconButton
                        icon="mdi:github"
                        textColor="black"
                        label="GitHub"
                        onPress={() => handleRedirect(project.repoUrl)}
                      />
                    )}
                    {project.previewUrl && (
                      <StyledIconButton
                        icon="material-symbols:search-rounded"
                        textColor="black"
                        label="Preview"
                        onPress={() => handleRedirect(project.previewUrl)}
                      />
                    )}
                  </div>
                </CardHeader>
                <Image
                  removeWrapper
                  radius="none"
                  alt={project.title}
                  className="z-0 w-full h-full object-cover"
                  height={140}
                  src={`/images/projects/min/${project.images[0]}`}
                  width={200}
                />
                <ProjectFooter className="flex flex-col h-full">
                  <Title>{project.title}</Title>
                  <div className="text-sm flex-1">{project.tagline}</div>
                  <div className="flex gap-2 mt-3 text-ellipsis overflow-hidden">
                    {project.tags.map((tag) => (
                      <Chip key={tag} size="sm" variant="bordered">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </ProjectFooter>
              </ProjectCard>
            </motion.div>
          );

          return wrapWithTooltip(card, project, index);
        })}
      </div>

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
    </>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  outline: 3px solid transparent;
  outline-offset: -2px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 0px;
  }
`;

// const Card = styled(motion.div)`
//   display: flex;
//   flex-direction: column;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 8px;
//   padding: 1rem;
//   flex: 1;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   transition: all .3s;

//   &:hover {
//     cursor: pointer;
//     border-color: rgba(255, 255, 255, 0.8);
//   }
// `

const ProjectFooter = styled(CardFooter)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
`;
const StyledIconButton = styled(IconButton)`
  background-color: rgba(255, 255, 255, 0.8);
`;

const Title = styled.div`
  font-weight: 800;
  margin-right: auto;
`;

const TooltipContent = styled(Image)`
  width: 190px;
  height: 120px;
  display: block;
  border: 1px solid white;
`;
