"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ id, name, price, image, storeName, location }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-lg shadow-md p-3 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />
      <div className="flex flex-col text-center bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
        <h3 className="text-xl font-extrabold">{name}</h3>
        <p className="text-gray-700 text-lg font-bold">₹{price}</p>
        <p className="text-gray-600 text-sm font-bold">Sold by: {storeName}</p>
        <p className="text-gray-500 text-xs font-semibold">📍 {location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
