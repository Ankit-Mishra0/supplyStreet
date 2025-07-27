"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();

          if (!data.image) {
            const randomColor =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            setBgColor(randomColor);
          }

          setUserData(data);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();

  // Dummy summary and order data
  const summary = {
    orders: 10,
    sold: 6,
    earnings: 423,
  };

  const orders = [
    { item: "2kg Tomatoes", date: "24 July 2025", from: "Vendor A" },
    { item: "1kg Onions", date: "21 July 2025", from: "Vendor B" },
  ];

  const sold = [
    { item: "5kg Potatoes", date: "23 July 2025", to: "Vendor Z" },
    { item: "3kg Carrots", date: "20 July 2025", to: "Vendor Y" },
  ];

  return (
    <div className="w-full flex flex-col items-center p-6 overflow-auto">
      {/* Profile Picture or Initial */}
      {userData?.image ? (
        <Image
          src={userData.image}
          alt="Profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
      ) : (
        <div
          className={`w-24 h-24 rounded-full ${bgColor} flex font-bold text-4xl items-center justify-center mb-2 text-white`}
        >
          {getInitial(userData?.name)}
        </div>
      )}

      {/* Name */}
      <h1 className="text-2xl font-bold mb-6">{userData?.name}</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <SummaryCard title="Orders Recieved" value={summary.orders} color="bg-blue-100" />
        <SummaryCard title="Products Sold" value={summary.sold} color="bg-green-100" />
        <SummaryCard title="Earnings (₹)" value={summary.earnings} color="bg-yellow-100" />
      </div>

      {/* Past Orders */}
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-xl font-semibold mb-3">My Past Orders</h2>
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
          {orders.map((order, idx) => (
            <p key={idx}>
              You ordered <strong>{order.item}</strong> from <em>{order.from}</em> on <span>{order.date}</span>.
            </p>
          ))}
        </div>
      </div>

      {/* Sold Items */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-3">What I Have Sold</h2>
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
          {sold.map((sale, idx) => (
            <p key={idx}>
              You sold <strong>{sale.item}</strong> to <em>{sale.to}</em> on <span>{sale.date}</span>.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, color }) => {
  return (
    <div
      className={`rounded-xl shadow-sm p-6 ${color} border border-gray-200 text-center`}
    >
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default HomePage;
