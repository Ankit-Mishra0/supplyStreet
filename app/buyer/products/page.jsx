"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: "₹20/kg",
    rating: 4.5,
    image: "https://source.unsplash.com/featured/?tomatoes",
  },
  {
    id: 2,
    name: "Green Chilies",
    price: "₹15/kg",
    rating: 4.2,
    image: "https://source.unsplash.com/featured/?chilies",
  },
  {
    id: 3,
    name: "Onions",
    price: "₹18/kg",
    rating: 4.8,
    image: "https://source.unsplash.com/featured/?onions",
  },
  {
    id: 4,
    name: "Potatoes",
    price: "₹22/kg",
    rating: 4.3,
    image: "https://source.unsplash.com/featured/?potatoes",
  },
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setProducts(mockProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100 px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
        All Available Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
