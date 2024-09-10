import React, { useState } from "react";
import "../styles/CreateProduct.css"; // CSS file for styling

const CreateProductPage = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDoneClick = async () => {
    if (!productName || !productDescription || !productPrice) {
      console.error("Please fill out all fields.");
      return;
    }

    // Construct the data to send to the API
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    if (image) {
      formData.append("picture", image);
    }

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product created successfully:", result);
        setSuccessMessage("Product created successfully!");
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="product-container">
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            type="text"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers and decimal points
              if (/^\d*\.?\d*$/.test(value)) {
                setProductPrice(value);
              }
            }}
          />
        </div>
      </div>
      <div className="upload-container">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="upload-image"
          />
        ) : (
          <label className="upload-text">
            Upload an Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </label>
        )}
      </div>
      <button onClick={handleDoneClick} className="done-button-main">
        Done
      </button>
      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage("")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CreateProductPage;
