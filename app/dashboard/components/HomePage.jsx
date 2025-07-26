"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState("");

  const colorOptions = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();

          // 🔧 Check `data.image` before setting state
          if (!data.image) {
            const randomColor =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            setBgColor(randomColor);
          }

          setUserData(data);
        }
      }
    };

    fetchUserData();
  }, []);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();

  return (
    <div className="lg:w-[90%] md:w-[80%] w-[70%] flex flex-col items-center justify-center h-full">
      {userData?.image ? (
        <Image
          src={userData.image}
          alt="Profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div
          className={`w-24 h-24 rounded-full ${bgColor} flex font-bold text-7xl items-center justify-center mb-4 text-white`}
        >
          {getInitial(userData?.name)}
        </div>
      )}
    </div>
  );
};

export default HomePage;
