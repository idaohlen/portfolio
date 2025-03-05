import { Chip } from '@heroui/react'
import PageTransition from '@/components/PageTransition'
import Divider from '@/components/Divider'
import PageTitle from '@/components/PageTitle'

export default function Page() {

  const webDev = [
    { label: 'HTML', info: '' },
    { label: 'CSS', info: '' },
    { label: 'JavaScript', info: '' },
    { label: 'TypeScript', info: '' },
    { label: 'Sass', info: '' },
    { label: 'Vue.js', info: '2019' },
    { label: 'React', info: '2024' },
    { label: 'PHP', info: '' },
  ]

  const graphicDesign = [
    { label: 'Figma', info: '' },
    { label: 'Affinity Designer', info: '' },
    { label: 'Affinity Publisher', info: '' },
    { label: 'Adobe Illustrator', info: '' },
    { label: 'Adobe InDesign', info: '' },
  ]

  return (
    <PageTransition>
      <div className='page'>
        <PageTitle title='Skills' icon='iconamoon:lightning-1-light' />

        <h2>Web development</h2>
        <div className="flex flex-wrap gap-2">
          { webDev.map(item => 
            <Chip
              variant='flat'
              className='bg-white/20 text-white'
              key={item.label}>{item.label}
            </Chip>
        )}
        </div>

        <Divider />

        <h2>Graphic design</h2>
        <div className="flex flex-wrap gap-2">
          { graphicDesign.map(item =>
            <Chip
              variant='flat'
              className='bg-white/20 text-white'
              key={item.label}>{item.label}
            </Chip>
          )}
        </div>
        
      </div>
    </PageTransition>
  )
}