import React from 'react'
import Sidebar from './components/Sidebar'
import HomePage from './components/HomePage'

const page = () => {
  return (
    <div className='flex flex-row w-full h-screen'>
      <Sidebar />
      <HomePage />
    </div>
  )
}

export default page
