// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import Layout from "./Layout";
import CreateStorePage from "./Pages/CreateStore";
import ViewStore from "./Pages/ViewStore";
import CreateProduct from "./Pages/CreateProduct";
import DiscountPage from "./Pages/Discounts";
import AdminPanel from "./Pages/adminUsers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-store"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <CreateStorePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-store"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <ViewStore />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <CreateProduct />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/discounts"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <DiscountPage />
                </Layout>
              </ProtectedRoute>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
