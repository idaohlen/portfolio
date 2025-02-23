import config from '@/config'
import ExperienceList from '@/components/ExperienceList'
import Divider from '../components/Divider'
import { Icon } from '@iconify/react'

export default function About() {
  document.title = config.pageTitle + ' - About'

  const work = [
    {
      "title": "Graphic Designer",
      "place": "Freelance",
      "location": "Sweden",
      "date": "2007 - current"
    },
    {
      "title": "Service administrator & kitchen assistant",
      "place": "Hotel & Restaurant",
      "location": "Tierp, Sweden",
      "date": "2022 - 2023"
    },
    {
      "title": "Assistant",
      "place": "National Library of Sweden",
      "location": "Bålsta, Sweden",
      "date": "2021"
    }
  ]

  const education = [
    {
      "title": "Full Stack JavaScript Developer",
      "place": "Chas Academy",
      "location": "Stockholm, Sweden",
      "date": "2024 - 2026"
    },
    {
      "title": "Undergraduate in Arts & Design",
      "place": "Basis Konstskola",
      "location": "Stockholm, Sweden",
      "date": "2012 - 2013",
    },
    {
      "title": "Upper Secondary Education Diploma",
      "place": "Ädelfors Folkhögskola",
      "location": "Vetlanda, Sweden",
      "date": "2011 - 2012",
    }
  ]

  return (
    <div className='page'>
      <h1>About me</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente ab provident dolorem fuga velit molestiae nemo necessitatibus maiores mollitia, quibusdam iste nulla, eveniet quis numquam quaerat. Vero, fugit itaque!</p>

      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente ab provident dolorem fuga velit molestiae nemo necessitatibus maiores mollitia, quibusdam iste nulla, eveniet quis numquam quaerat. Vero, fugit itaque!</p>
   
      <h2><Icon icon="material-symbols:diamond"/> Education</h2>
      <ExperienceList items={education} />

      <Divider />

      <h2>Work experience</h2>
      <ExperienceList items={work} />
    </div>
  )
}