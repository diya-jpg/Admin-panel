// // DeviceDetails.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const DeviceDetails = () => {
//   const { id } = useParams(); // Get device id from URL
//   console.log(id);
//   const navigate = useNavigate();

//   const [device, setDevice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get(`http://localhost:3001/devices/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setDevice(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch device details");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Loading device details...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Device Details</h2>
//       <p><strong>Code Name:</strong> {device.code_name}</p>
//       <p><strong>Category:</strong> {device.category}</p>
//       <p><strong>Manufacturer:</strong> {device.manufacturer}</p>
//       <p><strong>Supplier:</strong> {device.supplier}</p>
//       <p><strong>Purchase On:</strong> {device.purchase_on?.split("T")[0]}</p>
//       <p><strong>Price:</strong> {device.price}</p>
//       <p><strong>Warranty Till:</strong> {device.warranty_till?.split("T")[0]}</p>
//       <p><strong>Is Dead:</strong> {device.is_dead ? "Yes" : "No"}</p>
//       <p><strong>Remarks:</strong> {device.remarks}</p>
//       <p><strong>Assigned User:</strong> {device.user_name}</p>
//       {device.photo1 && (
//         <img src={device.photo1} alt="Photo 1" style={{ maxWidth: "200px" }} />
//       )}
//       {device.photo2 && (
//         <img src={device.photo2} alt="Photo 2" style={{ maxWidth: "200px" }} />
//       )}

//       <button id="back_btn" onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
//         Back
//       </button>
//      <button id="back_btn"
//   onClick={() => navigate(`/dashboard/devices/assign-user/${device.device_id}`)}
//   style={{ marginTop: "20px", marginLeft: "20px" }}
// >
//   Assigned User
// </button>

//     </div>
//   );
// };

// export default DeviceDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeviceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingDevice, setLoadingDevice] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch device details
    axios
      .get(`http://localhost:3001/devices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDevice(res.data);
        setLoadingDevice(false);
      })
      .catch(() => {
        setError("Failed to fetch device details");
        setLoadingDevice(false);
      });

    // Fetch assignment history
    axios
      .get(`http://localhost:3001/devices/${id}/assignment-history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHistory(res.data);
        setLoadingHistory(false);
      })
      .catch(() => setLoadingHistory(false));
  }, [id]);

  if (loadingDevice) return <p>Loading device details...</p>;
  if (error) return <p>{error}</p>;
  if (!device) return <p>Device not found.</p>;

  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
      {/* Left side: Device details */}
      <div style={{ flex: 2 }}>
        <h2>Device Details</h2>
        <p><strong>Code Name:</strong> {device.code_name}</p>
        <p><strong>Category:</strong> {device.category}</p>
        <p><strong>Manufacturer:</strong> {device.manufacturer}</p>
        <p><strong>Supplier:</strong> {device.supplier}</p>
        <p><strong>Purchase On:</strong> {device.purchase_on?.split("T")[0]}</p>
        <p><strong>Price:</strong> {device.price}</p>
        <p><strong>Warranty Till:</strong> {device.warranty_till?.split("T")[0]}</p>
        <p><strong>Is Dead:</strong> {device.is_dead ? "Yes" : "No"}</p>
        <p><strong>Remarks:</strong> {device.remarks}</p>
        {device.photo1 && (
          <img src={device.photo1} alt="Photo 1" style={{ maxWidth: "200px" }} />
        )}
        {device.photo2 && (
          <img src={device.photo2} alt="Photo 2" style={{ maxWidth: "200px" }} />
        )}

        <button
          onClick={() => navigate(-1)}
        style={{
          marginLeft: "10px",
          marginTop: "20px",
          padding: "8px 16px",
          color: "white",
          backgroundColor: "#4CAF50",
          border: "none",
          borderRadius: "4px",
        }}
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/dashboard/devices/assign-user/${device.device_id}`)}
          style={{
          marginLeft: "20px",
          marginTop: "20px",
          padding: "8px 16px",
          color: "white",
          backgroundColor: "#4CAF50",
          border: "none",
          borderRadius: "4px",
        }}
        >
          Assign User
        </button>
      </div>

      {/* Right side: Assignment history */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <h3>Assignment History</h3>
        {loadingHistory ? (
          <p>Loading assignment history...</p>
        ) : history.length === 0 ? (
          <p>No assignment history found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #aaa", padding: "8px", textAlign: "left" }}>
                  User Name
                </th>
                <th style={{ borderBottom: "1px solid #aaa", padding: "8px", textAlign: "left" }}>
                  Assigned On
                </th>
                <th style={{ borderBottom: "1px solid #aaa", padding: "8px", textAlign: "left" }}>
                  Assigned Till
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map(({ user_id, user_name, assigned_on, assigned_till }) => (
                <tr key={user_id + assigned_on}>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{user_name}</td>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                    {new Date(assigned_on).toLocaleDateString()}
                  </td>
                  <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                    {assigned_till ? new Date(assigned_till).toLocaleDateString() : "Current"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DeviceDetails;
