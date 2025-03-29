import config from '@/config'
import { Accordion, AccordionItem } from '@heroui/react'

import PageTransition from '@/components/PageTransition'
import ExperienceList from '@/components/ExperienceList'
import Divider from '@/components/Divider'
import PageTitle from '@/components/PageTitle'

import education from '@/data/education'
import courses from '@/data/courses'
import work from '@/data/work'

export default function Page() {
  document.title = config.pageTitle + ' - About'

  return (
    <PageTransition>
      <div className='page'>
        <PageTitle title='About' icon='iconamoon:comment-light' />
        <p>I am a problem solver who enjoys learning new things and trying out new technologies. As a web developer I primarily have experience working with <b>CSS</b>, <b>JavaScript</b>, <b>Vue.js</b> and <b>React</b>, but I've also built projects using <b>PHP</b> and have some backend experience working with <b>Node.js</b> and <b>Express.js</b>.</p>

        <p>Aside from web development I also have a great interest in <b>art</b>, <b>storytelling</b> and <b>game development</b>. I have done some freelance work in <b>graphic design</b> and have been building websites for fun since 2005.</p>

        <Divider />

        <Accordion variant='bordered' className='accordion text-white bg-white bg-opacity-10 border-1 rounded-lg border-white border-opacity-20'>
          <AccordionItem
            key='education'
            aria-label='Education'
            title='Education'
            classNames={{
              title: 'text-white text-lg',
              content: 'pt-0',
              indicator: 'text-white'
            }}
          >
            <ExperienceList items={education} />

            <h3 className='font-bold text-lg py-4'>Courses</h3>
            <ul className='list-disc list-inside mb-4'>
              {courses.map(course => <li key={course.title}><b>{course.title}</b> — {course.place} <span className='italic text-teal-200'>({course.date})</span></li>)}
            </ul>

          </AccordionItem>
          <AccordionItem
            key='work'
            aria-label='Work experience'
            title='Work experience'
            classNames={{
              title: 'text-white text-lg',
              content: 'pt-0',
              indicator: 'text-white'
            }}
          >
            <ExperienceList items={work} />
          </AccordionItem>
        </Accordion>

        <Divider />

        <h2>More about me</h2>

      </div>
    </PageTransition>
  )
}