// src/components/ViewStore.js
import React, { useEffect, useState } from "react";
import "../styles/ViewStore.css"; // Import the CSS file

const ViewStore = () => {
  const [products, setProducts] = useState([]);
  const storeId = 1; // Replace with dynamic storeId if needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/products/20`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [storeId]);

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
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStore;
