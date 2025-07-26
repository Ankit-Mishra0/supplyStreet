"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
          Supplico
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-md font-semibold">
          <Link href="#about" className="text-orange-600 hover:text-red-600 transition">
            About
          </Link>
          <Link href="/dashboard" className="text-orange-600 hover:text-red-600 transition">
            Dashboard
          </Link>
          <Link href="/login" className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
