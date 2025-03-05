import config from '@/config'
import PageTransition from '@/components/PageTransition'
import IconButton from '@/components/IconButton'

import { handleRedirect } from '@/utils/utils'

export default function Page() {
  return (
    <PageTransition>
      <div className='page flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-kumar-one text-white'>Ida Öhlén</h1>
        <p className='text-2xl text-yellow-400'>Web Developer</p>
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
    </PageTransition>
  )
}