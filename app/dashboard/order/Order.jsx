"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderDashboard = () => {
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        await fetchOrders(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    // Fetch received orders
    const receivedQuery = query(
      collection(db, "orders"),
      where("sellerId", "==", userId)
    );
    const receivedSnapshot = await getDocs(receivedQuery);
    setReceivedOrders(
      receivedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

    // Fetch placed orders
    const placedQuery = query(
      collection(db, "orders"),
      where("buyerId", "==", userId)
    );
    const placedSnapshot = await getDocs(placedQuery);
    setPlacedOrders(
      placedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleAccept = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), {
      status: "accepted",
    });
    await fetchOrders(uid);
  };

  const handleReceived = async (orderId) => {
    await updateDoc(doc(db, "orders", orderId), {
      status: "delivered",
    });
    await fetchOrders(uid);
  };

  const renderOrderItem = (order, type) => (
    <li key={order.id} className="p-4 border rounded-lg shadow bg-white space-y-2">
      <div>
        <strong>{order.productName}</strong> - Qty: {order.quantity} - ₹{order.totalPrice}
      </div>
      <div>Status: <span className="font-semibold">{order.status}</span></div>
      {order.manualAddress && (
        <div>Address: <span className="text-gray-600">{order.manualAddress}</span></div>
      )}
      <div className="text-sm text-gray-500">Order ID: {order.id}</div>

      {/* Action Buttons */}
      {type === "received" && order.status === "pending" && (
        <button
          onClick={() => handleAccept(order.id)}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Accept Order
        </button>
      )}

      {type === "placed" && order.status === "accepted" && (
        <button
          onClick={() => handleReceived(order.id)}
          className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Mark as Received
        </button>
      )}
    </li>
  );

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-4">Orders Received</h1>
        {receivedOrders.length === 0 ? (
          <p>No orders received yet.</p>
        ) : (
          <ul className="space-y-4">
            {receivedOrders.map((order) =>
              renderOrderItem(order, "received")
            )}
          </ul>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Orders Placed</h1>
        {placedOrders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <ul className="space-y-4">
            {placedOrders.map((order) =>
              renderOrderItem(order, "placed")
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderDashboard;
