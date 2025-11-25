import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const API_URL = "http://localhost:5000/api/admin/login"; // ✅ FIXED URL

    try {
      const res = await axios.post(API_URL, form, {
        headers: { "Content-Type": "application/json" }
      });
      

      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        "Login failed: " +
          (err.response?.data?.message || "Cannot reach backend server")
      );
    }
  };

  return (
    <section className="mt-8 card max-w-md">
      <h2 className="text-xl font-semibold">Admin Login</h2>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm">Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <button type="submit" className="btn bg-indigo-600 text-white">
            Login
          </button>
        </div>

        {error && <div className="text-red-600">{error}</div>}
      </form>
    </section>
  );
}
