import config from '@/config'
import { Icon } from '@iconify/react'

import PageTransition from '@/components/PageTransition'
import ExperienceList from '@/components/ExperienceList'
import Divider from '@/components/Divider'

import education from '@/data/education'
import work from '@/data/work'

export default function Page() {
  document.title = config.pageTitle + ' - About'


  return (
    <PageTransition>
      <div className='page'>
        <h1>About me</h1>
        <p>I am a problem solver who enjoys learning new things and trying out new technologies. As a web developer I primarily have experience working with <b>CSS</b>, <b>JavaScript</b> and <b>Vue.js</b>, but I've also built projects using <b>PHP</b>.</p>

        <p>I also have a great interest in <b>art</b>, <b>storytelling</b> and <b>game development</b>.</p>

        <Divider />

        <h2>Education</h2>
        <ExperienceList items={education} />

        <Divider />

        <h2>Work experience</h2>
        <ExperienceList items={work} />

      </div>
    </PageTransition>
  )
}