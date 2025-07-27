"use client";

import React from "react";
import { Star } from "lucide-react";

const SellerCard = ({ name, image, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-500 text-sm">📍 {location}</p>
    </div>
  );
};

export default SellerCard;



