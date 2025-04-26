import { useState, useRef, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import styled from "styled-components";
import { Card, CardHeader, Image } from "@heroui/react";
import { handleRedirect } from "@/utils/utils";
import ProjectPreview from "./ProjectPreview";
import IconButton from "@/components/IconButton";

export default function ProjectHighlight({ projects }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectRefs = useRef([]);

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

  // Initialize the animation when the component mounts
  useEffect(() => {
    // First set initial opacity to 0
    projectRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = "0";
        ref.style.transform = "translateY(20px)";
      }
    });

    // Then animate them in with staggered timing
    anime({
      targets: projectRefs.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(150),
      easing: "easeOutCubic",
      complete: function() {
        // Ensure elements remain visible after animation
        projectRefs.current.forEach(ref => {
          if (ref) {
            ref.style.opacity = "1";
            ref.style.transform = "translateY(0)";
          }
        });
      }
    });
  }, [projects.length]); // Only re-run when projects array changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <div
          ref={el => (projectRefs.current[index] = el)}
          style={{ opacity: 0 }}
          onClick={(e) => openPreview(e, project)}
          key={`project-${project.title}-${index}`}
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
        </div>
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

  &:hover {
    cursor: pointer;
    outline: 2px solid white;
    outline-offset: 0px;
  }
`;
