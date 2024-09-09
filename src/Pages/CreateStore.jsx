import React from "react";
import "../styles/CreateStore.css";

const CreateStorePage = () => {
  return (
    <div className="store-container">
      <h1 className="title">Create New Store</h1>
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
    </div>
  );
};

export default CreateStorePage;
