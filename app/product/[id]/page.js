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
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerId, setBuyerId] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ id, ...data });

        onAuthStateChanged(auth, async (user) => {
          if (user) {
            setBuyerId(user.uid);
            if (user.uid === data.ownerId) {
              setIsSeller(true);
            }
          }
        });

        // Fetch reviews
        const q = query(
          collection(db, "reviews"),
          where("productId", "==", id)
        );
        const reviewSnap = await getDocs(q);
        const result = [];
        reviewSnap.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
        setReviews(result);
      }
    };

    fetchData();
  }, [id]);

  const handleOrder = async () => {
    if (!buyerId) return toast.error("You must be logged in to order.");
    if (isSeller) return toast.error("You cannot order your own product.");
    if (!quantity || quantity <= 0) return toast.error("Invalid quantity.");
    if (!manualAddress.trim()) return toast.error("Please enter your address.");

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

    toast.success("Order placed successfully!");
    router.push("/BuyerHome");
  };

  const handleReviewSubmit = async () => {
    if (!newRating || !newComment.trim()) {
      return toast.error("Please fill all fields.");
    }

    const user = auth.currentUser;
    if (!user) return toast.error("Login required.");

    await addDoc(collection(db, "reviews"), {
      productId: product.id,
      reviewerId: user.uid,
      reviewerName: user.displayName || "Anonymous",
      rating: newRating,
      comment: newComment.trim(),
      timestamp: serverTimestamp(),
    });

    toast.success("Review submitted!");
    setNewRating(0);
    setNewComment("");
    setReviews((prev) => [
      ...prev,
      {
        productId: product.id,
        reviewerId: user.uid,
        reviewerName: user.displayName || "Anonymous",
        rating: newRating,
        comment: newComment.trim(),
      },
    ]);
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>

    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-100 p-4 pt-20">
      <Toaster position="top-right" />

      {/* Product Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-10">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-600">{product.name}</h1>
            <p className="text-2xl text-green-700 mt-2 font-bold">₹{product.price}</p>
            <p className="text-[16px] text-gray-800 font-semibold mt-1">🧑‍🌾 Sold by: {product.storeName || "Unknown"}</p>
            <p className="text-sm text-gray-700 font-semibold">📍 {product.location || "Unknown"}</p>

            <div className="mt-6">
              <label className="block text-sm font-bold mb-1">Quantity:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Address (Required):</label>
              <textarea
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                rows={3}
                placeholder="Enter your delivery address"
                className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {isSeller ? (
            <p className="mt-6 text-sm font-bold text-red-500">
              ⚠️ You cannot order your own product.
            </p>
          ) : (
            <button
              onClick={handleOrder}
              className="mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg hover:shadow-lg transition duration-300"
            >
              🛒 Place Order
            </button>
          )}
        </div>
      </div>


      

      {/* Tabs */}
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-4 mb-4 border-b pb-2">
          <button
            className={`font-semibold ${activeTab === "details" ? "text-red-500 border-b-2 border-red-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`font-semibold ${activeTab === "reviews" ? "text-red-500 border-b-2 border-red-500" : "text-gray-600"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews & Ratings ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "details" ? (
          <p className="text-gray-700">{product.description || "No description available."}</p>
        ) : (
          <div className="space-y-4">
            {/* Show Reviews */}
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="border p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-700 font-semibold">{rev.reviewerName}</p>
                  <p className="text-yellow-500">⭐ {rev.rating} / 5</p>
                  <p className="text-gray-600">{rev.comment}</p>
                </div>
              ))
            )}

            {/* Add Review */}
            {!isSeller && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-gray-700 mb-2">Write a Review</h3>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="border rounded p-2 mb-2 w-full"
                >
                  <option value={0}>Select Rating</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} ⭐
                    </option>
                  ))}
                </select>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full border rounded-md p-2 mb-2"
                  rows={3}
                />
                <button
                  onClick={handleReviewSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
