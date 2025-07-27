<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import SellerCard from "@/components/SellerCard";
import Link from "next/link";

const mockProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: "₹20/kg",
    rating: 4.5,
    image: "https://media.istockphoto.com/photos/fresh-tomatoes-isolated-on-white-picture-id479524832?k=6&m=479524832&s=612x612&w=0&h=xB_vVuARGk7TZLo9rJwX_2xSFjr3Y65nJWwMbJ0xzzM=",
  },
  {
    id: 2,
    name: "Green Chilies",
    price: "₹15/kg",
    rating: 4.2,
    image: "https://jooinn.com/images/spicy-green-chillies.jpg",
  },
  {
    id: 3,
    name: "Onions",
    price: "₹18/kg",
    rating: 4.8,
    image: "https://wallpaperaccess.com/full/1912934.jpg",
  },
  {
    id: 4,
    name: "Potatoes",
    price: "₹22/kg",
    rating: 4.3,
    image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?cs=srgb&dl=potatoes-144248.jpg&fm=jpg",
  },
  {
    id: 5,
    name: "Cabbage",
    price: "₹25/kg",
    rating: 4.4,
    image: "https://tse2.mm.bing.net/th/id/OIP.upesixw8E8sbQEBAEZdVXwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 6,
    name: "Carrots",
    price: "₹30/kg",
    rating: 4.1,
    image: "https://source.unsplash.com/featured/?carrot",
  },
];

const mockSellers = [
  {
    id: 1,
    name: "Ravi Vegetable Mart",
    distance: "0.5 km",
    rating: 4.7,
    image: "https://source.unsplash.com/featured/?vegetable-shop",
  },
  {
    id: 2,
    name: "Laxmi Fresh Farm",
    distance: "1.2 km",
    rating: 4.6,
    image: "https://source.unsplash.com/featured/?farmers-market",
  },
];

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
=======
import React from 'react'
import BuyerHome from './components/BuyerHome'
import Navbar from '@/components/Navbar'
>>>>>>> my-fix-branch

const page = () => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Product Cards */}
      <h2 className="text-xl font-semibold mb-4 text-red-600">Top Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mb-10">No products found.</p>
      )}

      <Link
  href="/buyer/products"
  className="block text-center mt-4 text-orange-700 font-semibold hover:underline"
>
  Show More →
</Link>

      {/* Seller Cards */}
      <h2 className="text-xl font-semibold mb-4 text-red-600">Nearby Top Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {mockSellers.map((seller) => (
      <SellerCard key={seller.id} {...seller} />
        ))}
        
=======
    <div>
      <Navbar />
      <div className=' pt-18'>
      <BuyerHome/>
>>>>>>> my-fix-branch
      </div>
    </div>
  )
}

export default page
