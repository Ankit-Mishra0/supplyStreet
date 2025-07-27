"use client";

import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import { auth, provider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { storeUser } from "@/lib/user";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await storeUser(user);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
       router.back();
      } else {
        router.push("/setup");
      }
    } catch (error) {
      console.error("Google login error", error);
      setErrorMessage("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Blurred Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>

      {/* Decorative Images */}
      <div className="absolute xl:top-[350px] xl:left-[300px] md:top-[550px] md:left-[50px] top-[150px] left-[-50px] -rotate-30 z-0 drop-shadow-xl">
        <Image src="/fruits.png" alt="fruits" width={250} height={250} />
      </div>
      <div className="hidden md:block absolute xl:bottom-[450px] xl:right-[450px] md:bottom-[650px] md:right-[100px] z-0 drop-shadow-xl">
        <Image src="/veggies.png" alt="veggies" width={300} height={300} />
      </div>

      {/* Main Login Box */}
      <div className="relative flex flex-col items-center justify-center h-screen w-[90%] z-10 m-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4 items-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <div
            onClick={!loading ? handleGoogleLogin : undefined}
            className={`flex w-[85%] items-center justify-center px-3 py-2 font-bold rounded-md shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white hover:bg-slate-800 hover:text-white"
            }`}
          >
            <button disabled={loading}>
              <GoogleIcon className="text-red-600 md:!size-8 mr-4 mb-1" />{" "}
              Google
            </button>
          </div>

          <Link href="/BuyerHome">
            <div
              className={`flex w-[80%] items-center justify-center px-3 py-2 font-bold rounded-md shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-slate-800 hover:text-white"
              }`}
            >
              <button disabled={loading}>Home</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
