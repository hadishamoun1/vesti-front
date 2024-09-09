import React, { useState } from "react";
import "../styles/CreateStore.css";

const CreateStorePage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="store-container">
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="store-name">Store</label>
          <input id="store-name" type="text" placeholder="Store Name" />
        </div>
        <div className="form-group">
          <label htmlFor="store-description">Description</label>
          <textarea
            id="store-description"
            placeholder="Store Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="store-location">Location</label>
          <input id="store-location" type="text" placeholder="Store Location" />
        </div>
      </div>
      <div className="upload-container">
        {image ? (
          <img src={image} alt="Uploaded" className="upload-image" />
        ) : (
          <label className="upload-text">
            Upload an Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        )}
      </div>
    </div>
  );
};

export default CreateStorePage;
