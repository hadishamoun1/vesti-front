import React, { useState } from "react";
import "../styles/CreateStore.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { jwtDecode } from "jwt-decode";

const redPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LocationMarker = ({ setLocation, position, setPosition }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition([lat, lng]);
      setLocation({ lat, lng }); 
    },
  });

  return (
    <Marker position={position} icon={redPinIcon}>
      <Popup>Drag the marker to set your location</Popup>
    </Marker>
  );
};

const CreateStorePage = () => {
  document.title = "Edit Store";
  const [image, setImage] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [position, setPosition] = useState([37.7749, -122.4194]);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get the JWT token from session storage and decode it
  const token = sessionStorage.getItem("jwtToken");
  let storeId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    storeId = decodedToken.storeId;
  }

  const handleFormSubmit = async () => {
    console.log("Form submission initiated...");

    if (!storeId) {
      console.error("Store ID is not available.");
      return;
    }

    if (!storeName || !storeDescription || !location.lat || !location.lng) {
      console.error("Please fill out all fields and set a location.");
      return;
    }

    const formData = new FormData();
    formData.append("name", storeName);
    formData.append("description", storeDescription);
    const locationGeoJSON = {
      type: "Point",
      coordinates: [location.lng, location.lat], 
    };
    formData.append("location", JSON.stringify(locationGeoJSON));
    if (image) {
      formData.append("picture", image);
    }

    try {
      console.log("Sending request to update store...");
      const response = await fetch(
        `http://localhost:3000/stores/update/${storeId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Store updated successfully:", result);
        setSuccessMessage("Store updated successfully!");
        setMapOpen(false);
      } else {
        console.error("Error updating store:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleMapDoneClick = () => {
    setMapOpen(false); 
  };

  return (
    <div className="store-container">
      <div className="form-container">
        <div className="form-group">
          <h2 className="form-title">Create store</h2>
          <label htmlFor="store-name">Store</label>
          <input
            id="store-name"
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="store-description">Description</label>
          <textarea
            id="store-description"
            placeholder="Store Description"
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="store-location">Location</label>
          <div className="map-container" onClick={() => setMapOpen(true)}>
            <FaMapMarkerAlt className="map-icon" />
            <span>Set Location</span>
          </div>
          <div className="location-display">
            {location.lat !== null && location.lng !== null && (
              <div>
                <div>
                  <strong>Latitude:</strong> {location.lat}
                </div>
                <div>
                  <strong>Longitude:</strong> {location.lng}
                </div>
              </div>
            )}
          </div>
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

      <button onClick={handleFormSubmit} className="done-button-main">
        Done
      </button>

      {mapOpen && (
        <div className="map-popup">
          <MapContainer
            center={position}
            zoom={12}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker
              setLocation={setLocation}
              position={position}
              setPosition={setPosition}
            />
          </MapContainer>
          <button onClick={handleMapDoneClick} className="done-button">
            Done
          </button>
        </div>
      )}

      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage("")}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CreateStorePage;
