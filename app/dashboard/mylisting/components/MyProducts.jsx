"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const MyListingPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [storePrompt, setStorePrompt] = useState(false);
  const [storeInput, setStoreInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const staticImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFFGEfGID3TAiARRiARNvA01jzY5afCOOldA&s";

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({ ...data, uid: user.uid });

        const hasStoreName = data.storeName && data.storeName.trim() !== "";
        const hasLocation = data.location && data.location.trim() !== "";

        if (!hasStoreName || !hasLocation) {
          setStorePrompt(true);
        } else {
          const q = query(
            collection(db, "products"),
            where("ownerId", "==", user.uid)
          );
          const snapshot = await getDocs(q);
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(list);
        }
      }
    };

    fetchUserAndProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !formData.name || !formData.price) return;

    setLoading(true);

    await addDoc(collection(db, "products"), {
      name: formData.name,
      price: parseFloat(formData.price),
      image: staticImageUrl,
      createdAt: Timestamp.now(),
      ownerId: user.uid,
    });

    setFormData({ name: "", price: "" });
    setLoading(false);
    setShowForm(false);

    const q = query(collection(db, "products"), where("ownerId", "==", user.uid));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStoreInfoSubmit = async () => {
    if (!storeInput.trim() || !locationInput.trim()) {
      return alert("Please fill both Store Name and Location.");
    }

    await updateDoc(doc(db, "users", userData.uid), {
      storeName: storeInput.trim(),
      location: locationInput.trim(),
    });

    setUserData((prev) => ({
      ...prev,
      storeName: storeInput.trim(),
      location: locationInput.trim(),
    }));

    setStorePrompt(false);

    // Fetch products once the user has filled in store info
    const q = query(collection(db, "products"), where("ownerId", "==", userData.uid));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  return (
    <div className="relative p-6 w-full">
      <h2 className="text-3xl font-bold mb-6">📦 My Products</h2>

      {/* Toggle Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "➕ Add Product"}
      </button>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 max-w-md mb-8"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="border p-2 rounded"
            required
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
            className="border p-2 rounded"
            required
            disabled={loading}
          />
          <p className="text-gray-500 text-sm">Image will be added automatically</p>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Listing..." : "Submit Product"}
          </button>
        </form>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md shadow-md p-4 flex flex-col items-center bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600 mb-2">₹{product.price}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete ❌
            </button>
          </div>
        ))}
      </div>

      {/* Store Name + Location Modal */}
      {storePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Setup Your Store</h2>
            <input
              type="text"
              placeholder="Store Name"
              value={storeInput}
              onChange={(e) => setStoreInput(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <button
              onClick={handleStoreInfoSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListingPage;
