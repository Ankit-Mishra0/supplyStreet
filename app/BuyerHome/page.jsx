import React from 'react'
import BuyerHome from './components/BuyerHome'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div>
      <Navbar />
      <div className=' pt-18'>
      <BuyerHome/>
      </div>
    </div>
  )
}

export default page
