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
    <div className="min-h-screen relative">
      
      {/* ✅ BACKGROUND IMAGE */}
      <div className="fixed inset-0 -z-20 bg-custom-image bg-cover bg-center"></div>

      {/* ✅ SOFT OVERLAY (does NOT block content) */}
      <div className="fixed inset-0 -z-10 bg-black/50"></div>

      {/* ✅ CONTENT */}
      <div className="relative z-10">
        <NavBar />

        {/* ✅ MAIN CONTAINER (WHITE BACKGROUND GUARANTEES VISIBILITY) */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-white/95 rounded-xl shadow-xl p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>
      </div>

    </div>
  );
}
