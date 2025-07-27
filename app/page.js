"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-white pt-24 px-4 text-center">
        
        {/* Title Block */}
        <motion.div
          className="relative inline-block mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="absolute -top-8 -left-8 text-[22px] font-semibold text-orange-600">
            Welcome to,
          </p>

          <h1 className="text-[72px] font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-md leading-tight">
            Supplico
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-[20px] font-semibold text-orange-700 max-w-4xl mb-14 px-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          A platform built to uplift street vendors by streamlining their access to raw materials and connecting them directly with buyers — simplifying commerce, empowering communities.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/BuyerHome">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg sm:text-xl py-4 px-8 rounded-xl shadow-md transition w-full sm:w-auto">
               Buyer
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg sm:text-xl py-4 px-8 rounded-xl shadow-md transition w-full sm:w-auto">
               Seller
            </button>
          </Link>
        </motion.div>
      </div>


      <Footer />

    </>
  );
}
