import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    ticketType: 'General',
    age: '',
    gender: '',
    address: '',
    emergencyContact: '',
    notes: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      return setMessage({ type: "error", text: "Please upload your payment image." });
    }

    setLoading(true);

    try {
      const data = new FormData();

      // append text fields
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      // ⭐ MUST MATCH backend multer → upload.single("image")
      data.append("image", image);

      console.log("Submitting FormData...");
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

      const res = await axios.post(
        API + "/api/registrations",
        data
      );

      setMessage({
        type: "success",
        text: "Registration submitted successfully!"
      });

    } catch (err) {
      console.log("Upload failed:", err);

      setMessage({
        type: "error",
        text: err.response?.data?.message || "Submission failed"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 card">
      <h2 className="text-2xl font-semibold">Register for Concert</h2>

      <form
        onSubmit={submit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label className="block text-sm">Full name</label>
          <input
            name="fullName"
            required
            value={form.fullName}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <label className="block text-sm">Phone</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <label className="block text-sm">Ticket Type</label>
          <select
            name="ticketType"
            value={form.ticketType}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          >
            <option>General</option>
            <option>VIP</option>
            <option>Backstage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Age</label>
          <input
            name="age"
            value={form.age}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div>
          <label className="block text-sm">Gender</label>
          <input
            name="gender"
            value={form.gender}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            className="mt-1 p-3 w-full rounded-lg border"
          />
        </div>

        {/* Upload Receipt */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold">
            Upload Payment Image (JPG/PNG)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="mt-2 w-full"
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 rounded-lg border"
            />
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="btn bg-indigo-600 text-white btn-raise p-3 rounded-lg w-full"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={
            message.type === "success"
              ? "text-green-600 mt-4"
              : "text-red-600 mt-4"
          }
        >
          {message.text}
        </div>
      )}
    </section>
  );
}
