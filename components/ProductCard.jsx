"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ id, name, price, rating, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/buyer/products/${id}`);
  };

<<<<<<< HEAD
  return (
    <Link href={`/buyer/products/${id}`}>
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white p-4 rounded-xl shadow-md border border-yellow-300 transition-transform hover:scale-105"
    >
=======
const ProductCard = ({ name, price, image, storeName, location }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
>>>>>>> my-fix-branch
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />
<<<<<<< HEAD
      <h3 className="font-bold text-orange-700 text-lg">{name}</h3>
      <p className="text-sm text-gray-600 mb-1">{price}</p>
      <div className="flex items-center text-yellow-500">
        <Star size={16} fill="currentColor" />
        <span className="ml-1 text-sm">{rating}</span>
=======
      <div className="flex flex-col text-center bg-gradient-to-r from-red-600 to-orange-500  text-transparent bg-clip-text">
        <h3 className="text-xl font-extrabold ">{name}</h3>
        <p className="text-gray-800 text-lg font-bold ">₹{price}</p>
        <p className="text-gray-700 text-sm font-bold">Sold by: {storeName}</p>
        <p className="text-gray-600 text-xs">📍 {location}</p>
>>>>>>> my-fix-branch
      </div>
    </div>
    </Link>
  );
};


export default ProductCard;
