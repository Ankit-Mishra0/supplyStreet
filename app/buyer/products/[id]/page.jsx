"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const mockProduct = {
  id: "1",
  name: "Fresh Tomatoes",
  price: "₹20/kg",
  rating: 4.5,
  image: "https://source.unsplash.com/featured/?tomatoes",
  seller: {
    name: "Ravi Vegetable Mart",
  },
  reviews: [
    { name: "Ankit", comment: "Very fresh and juicy!", rating: 5 },
    { name: "Priya", comment: "Good quality for the price.", rating: 4 },
  ],
  similarProducts: [
    {
      id: "2",
      name: "Green Chilies",
      price: "₹15/kg",
      image: "https://source.unsplash.com/featured/?chilies",
    },
    {
      id: "3",
      name: "Onions",
      price: "₹18/kg",
      image: "https://source.unsplash.com/featured/?onions",
    },
  ],
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // For now, using mock data
    setProduct(mockProduct);
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 via-orange-100 to-red-50 min-h-screen">
      {/* Product Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-red-600">{product.name}</h2>
            <p className="text-lg text-gray-700 mt-2">{product.price}</p>
            <p className="text-sm text-gray-500 mt-1">Sold by: {product.seller.name}</p>
            <div className="flex items-center text-yellow-500 mt-2">
              <Star size={20} fill="currentColor" />
              <span className="ml-1">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <h3 className="text-xl font-semibold text-orange-600 mb-4">Similar Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {product.similarProducts.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h4 className="font-bold text-red-700">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.price}</p>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <h3 className="text-xl font-semibold text-red-600 mb-4">Customer Reviews</h3>
      <div className="space-y-4">
        {product.reviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-orange-700">{review.name}</p>
              <div className="flex items-center text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
