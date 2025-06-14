import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";

import config from "@/config";
import { handleRedirect } from "@/utils/utils";

import PageTransition from "@/components/PageTransition";
import IconButton from "@/components/IconButton";
import Divider from "@/components/Divider";
import ProjectHighlight from "@/components/ProjectHighlight";

import { featuredProjects } from "@/data/projects/featured.js";

const webDevSkills = [
  { label: "HTML", icon: "material-icon-theme:html" },
  { label: "CSS", icon: "material-icon-theme:css" },
  { label: "JavaScript", icon: "material-icon-theme:javascript" },
  { label: "TypeScript", icon: "material-icon-theme:typescript" },
  { label: "React", icon: "material-icon-theme:react" },
  { label: "Vue", icon: "material-icon-theme:vue" },
  { label: "Node.js", icon: "material-icon-theme:nodejs" },
  { label: "Express.js", icon: "mdi:api" },
];

const designSkills = [
  {label: "Figma", icon: "material-icon-theme:figma" },
  {label: "Affinity Designer", icon: "vscode-icons:file-type-affinitydesigner" },
  {label: "Affinity Publisher", icon: "vscode-icons:file-type-affinitypublisher" },
  {label: "Adobe Photoshop", icon: "devicon:photoshop" },
  {label: "Illustration", icon: "emojione:artist-palette" },
  {label: "Graphic Design", icon: "emojione:desktop-computer" },
];

const introSections = [
  {
    id: 0,
    icon: "streamline-pixel:interface-essential-light-bulb",
    className: "pink",
    text: `I am a passionate web developer with experience in building modern, responsive websites and applications.`,
  },
  {
    id: 1,
    icon: "streamline-pixel:computer-old-electronics",
    className: "yellow",
    text: `I specialize in <b>JavaScript</b>, <b>React</b>, and <b>Vue.js</b>, and I enjoy solving challenging design problems and creating intuitive user experiences.`,
  },
  {
    id: 2,
    icon: "streamline-pixel:design-color-brush-paint",
    className: "blue",
    text: `In addition to web development, I am also an illustrator and graphic designer, combining my technical and creative skills to deliver unique and engaging projects.`,
  },
];

export default function Page() {
  const [animationStates, setAnimationStates] = useState(
    introSections.map(() => false)
  );

  useEffect(() => {
    // Trigger animations in sequence
    introSections.forEach((_, index) => {
      setTimeout(() => {
        setAnimationStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      }, 200 + (index * 300));
    });
  }, []);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-[7rem] pb-10">
          <div>
            <Avatar isBordered src="/images/profile_img.png" color="warning" className="w-[200px] h-[200px] text-large" />
          </div>
          <div>
            <h1 className="text-5xl text-center font-kumar-one text-white mb-0">
              Ida Öhlén
            </h1>
            <p className="text-2xl text-center text-yellow-400 mt-0">
              Fullstack Web Developer
            </p>
            <div className="flex flex-row justify-center text-4xl">
              {Object.values(config.contactLinks).map((link) => (
                <IconButton
                  icon={link.icon}
                  key={link.title}
                  label={link.title}
                  textColor="white"
                  buttonSize="lg"
                  iconSize="4xl"
                  onPress={() => handleRedirect(link.url)}
                  tooltipPos="bottom"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <IntroWrapper className="w-full flex justify-center">
          <IntroContentWrapper className="max-w-2xl p-8 text-white mb-0 mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-4 relative">
              {introSections.map((section, index) => (
                <IntroSection
                  className={`intro-section ${section.className}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={animationStates[index] ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{
                    duration: 1.4,
                    type: "tween",
                  }}

                  layoutId={`intro-section-${section.id}`}
                  key={`intro-section-${section.id}`}
                  id={`intro-section-${section.id}`}
                  onAnimationComplete={() => {
                    const element = document.getElementById(`intro-section-${section.id}`);
                    if (element) {
                      element.classList.add("animation-complete");
                    }
                  }}
                >
                  <Icon
                    icon={section.icon}
                    className="icon text-[6rem] xs:text-[4rem] max-sm:pt-4"
                  />
                  <div className="box">
                    <div dangerouslySetInnerHTML={{ __html: section.text }} />
                  </div>
                </IntroSection>
              ))}
            </div>
          </IntroContentWrapper>
        </IntroWrapper>

        <Divider />

        {/* Skills Overview */}
        <div className="max-w-xl w-full px-4">
          <h2 className="text-3xl mb-8 text-center">
            Skills Overview
          </h2>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {webDevSkills.map((skill) => (
              <Chip
                key={skill.label}
                variant="flat"
                className="bg-white/20 text-white text-lg"
                size="lg"
                startContent={<Icon icon={skill.icon} className="text-2xl" />}
              >
                {skill.label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {designSkills.map((skill) => (
              <Chip
                key={skill.label}
                variant="flat"
                className="bg-white/20 text-white text-lg"
                size="lg"
                startContent={<Icon icon={skill.icon} className="text-2xl" />}
              >
                {skill.label}
              </Chip>
            ))}
          </div>
        </div>

        <Divider />

        {/* Featured projects */}
        <div className="max-w-[900px] text-center m-4 mt-0 ">
          <h2 className="mb-8 text-3xl">Featured projects</h2>
          <ProjectHighlight projects={featuredProjects(3)} />
          <Link to="/projects" aria-label="See more projects">
            <Button
              variant="flat"
              size="lg"
              className="mt-6 text-white bg-white/20"
              onPress={(e) => e.preventDefault()}
              tabIndex="-1"
            >
              See more projects
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

const IntroSection = styled(motion.div)`
  ${tw`
    grid grid-cols-1 xs:grid-cols-[5rem_1fr] gap-4 xs:gap-2 items-center
  `};
  transform: scale(1) translateZ(0);
  border: 1px solid transparent;
  will-change: transform, opacity;

  &.animation-complete {
    transition: all 0.3s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.365);
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transform: scale(1.1) translateZ(0);
    }
  }

  .box {
    padding: 1rem 1rem;
    border-radius: 8px;
    border: 1px solid;
    border-color: transparent;
    ${tw`text-left`};
    /* border-color: var(--color-faded); */
    /* background-color: var(--bg); */
  }

  .icon {
    color: var(--color);
    margin: 0 auto;
  }

  &.pink {
    --color: rgb(255, 189, 226);
    --color-faded: rgba(255, 157, 244, 0.5);
    --bg: rgba(209, 42, 168, 0.2);
  }
  &.yellow {
    --color: rgb(236, 201, 180);
    --color-faded: rgba(255, 197, 61, 0.4);
    --bg: rgba(255, 197, 61, 0.2);
  }
  &.green {
    --color-faded: rgba(48, 201, 140, 0.5);
    --bg: rgba(48, 201, 140, 0.2);
  }
  &.blue {
    --color: rgb(200, 173, 255);
    --color-faded: rgba(137, 198, 255, 0.5);
    --bg: rgba(137, 198, 255, 0.2);
  }
`;

const IntroWrapper = styled.div`
  /* background: linear-gradient(-20deg, #4b73b7, #6ee1b3); */
`;
const IntroContentWrapper = styled.div`
  transform: translateZ(0);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
`;
