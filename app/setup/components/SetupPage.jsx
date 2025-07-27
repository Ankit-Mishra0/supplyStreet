"use client";
import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const SetupPage = () => {
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("User not logged in");
  
    const data = {
      uid: user.uid,
      name,
      email,
      storeName,
      phone: user.phoneNumber || "",
      provider: user.providerData[0]?.providerId || "phone",
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), data, { merge: true });
    router.push("/dashboard");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-amber-300 blur-2xl"></div>

      {/* Main form container */}
      <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
        <div className="lg:w-[40%] md:w-[50%] w-[95%] flex flex-col gap-1.5 bg-amber-200 p-6 justify-center items-center rounded-lg shadow-xl">
          <h1 className="text-2xl font-semibold text-center w-full">
            Set Up Your Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-4 mt-4"
          >
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[90%] font-semibold bg-white rounded-lg p-2 outline-none"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] font-semibold bg-white rounded-lg p-2 outline-none"
            />
            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="Have a store? Enter its name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              
              className="w-[90%] font-semibold bg-white rounded-lg p-2 outline-none"
            />

            <button
              type="submit"
              className="w-auto p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-slate-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
