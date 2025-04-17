import { Chip, Button } from '@heroui/react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import styled from 'styled-components'
import tw from 'twin.macro'

import config from '@/config'
import { handleRedirect } from '@/utils/utils'

import PageTransition from '@/components/PageTransition'
import IconButton from '@/components/IconButton'
import Divider from '@/components/Divider'
import ProjectHighlight from '@/components/ProjectHighlight'

import { featuredProjects } from '@/data/projects/featured.js'

export default function Page() {
  
  const webDevSkills = [
    'CSS', 'JavaScript', 'React', 'Vue.js', 'Node.js', 'Express.js'
  ]

  const designSkills = [
    'Figma', 'Affinity Designer', 'Adobe Photoshop', 'Illustration', 'Graphic Design'
  ]

  return (
    <PageTransition>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='mt-[7rem] pb-10'>
          <h1 className='text-5xl text-center font-kumar-one text-white'>Ida Öhlén</h1>
          <p className='text-2xl text-center text-yellow-400'>Fullstack Web Developer</p>
          <div className='flex flex-row justify-center text-4xl'>
            {Object.values(config.contactLinks).map(link =>
              <IconButton
                icon={link.icon}
                key={link.title}
                label={link.title}
                textColor='white'
                buttonSize='lg'
                iconSize='4xl'
                onPress={() => handleRedirect(link.url)}
                tooltipPos='bottom'
              />
            )}
          </div>
        </div>

        {/* Intro Section */}
        <IntroWrapper className='w-full flex justify-center'>
          <div className='max-w-2xl p-8 text-white mb-0 mt-8 flex flex-col gap-4'>
            <IntroSection className='pink sm:mr-[8rem]'>
              <Icon icon='mingcute:lightning-line' className='icon text-[6rem] xs:text-[4rem] max-sm:pt-4' />
              <div className='box'>I am a passionate web developer with experience in building modern, responsive websites and applications.</div>
            </IntroSection>
            <IntroSection className='yellow sm:ml-[2rem] sm:mr-[4rem]'>
              <Icon icon='mingcute:code-line' className='icon text-[6rem] xs:text-[4rem] max-sm:pt-4' />
              <div className='box'>I specialize in <b>JavaScript</b>, <b>React</b>, and <b>Vue.js</b>, and I enjoy solving challenging design problems and creating intuitive user experiences.</div>
            </IntroSection>
            <IntroSection className='blue sm:ml-[5rem]'>
              <Icon icon='mingcute:paint-brush-ai-line' className='icon text-[6rem] xs:text-[4rem] max-sm:pt-4' />
              <div className='box'>In addition to web development, I am also an illustrator and graphic designer, combining my technical and creative skills to deliver unique and engaging projects.</div>
            </IntroSection>
          </div>
        </IntroWrapper>

        <Divider />

        {/* Skills Overview */}
        <div className='max-w-lg w-full px-4'>
          <h2 className='text-xl text-white font-bold mb-4 text-center'>Skills Overview</h2>
          <div className='flex flex-wrap gap-2 justify-center mb-6'>
            {webDevSkills.map(skill => (
              <Chip
                key={skill}
                variant='flat'
                className='bg-white/20 text-white'
                size='lg'
              >
                {skill}
              </Chip>
            ))}
          </div>
          <div className='flex flex-wrap gap-2 justify-center'>
            {designSkills.map(skill => (
              <Chip
                key={skill}
                variant='flat'
                className='bg-white/20 text-white'
                size='lg'
              >
                {skill}
              </Chip>
            ))}
          </div>
        </div>

        <Divider />

        {/* Featured projects */}
        <div className='max-w-[900px] text-center m-4 mt-0 '>
          
          <h2 className='mb-6'>Featured projects</h2>
          <ProjectHighlight projects={featuredProjects(3)} />
          <Link to='/projects'>
            <Button variant="flat" size="lg" className='mt-6 text-white bg-white/20' onPress={(e) => e.preventDefault()}>See more projects</Button>
          </Link>
        </div>
        
      </div>
    </PageTransition>
  )
}

const IntroSection = styled.div`
  ${tw`
    grid grid-cols-1 xs:grid-cols-[5rem_1fr] gap-4 xs:gap-2 items-center
  `};

  border: 1px solid transparent;
  transition: all .3s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.365);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    scale: 1.1;
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
    --bg: rgba(255, 197, 61, .2);
  }
  &.green {
    --color-faded: rgba(48, 201, 140, 0.5);
    --bg: rgba(48, 201, 140, .2);
  }
  &.blue {
    --color: rgb(200, 173, 255);
    --color-faded: rgba(137, 198, 255, 0.5);
    --bg: rgba(137, 198, 255, .2);
  }
`

const IntroWrapper = styled.div`
/* background: linear-gradient(-20deg, #4b73b7, #6ee1b3); */
`