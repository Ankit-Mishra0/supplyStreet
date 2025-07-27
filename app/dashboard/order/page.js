"use client"
import React, { useEffect } from 'react'
// import Sidebar from '../components/Sidebar'
import Navbar from '@/components/Navbar'
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import OrderDashboard from './Order';

const page = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login"); 
      }
    }, [user, loading, router]);
  
    if (loading || !user)
      return <div className="text-center p-10">Loading...</div>;
  return (
    <div className='min-h-screen bg-gradient-to-r '>
      <Navbar/>
      <OrderDashboard/>
      {/* <Sidebar /> */}
    </div>
  )
}

export default page
