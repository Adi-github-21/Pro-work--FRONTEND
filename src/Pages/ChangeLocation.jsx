import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChangeLocation() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>
      <div style={{ maxWidth: 640, textAlign: "center", background: "#fff", padding: 28, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <h1 style={{ marginBottom: 8 }}>Location not supported</h1>
        <p style={{ marginBottom: 20 }}>
          We currently serve only addresses inside Allahabad / Prayagraj, Uttar Pradesh. Please change the address to continue.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => navigate(-1)} style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #ccc", background: "#fff" }}>
            Go back
          </button>
          <button onClick={() => navigate("/")} style={{ padding: "8px 14px", borderRadius: 6, background: "#2563eb", color: "white", border: "none" }}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
