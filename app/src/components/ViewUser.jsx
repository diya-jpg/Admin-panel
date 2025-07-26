// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ViewUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   axios
//     .get(`http://localhost:3001/dashboard/users/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then((res) => setUser(res.data))
//     .catch((err) => {
//       console.error("Failed to fetch user", err);
//     });
// }, [id]);



//   if (!user) return <p>Loading user data...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>User Details</h2>
     
//       <p><strong>ID:</strong> {user.id}</p>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//       <p><strong>Role:</strong> {user.role}</p>

//       <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
//         Back
//       </button>
//     </div>
//   );
// };

// export default ViewUser;
// UserDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams(); // Get user id from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/dashboard/users/${id}?`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role_name || user.role}</p>

      <button id="back_btn"onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        Back
      </button>
    </div>
  );
};

export default UserDetails;
