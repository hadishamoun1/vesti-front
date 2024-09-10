// src/components/ViewStore.js
import React from "react";
import "../styles/ViewStore.css"; // Import the CSS file

const ViewStore = () => {
  return (
    <div className="view-store-container">
      <h1 className="store-heading">Your Store</h1>
      <div className="store-image-container">
        <img
          src="path/to/store-image.jpg"
          alt="Store"
          className="store-image"
        />
        {/* Replace with the actual path to your store image */}
      </div>
      <h2 className="products-heading">Products</h2>
      <div className="products-container">
        {/* Product cards will go here */}
      </div>
    </div>
  );
};

export default ViewStore;
