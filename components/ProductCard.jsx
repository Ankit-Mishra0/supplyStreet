"use client";

import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ name, price, image, storeName, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600 text-sm">₹{price}</p>
      <p className="text-gray-500 text-xs">Sold by: {storeName}</p>
      <p className="text-gray-400 text-xs">📍 {location}</p>
    </div>
  );
};


export default ProductCard;
