// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Layout from "./Layout";
import CreateStorePage from "./Pages/CreateStore";
import ViewStore from "./Pages/ViewStore";
import CreateProduct from "./Pages/CreateProduct";
import DiscountPage from "./Pages/Discounts";
import AdminPanel from "./Pages/adminUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/unauthorized";
import LoaderPage from "./components/Loader";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

       
          <Route path="/loading" element={<LoaderPage />} />
          <Route
            path="/create-store"
            element={
              <Layout>
                <CreateStorePage />
              </Layout>
            }
          />
          <Route
            path="/view-store"
            element={
              <Layout>
                <ViewStore />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <CreateProduct />
              </Layout>
            }
          />
          <Route
            path="/discounts"
            element={
              <Layout>
                <DiscountPage />
              </Layout>
            }
          />

          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
