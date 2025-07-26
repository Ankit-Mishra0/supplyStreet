"use client";

import React from "react";
import { Star } from "lucide-react";

const SellerCard = ({ id, name, distance, rating, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-4 rounded-xl shadow-md border border-red-300 transition-transform hover:scale-105"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="font-bold text-red-700 text-lg">{name}</h3>
      <p className="text-sm text-gray-600 mb-1">{distance}</p>
      <div className="flex items-center text-yellow-500">
        <Star size={16} fill="currentColor" />
        <span className="ml-1 text-sm">{rating}</span>
      </div>
    </div>
  );
};

export default SellerCard;
