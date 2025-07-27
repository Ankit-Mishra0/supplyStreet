"use client";
import React, { useEffect } from "react";

import MyListingPage from "./components/MyProducts";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row w-full h-screen bg-gradient-to-r">
        <MyListingPage />
      </div>
    </div>
  );
};

export default page;
