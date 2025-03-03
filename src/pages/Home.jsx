import { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import config from '@/config'
import PageTransition from '../components/PageTransition'


export default function Page() {

  return (
    <PageTransition>
      <div className='page flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-kumar-one text-white'>Ida Öhlén</h1>
        <p className='text-2xl text-yellow-400'>Fullstack Developer</p>
        <div className='flex flex-row justify-center text-4xl'>
          {Object.values(config.contactLinks).map(link =>
            <Icon icon={link.icon} key={link.title} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}