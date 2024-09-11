import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";// Correct import
import "../styles/Discounts.css";

const DiscountsPage = () => {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [activeDiscounts, setActiveDiscounts] = useState([]);
  const [discountHistory, setDiscountHistory] = useState([]); 

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

  // Function to fetch active discounts and product details
  const fetchActiveDiscounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/discounts/active?storeId=${storeId}`
      );
      const discountsData = await response.json();

      // Fetch product details for each discount
      const discountsWithProductNames = await Promise.all(
        discountsData.map(async (discount) => {
          const productResponse = await fetch(
            `http://localhost:3000/products/${discount.productId}`
          );
          const productData = await productResponse.json();

          return { ...discount, productName: productData.name };
        })
      );

      console.log(
        "Fetched active discounts with product names:",
        discountsWithProductNames
      );
      setActiveDiscounts(discountsWithProductNames);
    } catch (error) {
      console.error("Error fetching active discounts:", error);
    }
  };

  // Function to fetch discount history and product details
  const fetchDiscountHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/discounts/history?storeId=${storeId}`
      );
      const historyData = await response.json();

      // Fetch product details for each discount history
      const historyWithProductNames = await Promise.all(
        historyData.map(async (discount) => {
          const productResponse = await fetch(
            `http://localhost:3000/products/${discount.productId}`
          );
          const productData = await productResponse.json();

          // Add the product name and created date to the discount object
          return { ...discount, productName: productData.name };
        })
      );

      console.log(
        "Fetched discount history with product names:",
        historyWithProductNames
      );
      setDiscountHistory(historyWithProductNames);
    } catch (error) {
      console.error("Error fetching discount history:", error);
    }
  };

  // Effect to fetch items when category changes
  useEffect(() => {
    if (category) {
      fetchItems(category);
    }
  }, [category]);

  // Effect to fetch active discounts and discount history on component mount
  useEffect(() => {
    fetchActiveDiscounts();
    fetchDiscountHistory();
  }, []);

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handle item change
  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  // Handle discount change
  const handleDiscountChange = (event) => {
    setDiscountValue(event.target.value);
  };

  // Handle button click
  const handleNotifyUsers = async () => {
    if (!selectedItem || !discountValue) {
      alert("Please select an item and enter a discount.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/products/discounts/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            storeId: storeId,
            itemId: selectedItem,
            discount: discountValue,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Discount updated successfully!");
        setSelectedItem("");
        setDiscountValue("");
        fetchActiveDiscounts(); // Refresh active discounts after update
      } else {
        const errorData = await response.json();
        alert(`Error updating discount: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating discount:", error);
      alert("An error occurred while updating the discount.");
    }
  };

  // Handle disable button click
  const handleDisableDiscount = async (discountId) => {
    try {
      const response = await fetch("http://localhost:3000/discounts/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ discountId }),
      });

      if (response.ok) {
        alert("Discount disabled and notifications removed successfully!");
        fetchActiveDiscounts(); // Refresh active discounts after disabling
        fetchDiscountHistory(); // Refresh discount history after disabling
      } else {
        const errorData = await response.json();
        alert(`Error disabling discount: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error disabling discount:", error);
      alert("An error occurred while disabling the discount.");
    }
  };

  return (
    <div className="discounts-container">
      {/* Left-side container */}
      <div className="left-container">
        <div className="active-container">
          <div className="text-container">
            <p>Discount History</p>
          </div>
        </div>

        <div className="discounts-list">
          {discountHistory.length > 0 ? (
            discountHistory.map((discount) => (
              <div key={discount.id} className="discount-card">
                <div className="discount-details">
                  <p className="discount-item-name">{discount.productName}</p>
                  <p className="discount-value">
                    Discount: {discount.discountPercentage}%
                  </p>
                  <p className="discount-date">
                    Created On:{" "}
                    {new Date(discount.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No discount history available.</p>
          )}
        </div>
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
            value={selectedItem}
            onChange={handleItemChange}
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
            value={discountValue}
            onChange={handleDiscountChange}
          />
        </div>
        <div className="button-container">
          <button className="submit-button" onClick={handleNotifyUsers}>
            Notify Users
          </button>
        </div>
      </div>

      {/* Right-side container */}
      <div className="right-container">
        <div className="active-container">
          <div className="text-container">
            <p>Active Discounts</p>
          </div>
        </div>
        <div className="discounts-list">
          {activeDiscounts.length > 0 ? (
            activeDiscounts.map((discount) => (
              <div key={discount.id} className="discount-card">
                <div className="discount-details">
                  <p className="discount-item-name">{discount.productName}</p>
                  <p className="discount-value">
                    Discount: {discount.discountPercentage}%
                  </p>
                  <p className="discount-date">
                    Created On:{" "}
                    {new Date(discount.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="disable-button"
                  onClick={() => handleDisableDiscount(discount.id)}
                >
                  Disable
                </button>
              </div>
            ))
          ) : (
            <p>No active discounts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;
