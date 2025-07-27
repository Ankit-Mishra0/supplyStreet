"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

const SellerCard = ({ name, image, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <div className="flex flex-col text-center bg-gradient-to-r from-red-600 to-orange-500  text-transparent bg-clip-text">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500 text-sm">📍 {location}</p>
    </div>
    </div>
  );
};

export default SellerCard;



