"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="w-[30%] md:w-[30%] lg:w-[10%] bg-gradient-to-br from-yellow-300 to-yellow-100 h-screen shadow-xl flex flex-col gap-10 items-center pt-10 justify-between">
      <div className="flex flex-col gap-10 items-center">
        <Link href="/dashboard">
          <div
            className={
              path === "/dashboard"
                ? "md:text-2xl text-xl font-bold text-orange-500"
                : "font-semibold md:text-xl text-lg"
            }
          >
            Home
          </div>
        </Link>
        <Link href="/dashboard/profile">
          <div
            className={
              path === "/dashboard/profile"
                ? "md:text-2xl text-xl font-bold text-orange-500"
                : "font-semibold md:text-xl text-lg"
            }
          >
            Profile
          </div>
        </Link>
        <Link href="/dashboard/order">
          <div
            className={
              path === "/dashboard/order"
                ? "md:text-2xl text-xl font-bold text-orange-500"
                : "font-semibold md:text-xl text-lg"
            }
          >
            Orders
          </div>
        </Link>
        <Link href="/dashboard/mylisting">
          <div
            className={
              path === "/dashboard/mylisting"
                ? "md:text-2xl text-xl font-bold text-orange-500"
                : "font-semibold md:text-xl text-lg"
            }
          >
            Products
          </div>
        </Link>
      </div>
      <div>Hello</div>
    </div>
  );
};

export default Sidebar;
