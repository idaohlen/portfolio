import './App.css'
import { useState } from 'react'
import { Icon } from "@iconify/react";

function App() {

  return (
    <>
      <h1 className='text-4xl'>Ida Öhlén</h1>
      <p className='2xl'>Fullstack Developer</p>
      <div className='flex flex-row justify-center text-4xl'>
        <Icon icon='mdi:linkedin'/>
        <Icon icon='mdi:github'/>
      </div>
    </>
  )
}

export default App
