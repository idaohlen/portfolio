import config from '@/config'

export default function About() {
  document.title = config.pageTitle + ' - About'

  return (
    <>
    <h1>About me</h1>
    </>
  )
}