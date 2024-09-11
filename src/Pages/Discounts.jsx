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
        <div className="discount-text-container">
          <p>Discount</p>
        </div>
        {/* Add more content here */}
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
