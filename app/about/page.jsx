"use client";
import React from "react";
import { Truck, Store, PhoneCall, Star, Users, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
    
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 text-black px-6 md:px-20 pt-20 py-10">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 text-transparent bg-clip-text mb-4">
            Supplico: By Vendors, For Vendors
          </h1>
          <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto font-medium">
            A simple, direct platform that helps local vendors buy raw materials easily — at fair prices, with trusted suppliers.
          </p>
        </section>

        {/* Problem Section */}
        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-3">🚧 The Challenge</h2>
          <p className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
            Street vendors face daily struggles — buying raw materials from unreliable sources, high prices from middlemen, wasted time in markets, and no easy way to compare options.
          </p>
        </section>

        {/* Solution Section */}
        <section>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">💡 What Supplico Does</h2>
          <p className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
            Supplico helps vendors save money, time, and stress. We bring verified sellers directly to their phone — with transparent pricing, local options, and trusted service.
          </p>
        </section>

        {/* Services Section */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">🔥 Services We Offer</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: <ShoppingCart className="text-red-500 w-6 h-6" />,
                title: "Bulk Materials",
                desc: "Get all your daily supplies in one place — grains, spices, tools & more.",
              },
              {
                icon: <Store className="text-orange-500 w-6 h-6" />,
                title: "Verified Sellers",
                desc: "We work only with reliable vendors, so you get quality every time.",
              },
              {
                icon: <Truck className="text-yellow-500 w-6 h-6" />,
                title: "Nearby Deliveries",
                desc: "We connect you with local suppliers for faster, cheaper delivery.",
              },
              {
                icon: <Users className="text-red-400 w-6 h-6" />,
                title: "Support for All",
                desc: "Whether you're buying or selling, Supplico helps your business grow.",
              },
              {
                icon: <PhoneCall className="text-orange-400 w-6 h-6" />,
                title: "Phone Support",
                desc: "Need help? We’re just one call away. Friendly support in local language.",
              },
              {
                icon: <Star className="text-yellow-400 w-6 h-6" />,
                title: "Simple Interface",
                desc: "Easy-to-use app made for first-time users. No tech skills needed!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl p-5 border-l-4 border-orange-400"
              >
                <div className="flex gap-3 items-start">
                  {item.icon}
                  <div>
                    <h3 className="text-lg font-bold text-orange-600 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-700 font-medium">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Trusted by Vendors Section */}
            <section>
        <h2 className="text-2xl font-bold text-red-500 text-center mb-6">
            🙌 Trusted by Vendors Across the City
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
            {
                name: "Raju Bhaiya",
                business: "Fruit Seller, Delhi",
                quote:
                "Before Supplico, I spent hours daily buying from multiple places. Now, I just open the app and it's all there. Time-saving and reliable!",
            },
            {
                name: "Geeta Devi",
                business: "Spice Vendor, Lucknow",
                quote:
                "Supplico helps me compare prices quickly. I never get cheated now. Plus, delivery is super fast!",
            },
            {
                name: "Aamir Khan",
                business: "Street Food Stall, Jaipur",
                quote:
                "My business depends on daily ingredients. Supplico gives me consistency, and I earn more now with less hassle.",
            },
            ].map((vendor, i) => (
            <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 border-t-4 border-yellow-400"
            >
                <p className="text-sm text-gray-800 italic mb-4">“{vendor.quote}”</p>
                <div className="text-sm text-gray-900 font-semibold">
                {vendor.name} <br />
                <span className="text-xs text-orange-500 font-medium">
                    {vendor.business}
                </span>
                </div>
            </div>
            ))}
        </div>
        </section>

      </div>
    </div>
    </>
  );
}
