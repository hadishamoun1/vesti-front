import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home"; 
import Layout from "./Layout"; 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage /> 
              </Layout>
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
