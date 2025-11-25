import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div
      className="
        min-h-screen 
        bg-custom-image bg-cover bg-center bg-fixed
        relative
      "
    >
      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-b from-black/60 via-black/40 to-black/60
          backdrop-blur-[2px]
        "
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <NavBar />

        <main className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
