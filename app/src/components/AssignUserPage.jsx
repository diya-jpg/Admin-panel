// // AssignUserPage.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AssignUserPage = () => {
//   const { id } = useParams(); // device ID from URL
//   const navigate = useNavigate();

//   const [device, setDevice] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // Fetch device
//     axios
//       .get(`http://localhost:3001/dashboard/devices/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("Fetched device data:", res.data);
//   if (Array.isArray(res.data)) {
//     setDevice(res.data[0]);  // <-- grab the first device object
//     setSelectedUserId(res.data[0].user_id || "");
//   } else {
//     setDevice(res.data);
//     setSelectedUserId(res.data.user_id || "");
//   }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch device:", err);
//         setLoading(false);
//       });

//     // Fetch users
//     axios
//       .get("http://localhost:3001/dashboard/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUsers(res.data);
//       })
//       .catch((err) => console.error("Failed to fetch users:", err));
//   }, [id]);

//   const handleAssign = async () => {
//     if (!selectedUserId) return alert("Please select a user");
//  const token = localStorage.getItem("token"); // <--- get token here

//     if (!token) {
//       alert("You must be logged in to assign a user.");
//       return;
//     }
//     try {
//       await axios.put(`http://localhost:3001/devices/${id}/assign`, 
//          { userId: selectedUserId },
//   { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage("User assigned successfully!");
//     } catch (err) {
//       console.error("Error assigning user:", err);
//       setMessage("Failed to assign user.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!device) return <p>Device not found.</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Assign User to Device</h2>

//       <p><strong>Code Name:</strong> {device.code_name}</p>
//       <p><strong>Category:</strong> {device.category}</p>
//       <p><strong>Current Assigned User:</strong> {device.user_name || "None"}</p>

//       <div style={{ marginTop: "20px" }}>
//         <label><strong>Select New User:</strong></label><br />
//         <select
//           value={selectedUserId}
//           onChange={(e) => setSelectedUserId(e.target.value)}
//           style={{ padding: "5px", marginTop: "10px" }}
//         >
//           <option value="">-- Select User --</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handleAssign}
//         style={{
//           marginTop: "20px",
//           padding: "8px 16px",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//         }}
//       >
//         Assign User
//       </button>

//       <button
//         onClick={() => navigate(-1)}
//         style={{
//           marginLeft: "10px",
//           marginTop: "20px",
//           padding: "8px 16px",
//            color: "white",
//           backgroundColor:"#4CAF50",
//           border: "none",
//           borderRadius: "4px",
//         }}
//       >
//         Back
//       </button>

//       {message && (
//         <p style={{ marginTop: "15px", color: message.includes("success") ? "green" : "red" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default AssignUserPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AssignUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/dashboard/devices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setDevice(data);
        setSelectedUserId(data.user_id || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get("http://localhost:3001/dashboard/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, [id]);

  const handleAssign = async () => {
    if (!selectedUserId) {
      alert("Please select a user");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to assign a user.");
      return;
    }

    setAssigning(true);
    setMessage("");

    try {
      await axios.put(
        `http://localhost:3001/devices/${id}/assign`,
        { userId: selectedUserId }, // only send userId
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("User assigned successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to assign user.";
      setMessage(errorMsg);
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!device) return <p>Device not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assign User to Device</h2>

      <p><strong>Code Name:</strong> {device.code_name}</p>
      <p><strong>Category:</strong> {device.category}</p>
      <p><strong>Current Assigned User:</strong> {device.user_name || "None"}</p>

      <div style={{ marginTop: "20px" }}>
        <label><strong>Select New User:</strong></label><br />
        <select
          value={selectedUserId}
          onChange={(e) => {
            setSelectedUserId(e.target.value);
            setMessage("");
          }}
          style={{ padding: "5px", marginTop: "10px" }}
          disabled={assigning}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        disabled={assigning || !selectedUserId || selectedUserId === device.user_id}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor:
            assigning || !selectedUserId || selectedUserId === device.user_id
              ? "#9E9E9E"
              : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor:
            assigning || !selectedUserId || selectedUserId === device.user_id
              ? "not-allowed"
              : "pointer",
        }}
      >
        {assigning ? "Assigning..." : "Assign User"}
      </button>

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
        disabled={assigning}
      >
        Back
      </button>

      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.toLowerCase().includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AssignUserPage;
