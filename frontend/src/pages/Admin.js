import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const API = process.env.REACT_APP_API_URL;
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewImage, setViewImage] = useState(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const res = await axios.get(`${API}/api/registrations/all`);
      setRegs(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const confirmReg = async (id) => {
    try {
      await axios.put(`${API}/api/registrations/confirm/${id}`);
      alert("Registration Confirmed!");
      loadRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectReg = async (id) => {
    try {
      await axios.put(`${API}/api/registrations/reject/${id}`);
      alert("Registration Rejected!");
      loadRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = (status) => {
    if (status === "confirmed") return { color: "green", fontWeight: "bold" };
    if (status === "rejected") return { color: "red", fontWeight: "bold" };
    return { color: "orange", fontWeight: "bold" };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : regs.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Ticket</th>
              <th>Payment Proof</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {regs.map((r) => (
              <tr key={r._id}>
                <td>{r.fullName}</td>
                <td>{r.email}</td>
                <td>{r.ticketType}</td>

                <td>
                  <button 
                    onClick={() => setViewImage(r.paymentImageURL)}
                    style={{ background: "#3498db", color: "white", padding: "5px", borderRadius: "5px" }}
                  >
                    View Proof
                  </button>
                </td>

                <td style={statusColor(r.status)}>
                  {r.status ? r.status.toUpperCase() : "PENDING"}
                </td>

                <td>
                  <button 
                    onClick={() => confirmReg(r._id)}
                    disabled={r.status === "confirmed"}
                    style={{ 
                      background: r.status === "confirmed" ? "gray" : "green",
                      color: "white",
                      padding: "5px",
                      marginRight: "5px",
                      cursor: r.status === "confirmed" ? "not-allowed" : "pointer"
                    }}
                  >
                    Confirm
                  </button>

                  <button 
                    onClick={() => rejectReg(r._id)}
                    disabled={r.status === "rejected"}
                    style={{ 
                      background: r.status === "rejected" ? "gray" : "red",
                      color: "white",
                      padding: "5px",
                      cursor: r.status === "rejected" ? "not-allowed" : "pointer"
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* IMAGE MODAL */}
      {viewImage && (
        <div 
          onClick={() => setViewImage(null)}
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img 
            src={viewImage}
            alt="Payment Proof"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
