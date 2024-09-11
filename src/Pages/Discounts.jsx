import React from "react";
import "../styles/Discounts.css";

const DiscountsPage = () => {
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
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="books">Books</option>
          </select>

          <p className="item-text">Item</p>
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
