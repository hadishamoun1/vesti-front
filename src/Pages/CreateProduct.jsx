import React, { useState } from "react";
import "../styles/CreateProduct.css";
import { jwtDecode } from "jwt-decode";

const CreateProductPage = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const colorOptions = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Cyan", hex: "#00FFFF" },
  ];

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const getToken = () => {
    return sessionStorage.getItem("jwtToken");
  };

  const getStoreId = () => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return parseInt(decodedToken.storeId, 10);
      } catch (e) {
        console.error("Error decoding token:", e);
        return null;
      }
    }
    return null;
  };

  const handleDoneClick = async () => {
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory ||
      !availableColors.length ||
      !availableSizes.length
    ) {
      console.error("Please fill out all fields.");
      return;
    }

    const token = getToken();
    const storeId = getStoreId();
    if (!token || !storeId) {
      console.error("No token or storeId found.");
      return;
    }

    // Construct the data to send to the API
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("category", productCategory);
    formData.append("storeId", storeId);

    // Format availableColors and availableSizes for API request
    formData.append("availableColors", availableColors.join(","));
    formData.append("availableSizes", availableSizes.join(","));

    if (image) {
      formData.append("picture", image);
    }

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleColorChange = (event) => {
    const colorHex = event.target.value;
    const colorName =
      colorOptions.find((color) => color.hex === colorHex)?.name || "";

    setSelectedColor(colorName);
    setAvailableColors((prevColors) => {
      if (prevColors.includes(colorName)) {
        return prevColors.filter((c) => c !== colorName);
      } else {
        return [...prevColors, colorName];
      }
    });
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;

    setSelectedSize(size);
    setAvailableSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const renderColorsDropdown = () => {
    return (
      <select onChange={handleColorChange} value={selectedColor}>
        <option value="">Select a Color</option>
        {colorOptions.map((color, index) => (
          <option
            key={index}
            value={color.hex}
            style={{ backgroundColor: color.hex }}
          >
            {color.name}
          </option>
        ))}
      </select>
    );
  };

  const renderSizesDropdown = () => {
    return (
      <select onChange={handleSizeChange} value={selectedSize}>
        <option value="">Select a Size</option>
        {sizeOptions.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    );
  };

  const renderColorsCircles = () => {
    return (
      <div className="selected-colors">
        {availableColors.map((color, index) => (
          <div
            key={index}
            className="color-circle"
            style={{
              backgroundColor:
                colorOptions.find((c) => c.name === color)?.hex || "#ffffff",
            }}
            title={color}
          />
        ))}
      </div>
    );
  };

  const renderSizesCircles = () => {
    return (
      <div className="size-swatches">
        {availableSizes.map((size, index) => (
          <div key={index} className="size-circle" title={size}>
            {size}
          </div>
        ))}
      </div>
    );
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
        <div className="form-group">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="books">Books</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="available-colors">Available Colors</label>
          {renderColorsDropdown()}
          {renderColorsCircles()}
        </div>
        <div className="form-group">
          <label htmlFor="available-sizes">Available Sizes</label>
          {renderSizesDropdown()}
          {renderSizesCircles()}
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
