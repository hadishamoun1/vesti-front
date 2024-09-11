import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Discounts.css";

const DiscountsPage = () => {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);

  // Function to get storeId from JWT token
  const getStoreIdFromToken = () => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.storeId; 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  };

  const storeId = getStoreIdFromToken();

  // Function to fetch items based on category and storeId
  const fetchItems = async (selectedCategory) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/category/?category=${selectedCategory}&storeId=${storeId}`
      );
      const data = await response.json();
      console.log("Fetched items:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Effect to fetch items when category changes
  useEffect(() => {
    if (category) {
      fetchItems(category);
    }
  }, [category]);

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="discounts-container">
      {/* Left-side container */}
      <div className="left-container">
        <div className="text-container">
          <p>Discount History</p>
        </div>
        {/* Add more content here */}
      </div>

      {/* Mid container */}
      <div className="mid-container">
        <div className="discount-container">
          <div className="discount-text-container">
            <p>Discount</p>
          </div>
        </div>

        {/* Category section */}
        <div className="category-container">
          <p className="category-label">Category</p>

          <select
            id="category-dropdown"
            className="category-dropdown"
            aria-label="Select a category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="books">Books</option>
          </select>

          <p className="item-text">Item</p>

          <select
            id="item-dropdown"
            className="item-dropdown"
            aria-label="Select an item"
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <p className="discount-text">Discount</p>

          <input
            type="number"
            id="discount-input"
            className="discount-input"
            placeholder="Enter discount"
            aria-label="Enter discount amount"
          />
        </div>

        {/* Button section */}
        <div className="button-container">
          <button className="submit-button">Notify Users</button>
        </div>
      </div>

      {/* Right-side container */}
      <div className="right-container">
        <div className="text-container">
          <p>Active Discounts</p>
        </div>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default DiscountsPage;
