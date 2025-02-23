import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

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
        <Icon icon='mdi:linkedin'/>
        <Icon icon='mdi:github'/>
      </div>
    </motion.div>
  )
}