import React from 'react'
// import Sidebar from '../components/Sidebar'
// import Navbar from '@/components/Navbar'
import MyListingPage from './components/MyProducts';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-100">
      
      {/* <Sidebar /> */}
      <MyListingPage/>
     
    </div>
    </div>
  );
}

export default page
