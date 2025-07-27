"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

// import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
// import Navbar from "@/components/Navbar";

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
    // <div className="flex flex-col min-h-screen">
    //   <Navbar />
    <div className="flex flex-row w-full min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-100">
      {/* <Sidebar /> */}
      <HomePage user={user} /> {/* Pass user down */}
    </div>
    // </div>
  );
};

export default DashboardPage;
