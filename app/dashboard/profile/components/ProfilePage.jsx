"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingStore, setEditingStore] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);

  const [newName, setNewName] = useState("");
  const [newStore, setNewStore] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const colorOptions = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({ ...data, uid: user.uid });

          if (!data.image) {
            const randomColor =
              colorOptions[Math.floor(Math.random() * colorOptions.length)];
            setBgColor(randomColor);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFieldUpdate = async (field, value) => {
    if (!value.trim()) return;
    await updateDoc(doc(db, "users", userData.uid), {
      [field]: value.trim(),
    });
    setUserData((prev) => ({ ...prev, [field]: value.trim() }));
  };

  const uploadToImgBB = async (file) => {
    const imageData = new FormData();
    imageData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageUrl = await uploadToImgBB(file);
      await updateDoc(doc(db, "users", userData.uid), {
        image: imageUrl,
      });
      setUserData((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      alert("Failed to upload profile image.");
      console.error(err);
    }
  };

  const handleShopImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageUrl = await uploadToImgBB(file);
      await updateDoc(doc(db, "users", userData.uid), {
        shopImage: imageUrl,
      });
      setUserData((prev) => ({ ...prev, shopImage: imageUrl }));
    } catch (err) {
      alert("Failed to upload shop image.");
      console.error(err);
    }
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase();
  const getJoinedDate = (timestamp) =>
    timestamp?.toDate().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const logoutUser = async () => {
    await signOut(auth);
    window.location.href = "/BuyerHome";
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col items-center gap-6">
      {/* Profile Image */}
      <div className="relative">
        {userData?.image ? (
          <Image
            src={userData.image}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full object-cover w-28 h-28"
          />
        ) : (
          <div
            className={`w-28 h-28 rounded-full ${bgColor} flex items-center justify-center text-white text-4xl font-bold`}
          >
            {getInitial(userData?.name)}
          </div>
        )}
        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer border">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            className="hidden"
          />
          🖊️
        </label>
      </div>

      {/* Name */}
      <div className="text-center w-full">
        {editingName ? (
          <div className="flex items-center gap-2 justify-center">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded-md"
              placeholder="Enter new name"
            />
            <button
              onClick={async () => {
                await handleFieldUpdate("name", newName);
                setEditingName(false);
              }}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingName(false)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-2xl font-semibold justify-center">
            {userData?.name}
            <button
              onClick={() => {
                setNewName(userData?.name || "");
                setEditingName(true);
              }}
              className="text-sm text-blue-600"
            >
              🖊️
            </button>
          </div>
        )}
        <p className="text-gray-500 mt-1">
          Joined since: {getJoinedDate(userData?.createdAt)}
        </p>
      </div>

      {/* Store Name */}
      <div className="w-full max-w-md">
        <label className="block font-medium mb-1">🏪 Store Name</label>
        {editingStore ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newStore}
              onChange={(e) => setNewStore(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <button
              onClick={async () => {
                await handleFieldUpdate("storeName", newStore);
                setEditingStore(false);
              }}
              className="bg-green-500 text-white px-3 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingStore(false)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between border p-2 rounded-md bg-white">
            <span>{userData?.storeName || "Not set"}</span>
            <button
              onClick={() => {
                setNewStore(userData?.storeName || "");
                setEditingStore(true);
              }}
              className="text-blue-600 text-sm"
            >
              🖊️
            </button>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="w-full max-w-md">
        <label className="block font-medium mb-1">📍 Location</label>
        {editingLocation ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <button
              onClick={async () => {
                await handleFieldUpdate("location", newLocation);
                setEditingLocation(false);
              }}
              className="bg-green-500 text-white px-3 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingLocation(false)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between border p-2 rounded-md bg-white">
            <span>{userData?.location || "Not set"}</span>
            <button
              onClick={() => {
                setNewLocation(userData?.location || "");
                setEditingLocation(true);
              }}
              className="text-blue-600 text-sm"
            >
              🖊️
            </button>
          </div>
        )}
      </div>

      {/* Shop Image Upload */}
      <div className="w-full max-w-md">
        <label className="block font-medium mb-2">🏬 Shop Image</label>
        {userData?.shopImage ? (
          <Image
            src={userData.shopImage}
            alt="Shop"
            className="w-full h-40 object-cover rounded mb-2"
          />
        ) : (
          <p className="text-gray-500 text-sm mb-2">No shop image added yet.</p>
        )}
        <label className="block bg-green-600 text-white text-center py-2 rounded cursor-pointer hover:bg-green-700 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleShopImageUpload}
            className="hidden"
          />
           Upload Shop Image
        </label>
      </div>

      {/* Logout */}
      <button
        onClick={logoutUser}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
