"use client";

import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search for products..." }) => {
  return (
    <div className="flex justify-center mb-6 mt-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-[80%] md:w-[70%] lg:w-[60%] text-lg px-6 py-3 shadow-md border-2 border-orange-400 rounded-full outline-none focus:ring-2 focus:ring-orange-300"
      />
    </div>
  );
};

export default SearchBar;
