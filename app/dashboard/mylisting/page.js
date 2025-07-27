import React from 'react'

import MyListingPage from './components/MyProducts';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
    <div className="flex flex-row w-full h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-100">
      
      <MyListingPage/>
     
    </div>
    </div>
  );
}

export default page
