"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const colorOptions = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-pink-400",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const userDoc = await getDoc(doc(db, "users", u.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          if (!data.image) {
            const randomColor =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            setBgColor(randomColor);
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setMenuOpen(false);
    setMobileOpen(false);
    router.push("/BuyerHome");
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();

  return (
    <nav className="bg-red-50 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
            Supplico
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-semibold text-lg">
          <Link href="/about" className="text-orange-600 hover:text-orange-700 font-bold">
            About
          </Link>
          {path !== "/BuyerHome" && (
            <Link href="/BuyerHome" className="text-orange-600 hover:text-orange-700 font-bold">
              Buy
            </Link>
          )}
          {!path.startsWith("/dashboard") && (
            <Link href="/dashboard" className="text-orange-600 hover:text-orange-700 font-bold">
              Dashboard
            </Link>
          )}
          {!user && !path.startsWith("/dashboard") && (
            <Link href="/login" className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition font-bold">
              Login
            </Link>
          )}
          {user && (
            <div className="relative">
              {userData?.image ? (
                <Image
                  src={userData.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-bold cursor-pointer`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {getInitial(userData?.name)}
                </div>
              )}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-red-500 font-bold border-b">
                    Hello {userData?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left bg-red-600 text-white hover:bg-red-700 font-bold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3 font-semibold text-lg">
            <Link href="/about" className="text-orange-600" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            {path !== "/BuyerHome" && (
              <Link href="/BuyerHome" className="text-orange-600" onClick={() => setMobileOpen(false)}>
                Buy
              </Link>
            )}
            {!path.startsWith("/dashboard") && (
              <Link href="/dashboard" className="text-orange-600" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                href="/login"
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 font-bold"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
            {user && (
              <>
                <span className="text-red-500 font-bold">Hello {userData?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-bold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
