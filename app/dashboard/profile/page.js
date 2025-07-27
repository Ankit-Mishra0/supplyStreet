"use client"
import React, { useEffect } from "react";

import ProfilePage from "./components/ProfilePage";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
const LoginPage = () => {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-r ">
      <div className="flex flex-row w-full h-screen ">
        <ProfilePage />
      </div>
    </div>
  );
};

export default LoginPage;
