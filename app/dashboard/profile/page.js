import React from 'react'

import ProfilePage from './components/ProfilePage';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-100">
    <div className="flex flex-row w-full h-screen ">
      <ProfilePage/>
    </div>
    </div>
  );
}

export default page
