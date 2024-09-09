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

// Define a custom icon for the marker
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
  const [image, setImage] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [position, setPosition] = useState([37.7749, -122.4194]); // Default position

  const handleDoneClick = () => {
    setMapOpen(false);
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
          <img src={image} alt="Uploaded" className="upload-image" />
        ) : (
          <label className="upload-text">
            Upload an Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setImage(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        )}
      </div>

      {/* Done Button at the bottom-right corner under the upload container */}
      <button onClick={handleDoneClick} className="done-button-main">
        Done
      </button>

      {/* Map Popup */}
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
          <button onClick={handleDoneClick} className="done-button">
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateStorePage;
