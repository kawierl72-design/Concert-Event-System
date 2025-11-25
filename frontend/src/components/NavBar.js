import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
    // Updated header style for better blending with the background image overlay
    <header className="bg-black bg-opacity-30 backdrop-blur-sm border-b border-white/20 sticky top-0 z-[999]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo and Branding - Now using white text for contrast */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">CE</div>
          <div>
            <div className="text-lg font-semibold text-white">Concert Events</div>
            <div className="text-sm text-indigo-100">Register & attend</div>
          </div>
        </Link>
        
        {/* Navigation Links - Added new routes here */}
        <nav className="flex items-center gap-6">
          
          <Link to="/" className="text-white hover:text-pink-400 transition">Home</Link>
          
          {/* 👈 ADDED NEW LINKS HERE 👇 */}
          <Link to="/events" className="text-white hover:text-pink-400 transition">Events</Link>
          <Link to="/about" className="text-white hover:text-pink-400 transition">About</Link>
          <Link to="/contact" className="text-white hover:text-pink-400 transition">Contact Us</Link>
          
          <Link to="/register" className="text-white hover:text-pink-400 transition">Register</Link>
          <Link to="/admin" className="text-white hover:text-pink-400 transition">Admin</Link>
            
          {/* Login Button */}
          <Link to="/login" className="inline-block px-4 py-2 rounded-full font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition">Login</Link>
        </nav>
      </div>
    </header>
  );
}