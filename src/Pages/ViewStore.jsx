// src/components/ViewStore.js
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/ViewStore.css";

const ViewStore = () => {
  const [products, setProducts] = useState([]);
  const [storeImage, setStoreImage] = useState("");
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("jwtToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const storeIdFromToken = decodedToken.storeId;
          setStoreId(storeIdFromToken);

          // Fetch the store data
          const storeResponse = await fetch(
            `http://localhost:3000/stores/${storeIdFromToken}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (storeResponse.ok) {
            const storeData = await storeResponse.json();
            const baseUrl = "http://localhost:3000";
            const imageUrl = `${baseUrl}${storeData.pictureUrl}`;
            console.log("Image URL:", imageUrl);
            setStoreImage(imageUrl);
          } else {
            console.error("Failed to fetch store data");
          }

          // Fetch products
          const productsResponse = await fetch(
            `http://localhost:3000/products/products/${storeIdFromToken}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (productsResponse.ok) {
            const data = await productsResponse.json();
            setProducts(data);
          } else {
            console.error("Failed to fetch products");
          }
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="view-store-container">
      <div className="store-image-container">
        {storeImage ? (
          <img src={storeImage} alt="Store" className="store-image" />
        ) : (
          <p>No store image available</p>
        )}
      </div>
      <h2 className="products-heading">Products</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.pictureUrl}
                alt={product.name}
                className="product-image"
              />
              <hr className="product-divider" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ViewStore;
