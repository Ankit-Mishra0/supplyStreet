"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerId, setBuyerId] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id, ...data });

        onAuthStateChanged(auth, (user) => {
          if (user) {
            setBuyerId(user.uid);
            if (user.uid === data.ownerId) {
              setIsSeller(true);
            }
          }
        });
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!buyerId) return alert("You must be logged in to order.");
    if (isSeller) return alert("You cannot order your own product.");
    if (!quantity || quantity <= 0) return alert("Invalid quantity.");
    if (!manualAddress.trim()) return alert("Please enter your address.");

    const totalPrice = quantity * product.price;

    await addDoc(collection(db, "orders"), {
      buyerId,
      sellerId: product.ownerId,
      productId: product.id,
      productName: product.name,
      quantity,
      totalPrice,
      timestamp: serverTimestamp(),
      status: "pending",
      manualAddress: manualAddress.trim(),
    });

    alert("Order placed successfully!");
    router.push("/BuyerHome");
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg font-semibold text-red-600">₹{product.price}</p>
      <p className="text-sm text-gray-600 mt-1">
        Sold by: {product.storeName || "Unknown"}
      </p>
      <p className="text-sm text-gray-500">📍 {product.location || "Unknown"}</p>

      <div className="mt-4">
        <label className="block mb-1 font-medium">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 rounded w-full"
          min={1}
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium">Address (Required):</label>
        <textarea
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          className="border p-2 rounded w-full"
          rows={3}
          placeholder="Enter your delivery address"
        />
      </div>

      {isSeller ? (
        <p className="mt-6 text-red-500 font-semibold">
          You cannot order your own product.
        </p>
      ) : (
        <button
          onClick={handleOrder}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default ProductDetailPage;
