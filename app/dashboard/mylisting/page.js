"use client";
import React, { useEffect } from "react";

import MyListingPage from "./components/MyProducts";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

const ProductListingPage = () => {
  const { user, loading } = useAuth();
      const Router = useRouter();
    
      useEffect(() => {
        if (!loading && !user) {
          Router.push("/login"); 
        }
      }, [user, loading, Router]);
    
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

export default ProductListingPage;
