import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 
 LocationGate wraps your app and:
  asks for browser geolocation,reverse-geocodes using Google Maps JS API,
  allows render if inside Prayagraj/Allahabad (Uttar Pradesh),
  otherwise redirects to /change-location.
*/

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

export default function LocationGate({ children }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | allowed | denied | outside | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      setStatus("error");
      setMessage("Google Maps API key not set (VITE_GOOGLE_MAPS_API_KEY).");
      return;
    }

    if (!("geolocation" in navigator)) {
      setStatus("error");
      setMessage("Geolocation is not available in this browser.");
      return;
    }

    const onPosition = async (pos) => {
      // Dev-only forced coords: only use forced coords when in dev mode
      const rawForce = import.meta.env.VITE_FORCE_COORDS; 
      const force = import.meta.env.DEV && rawForce ? rawForce : null;
      const [forcedLat, forcedLng] = force ? force.split(",").map(s => parseFloat(s.trim())) : [null, null];
      const lat = force ? forcedLat : pos.coords.latitude;
      const lng = force ? forcedLng : pos.coords.longitude;
      // If we used a forced value and force was set, we can skip loading google maps
      if (force) {
       // Run the same check logic that would happen after reverse-geocode,
       // but since I don't have address_components, rely on forcedAllow flag or coords range.
       // For simplicity, treat forced coords inside known Prayagraj bounds as allowed.
      const prayagrajBounds = {
      north: 25.6,
      south: 25.2,
      west: 81.6,
      east: 82.0
      };
      const inBounds =
      lat >= prayagrajBounds.south && lat <= prayagrajBounds.north &&
      lng >= prayagrajBounds.west && lng <= prayagrajBounds.east;

      if (inBounds) {
       setStatus("allowed");
       } else {
        setStatus("outside");
        navigate("/change-location");
       }
        return;
      }

      // Normal flow -load Google Maps & reverse geocode
      try {
        const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
        await loadScript(src);

       /* global google */
       const geocoder = new google.maps.Geocoder();
       geocoder.geocode({ location: { lat, lng } }, (results, status) => {
       if (status !== "OK" || !results || results.length === 0) {
        setStatus("error");
        setMessage("Reverse geocoding failed. Try again.");
        return;
        }
        const comp = {};
        for (const c of results[0].address_components || []) {
        for (const t of c.types) comp[t] = c.long_name;
        }
        const state = (comp.administrative_area_level_1 || "").toLowerCase();
        const cityCandidates = [
          (comp.locality || "").toLowerCase(),
          (comp.administrative_area_level_2 || "").toLowerCase(),
          (comp.sublocality || "").toLowerCase(),
          (comp.neighborhood || "").toLowerCase(),
        ];
        const inUttarPradesh = state.includes("uttar pradesh");
        const inPrayagraj = cityCandidates.some(
           (n) => n && (n.includes("prayagraj") || n.includes("allahabad"))
        );
        if (inUttarPradesh && inPrayagraj) {
           setStatus("allowed");
        } else {
          setStatus("outside");
          navigate("/change-location");
        }
       });
      } catch (err) {
        console.error("Maps script or geocode error:", err);
        setStatus("error");
        setMessage("Failed to load Google Maps or geocode. Check the API key or use VITE_FORCE_COORDS.");
      }
    };


    const onError = (err) => {
      console.warn("Geolocation error:", err);
      if (err && err.code === 1) {
        setStatus("denied");
        setMessage("Location permission denied. Allow location or change location manually.");
        navigate("/change-location");
      } else {
        setStatus("error");
        setMessage("Unable to get your location. Try again.");
      }
    };

    navigator.geolocation.getCurrentPosition(onPosition, onError, { timeout: 10000 });
  }, [navigate]);

  if (status === "allowed" || location.pathname === "/change-location") {
    return <>{children}</>;
  }

  if (status === "checking") {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 12 }}>Detecting your location…</div>
          <div style={{ fontSize: 12, color: "#666" }}>Please allow location access if prompted.</div>
        </div>
      </div>
    );
  }

  if (status === "allowed") return <>{children}</>;

  // denied / outside / error fallback UI
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 20 }}>
      <div style={{ maxWidth: 540, textAlign: "center", background: "#fff", padding: 28, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: 8 }}>
          {status === "outside" ? "You are outside the service area" : status === "denied" ? "Location access denied" : "Unable to detect location"}
        </h2>
        <p style={{ color: "#444", marginBottom: 20 }}>
          {status === "outside"
            ? "We currently serve only addresses inside Allahabad / Prayagraj. Please change your location to continue."
            : message || "Please allow location access or change your location."}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => window.location.reload()} style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid #ccc", background: "#fff" }}>
            Try again
          </button>
          <button onClick={() => (window.location.href = "/change-location")} style={{ padding: "8px 14px", borderRadius: 6, background: "#2563eb", color: "white", border: "none" }}>
            Change location
          </button>
        </div>
      </div>
    </div>
  );
}
