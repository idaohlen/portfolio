import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Card, CardHeader, Image } from "@heroui/react";
import { handleRedirect } from "@/utils/utils";
import ProjectPreview from "./ProjectPreview";
import IconButton from "@/components/IconButton";

export default function ProjectHighlight({ projects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: "easeOut" 
        }}
        onClick={(e) => openPreview(e, project)}
        key={`project-${project.title}-${index}`}
        tabIndex="0"
        role="button"
        aria-label={`View details for ${project.title} project`}
      >
          <ProjectCard isFooterBlurred={true} className="bg-none">
            <CardHeader className="absolute bottom-0 w-full justify-center">
              <div className="flex gap-1">
                {project.repoUrl && (
                  <IconButton
                    icon="mdi:github"
                    textColor="black"
                    label="GitHub"
                    className="bg-white/80"
                    onPress={() => handleRedirect(project.repoUrl)}
                  />
                )}
                {project.previewUrl && (
                  <IconButton
                    icon="material-symbols:search-rounded"
                    textColor="black"
                    className="bg-white/80"
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
              className="z-0 w-full object-cover h-[200px] md:h-[300px]"
              src={`/images/projects/min/${project.images[0]}`}
            />
          </ProjectCard>
        </motion.div>
      ))}
      <ProjectPreview
        isOpen={modalOpen}
        onOpen={setModalOpen}
        project={selectedProject}
        onClose={closePreview}
      />
    </div>
  );
}

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  outline: 3px solid transparent;
  outline-offset: -2px;
  transition: all 0.3s;

  *:focus > & {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }

  &:hover {
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 0px;
  }

  *:focus:hover > & {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }
`;
