import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import Layout from "./Layout";
import CreateStorePage from "./Pages/CreateStore";
import ViewStore from "./Pages/ViewStore";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
