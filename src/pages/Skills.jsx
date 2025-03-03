import PageTransition from '@/components/PageTransition'


export default function Page() {

  return (
    <PageTransition>
      <div className='page'>
        <h1>Skills</h1>

        <h2>Web development</h2>

        <ul>
          <li>HTML & CSS</li>
          <li>JavaScript & TypeScript</li>
          <li>Vue.js</li>
          <li>React</li>
          <li>PHP</li>
        </ul>

        <h2>Graphic design</h2>
        
      </div>
    </PageTransition>
  )
}