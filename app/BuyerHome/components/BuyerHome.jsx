"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import SellerCard from "@/components/SellerCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);

  // ✅ Fetch Products with Seller Info
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = [];

      for (const productDoc of querySnapshot.docs) {
        const productData = productDoc.data();
        const ownerId = productData.ownerId;

        // Fetch seller info
        const userDoc = await getDoc(doc(db, "users", ownerId));
        const userData = userDoc.exists() ? userDoc.data() : {};

        productList.push({
          id: productDoc.id,
          ...productData,
          storeName: userData.storeName || "Unknown Store",
          location: userData.location || "Unknown Location",
        });
      }

      setProducts(productList);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Fetch All Real Sellers (users with storeName)
  const fetchSellers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const realSellers = [];

      for (const userDoc of querySnapshot.docs) {
        const userData = userDoc.data();
        if (userData.storeName) {
          realSellers.push({
            id: userDoc.id,
            name: userData.storeName,
            image:
              "https://www.simplyrecipes.com/thmb/bANLmp7Tlo0v0DDnivKFZ3THCb8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Grocery-Store-Tips-LEAD-OPTION-02-24855a8ff1d643f39dd108c184d7bea5.jpg", // 🔁 Static image
            location: userData.location || "Unknown",
          });
        }
      }

      setSellers(realSellers);
    } catch (err) {
      console.error("Error fetching sellers:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSellers();

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Product Cards */}
      <h2 className="text-2xl font-bold mb-4 text-red-600">Top Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mb-10">No products found.</p>
      )}

      {/* Seller Cards */}
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Nearby Top Sellers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sellers.map((seller) => (
          <SellerCard
            key={seller.id}
            name={seller.name}
            image={seller.image}
            location={seller.location}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyerHome;
