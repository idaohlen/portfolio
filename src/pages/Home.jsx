import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import config from '@/config'

export default function Home() {

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className='page flex flex-col items-center justify-center'
    >
      <h1 className='text-4xl font-kumar-one text-white'>Ida Öhlén</h1>
      <p className='text-2xl text-yellow-400'>Fullstack Developer</p>
      <div className='flex flex-row justify-center text-4xl'>
        {Object.values(config.contactLinks).map(link =>
          <Icon icon={link.icon} key={link.title} />
        )}
      </div>
    </motion.div>
  )
}