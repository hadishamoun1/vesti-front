import React, { useState } from "react";
import "../styles/CreateProduct.css";

const CreateProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreateProduct = () => {
    if (!productName || !productDescription || !price || !image) {
      console.error("Please fill out all fields and upload an image.");
      return;
    }

    // Handle form submission logic (e.g., send data to API)
    setSuccessMessage("Product created successfully!");
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
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

      <button onClick={handleCreateProduct} className="done-button-main">
        Create Product
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
