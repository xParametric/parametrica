"use client";
import React, { useState, ChangeEvent } from "react";

const MarketSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
    console.log("Search value:", event.target.value);
    // Here you can add the logic for on-type search
  };

  return (
    <div className="m-2 flex w-full">
      <input
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        type="text"
      />
    </div>
  );
};

export default MarketSearch;
