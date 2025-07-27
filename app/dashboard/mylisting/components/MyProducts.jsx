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
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [storePrompt, setStorePrompt] = useState(false);
  const [storeInput, setStoreInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [editProductId, setEditProductId] = useState(null);

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

        if (!data.storeName || !data.location) {
          setStorePrompt(true);
        } else {
          fetchProducts(user.uid);
        }
      }
    };

    fetchUserAndProducts();
  }, []);

  const fetchProducts = async (uid) => {
    const q = query(collection(db, "products"), where("ownerId", "==", uid));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (
      !user ||
      !formData.name ||
      !formData.price ||
      (!formData.imageFile && !editProductId)
    )
      return;

    setLoading(true);

    let imageUrl = staticImageUrl;

    if (formData.imageFile) {
      const imageData = new FormData();
      imageData.append("image", formData.imageFile);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imageData,
          }
        );
        const data = await res.json();
        imageUrl = data.data.url;
      } catch (err) {
        console.error("Image upload failed", err);
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    if (editProductId) {
      await updateDoc(doc(db, "products", editProductId), {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        ...(formData.imageFile && { image: imageUrl }),
      });
    } else {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: imageUrl,
        createdAt: Timestamp.now(),
        ownerId: user.uid,
      });
    }

    setFormData({ name: "", price: "", description: "", imageFile: null });
    setShowForm(false);
    setEditProductId(null);
    setLoading(false);
    fetchProducts(user.uid);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
      imageFile: null,
    });
    setEditProductId(product.id);
    setShowForm(true);
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
    fetchProducts(userData.uid);
  };

  return (
    <div className="relative p-6 w-full">
      <h2 className="text-3xl font-bold mb-6">📦 My Products</h2>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({
            name: "",
            price: "",
            description: "",
            imageFile: null,
          });
          setEditProductId(null);
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition font-bold"
      >
        {showForm ? "Cancel" : "➕ Add Product"}
      </button>

      {showForm && (
        <form
          onSubmit={handleAddOrUpdateProduct}
          className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 max-w-md mb-8"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border p-2 rounded"
            required
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="border p-2 rounded"
            required
            disabled={loading}
          />
          <textarea
            placeholder="Product Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className="border p-2 rounded"
            required
            disabled={loading}
          />

          <label className="block bg-green-600 text-white text-center py-2 rounded cursor-pointer hover:bg-green-700 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  imageFile: e.target.files[0],
                }))
              }
              className="hidden"
              required={!editProductId}
              disabled={loading}
            />
            Upload Product Image
          </label>

          {formData.imageFile && (
            <img
              src={URL.createObjectURL(formData.imageFile)}
              alt="Preview"
              className="w-full h-32 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading
              ? editProductId
                ? "Updating..."
                : "Uploading..."
              : editProductId
              ? "Update Product"
              : "Submit Product"}
          </button>
        </form>
      )}

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
            <p className="text-gray-600 mb-1">₹{product.price}</p>
            <p className="text-gray-500 text-sm mb-2">
              {product.description || "No description"}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(product)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {storePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Setup Your Store
            </h2>
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
