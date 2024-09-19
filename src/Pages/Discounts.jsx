import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/Discounts.css";
import { BsClockHistory } from "react-icons/bs";
import { TbDiscount } from "react-icons/tb";

const DiscountsPage = () => {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [activeDiscounts, setActiveDiscounts] = useState([]);
  const [discountHistory, setDiscountHistory] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [productCache, setProductCache] = useState({});
  const [productsLoaded, setProductsLoaded] = useState(false); // New state to track products loading
  const apiUrl = "http://localhost:3000"; // Base URL for your API

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

  useEffect(() => {
    const storeIdFromToken = getStoreIdFromToken();
    setStoreId(storeIdFromToken);

    if (storeIdFromToken) {
      fetchAllProducts();
    }
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      const data = await response.json();
      const productMap = data.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
      setProductCache(productMap);
      setProductsLoaded(true); // Set productsLoaded to true once products are fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchItems = async (selectedCategory) => {
    if (!storeId) return;
    try {
      const response = await fetch(
        `${apiUrl}/products/category/?category=${selectedCategory}&storeId=${storeId}`
      );
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchActiveDiscounts = async () => {
    if (!storeId || !productsLoaded) return; // Ensure products are loaded
    try {
      const response = await fetch(
        `${apiUrl}/discounts/active?storeId=${storeId}`
      );
      const discountsData = await response.json();
      const discountsWithProductNames = discountsData.map((discount) => ({
        ...discount,
        product: productCache[discount.productId] || {
          name: "Unknown Product",
          imageUrl: "",
        },
      }));
      setActiveDiscounts(discountsWithProductNames);
    } catch (error) {
      console.error("Error fetching active discounts:", error);
    }
  };

  const fetchDiscountHistory = async () => {
    if (!storeId || !productsLoaded) return; // Ensure products are loaded
    try {
      const response = await fetch(
        `${apiUrl}/discounts/history?storeId=${storeId}`
      );
      const historyData = await response.json();
      const historyWithProductNames = historyData.map((discount) => ({
        ...discount,
        product: productCache[discount.productId] || {
          name: "Unknown Product",
          imageUrl: "",
        },
      }));
      setDiscountHistory(historyWithProductNames);
    } catch (error) {
      console.error("Error fetching discount history:", error);
    }
  };

  useEffect(() => {
    if (category && storeId) {
      fetchItems(category);
    }
  }, [category, storeId]);

  useEffect(() => {
    if (storeId && productsLoaded) {
      // Ensure products are loaded
      fetchActiveDiscounts();
      fetchDiscountHistory();
    }
  }, [storeId, productsLoaded]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscountValue(event.target.value);
  };

  const handleNotifyUsers = async () => {
    if (!selectedItem || !discountValue) {
      alert("Please select an item and enter a discount.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/products/discounts/update`, {
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
      });

      if (response.ok) {
        alert("Discount updated successfully!");
        setSelectedItem("");
        setDiscountValue("");
        fetchActiveDiscounts();
      } else {
        const errorData = await response.json();
        alert(`Error updating discount: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating discount:", error);
      alert("An error occurred while updating the discount.");
    }
  };

  const handleDisableDiscount = async (discountId) => {
    try {
      const response = await fetch(`${apiUrl}/discounts/disable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ discountId }),
      });

      if (response.ok) {
        alert("Discount disabled and notifications removed successfully!");
        fetchActiveDiscounts();
        fetchDiscountHistory();
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
        <div className="discount-container">
          <div className="text-container">
            <p>Discount History</p>
            <hr className="divider" />
          </div>
        </div>

        <div className="discounts-list">
          {discountHistory.length > 0 ? (
            discountHistory.map((discount) => (
              <div key={discount.id} className="discount-card">
                <div className="discount-details">
                  <img
                    src={`${apiUrl}${discount.product.imageUrl}`}
                    alt={discount.product.name}
                    className="discount-item-image"
                  />

                  <div>
                    <p className="discount-item-name">
                      {discount.product.name}
                    </p>
                    <p className="discount-value">
                      Discount: {discount.discountPercentage}%
                    </p>
                    <p className="discount-date">
                      Created On:{" "}
                      {new Date(discount.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-container">
              <div>
                <BsClockHistory className="empty-state-icon" />
                <p className="empty-state-text">No history available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mid container */}
      <div className="mid-container">
        <div className="discount-container">
          <div className="text-container">
            <p>Discount</p>
            <hr className="divider" />
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
            <option value="hoodies">hoodies</option>
            <option value="shirt">shirt</option>
            <option value="t-shirts">t-shirts</option>
            <option value="long shirts">long shirts</option>
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
            min="0"
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
        <div className="discount-container">
          <div className="text-container">
            <p>Active Discounts</p>
            <hr className="divider" />
          </div>
        </div>

        <div className="discounts-list">
          {activeDiscounts.length > 0 ? (
            activeDiscounts.map((discount) => (
              <div key={discount.id} className="discount-card">
                <div className="discount-details">
                  <img
                    src={`${apiUrl}${discount.product.imageUrl}`}
                    alt={discount.product.name}
                    className="discount-item-image"
                  />

                  <div className="discount-info">
                    <p className="discount-item-name">
                      {discount.product.name}
                    </p>
                    <p className="discount-value">
                      Discount: {discount.discountPercentage}%
                    </p>
                    <p className="discount-date">
                      Created On:{" "}
                      {new Date(discount.createdAt).toLocaleDateString()}
                    </p>
                  </div>
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
            <div className="empty-state-container">
              <div>
                <TbDiscount className="empty-state-icon" />
                <p className="empty-state-text">No active discounts</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountsPage;
