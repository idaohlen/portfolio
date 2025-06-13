import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Button } from "@heroui/react";
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
  "CSS",
  "JavaScript",
  "React",
  "Vue.js",
  "Node.js",
  "Express.js",
];

const designSkills = [
  "Figma",
  "Affinity Designer",
  "Adobe Photoshop",
  "Illustration",
  "Graphic Design",
];

const introSections = [
  {
    id: 0,
    icon: "mingcute:lightning-line",
    className: "pink",
    text: `I am a passionate web developer with experience in building modern, responsive websites and applications.`,
  },
  {
    id: 1,
    icon: "mingcute:code-line",
    className: "yellow",
    text: `I specialize in <b>JavaScript</b>, <b>React</b>, and <b>Vue.js</b>, and I enjoy solving challenging design problems and creating intuitive user experiences.`,
  },
  {
    id: 2,
    icon: "mingcute:paint-brush-ai-line",
    className: "blue",
    text: `In addition to web development, I am also an illustrator and graphic designer, combining my technical and creative skills to deliver unique and engaging projects.`,
  },
];

export default function Page() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const introWrapperRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const hasAnimatedRef = useRef(false);

  // Setup intersection observer to detect when intro section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasScrolled &&
          !hasAnimatedRef.current
        ) {
          // Instead of running animation directly, set state to trigger animation
          setShouldAnimate(true);
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = introWrapperRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasScrolled]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="mt-[7rem] pb-10">
          <h1 className="text-5xl text-center font-kumar-one text-white">
            Ida Öhlén
          </h1>
          <p className="text-2xl text-center text-yellow-400">
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

        {/* Intro Section */}
        <IntroWrapper className="w-full flex justify-center">
          <IntroContentWrapper
            className="max-w-2xl p-8 text-white mb-0 mt-8 flex flex-col gap-4"
            ref={introWrapperRef}
          >
            <div className="flex flex-col gap-4 relative">
              {introSections.map((section, index) => (
                <IntroSection
                  className={`intro-section ${section.className}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.25,
                    type: "tween"
                  }}
                  style={{
                    transformOrigin: "center", // Add this for better scale animations
                    position: "relative" // Add this to maintain proper layout during animation
                  }}
                  layoutId={`intro-section-${section.id}`}
                  key={`intro-section-${section.id}`}
                  id={`intro-section-${section.id}`}
                  onAnimationComplete={() => {
                    const element = document.getElementById(`intro-section-${section.id}`);
                    if (element) {
                      element.classList.add('animation-complete');
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
        <div className="max-w-lg w-full px-4">
          <h2 className="text-xl text-white font-bold mb-4 text-center">
            Skills Overview
          </h2>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {webDevSkills.map((skill) => (
              <Chip
                key={skill}
                variant="flat"
                className="bg-white/20 text-white"
                size="lg"
              >
                {skill}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {designSkills.map((skill) => (
              <Chip
                key={skill}
                variant="flat"
                className="bg-white/20 text-white"
                size="lg"
              >
                {skill}
              </Chip>
            ))}
          </div>
        </div>

        <Divider />

        {/* Featured projects */}
        <div className="max-w-[900px] text-center m-4 mt-0 ">
          <h2 className="mb-6">Featured projects</h2>
          <ProjectHighlight projects={featuredProjects(3)} />
          <Link to="/projects">
            <Button
              variant="flat"
              size="lg"
              className="mt-6 text-white bg-white/20"
              onPress={(e) => e.preventDefault()}
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
  transform: scale(0) translateZ(0);
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
    ${tw`text-center xs:text-left sm:text-center`};
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
