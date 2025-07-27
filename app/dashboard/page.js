"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

import HomePage from "./components/HomePage";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading || !user)
    return <div className="text-center p-10">Loading...</div>;

  return (
    
    <div className="flex flex-row w-full min-h-screen bg-gradient-to-r ">
      <HomePage user={user} /> {/* Pass user down */}
    </div>

  );
};

export default DashboardPage;
