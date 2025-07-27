import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '@/components/Navbar'
import ProfilePage from './components/ProfilePage';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
    <div className="flex flex-row w-full h-screen">
      
      <Sidebar />
      <ProfilePage/>
    </div>
    </div>
  );
}

export default page
