// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userObj = JSON.parse(storedUser);
//       setCurrentUser(userObj);
//     }
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios
//       .get("http://localhost:3001/dashboard/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Failed to fetch users", err));
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post(
//         "http://localhost:3001/dashboard/addUser",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("User added successfully");
//       setFormData({ name: "", email: "", phone: "", password: "" });
//       setShowForm(false);
//       fetchUsers();
//     } catch (err) {
//       console.error("🔥 Add user error:", err);
//       alert("Failed to add user: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h2>User List</h2>
//         {currentUser?.role === "admin" && (
//           <button id="btnusers" onClick={() => setShowForm(!showForm)}>
//             {showForm ? "Close Form" : "Add User"}
//           </button>
//         )}
//       </div>

//       {currentUser?.role === "admin" && showForm && (
//         <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleFormChange}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleFormChange}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleFormChange}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleFormChange}
//             required
//             style={inputStyle}
//           />
//           <button type="submit" style={{ marginTop: "10px", marginRight: "10px" }}>
//             Submit
//           </button>
         
//         </form>
//       )}

//       {!showForm && (
//         <>
//           {users.length === 0 ? (
//             <p>No users found</p>
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={thStyle}>ID</th>
//                   <th style={thStyle}>Name</th>
//                   <th style={thStyle}>Email</th>
//                   <th style={thStyle}>Phone</th>
//                   <th style={thStyle}>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id} style={trStyle}>
//                     <td style={tdStyle}>{user.id}</td>
//                     <td style={tdStyle}>{user.name}</td>
//                     <td style={tdStyle}>{user.email}</td>
//                     <td style={tdStyle}>{user.phone}</td>
//                     <td style={tdStyle}>{user.role}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // Styles
// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
// };

// const thStyle = {
//   padding: "12px 15px",
//   borderBottom: "2px solid #ddd",
//   backgroundColor: "#f7f7f7",
//   textAlign: "left",
// };

// const tdStyle = {
//   padding: "12px 15px",
//   borderBottom: "1px solid #eee",
// };

// const trStyle = {
//   backgroundColor: "#fff",
// };

// const inputStyle = {
//   display: "block",
//   marginBottom: "10px",
//   padding: "8px",
//   width: "100%",
//   maxWidth: "400px",
// };

// export default Users;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/dashboard/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = editMode
        ? `http://localhost:3001/dashboard/users/${editingUserId}`
        : "http://localhost:3001/dashboard/addUser";

      const method = editMode ? "put" : "post";

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`User ${editMode ? "updated" : "added"} successfully!`);
      setShowForm(false);
      fetchUsers();
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      setEditMode(false);
      setEditingUserId(null);
    } catch (err) {
      console.error(err);
      alert(`Failed to ${editMode ? "update" : "add"} user`);
    }
  };

  const handleEditClick = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "", // Clear password field on edit; optional to change
    });
    setEditingUserId(user.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleViewClick = (user) => {
    navigate(`/dashboard/users/${user.id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User List</h2>
        {currentUser?.role === "admin" && !showForm && (
          <button id="btnuser"onClick={() => setShowForm(true)}>Add User</button>
        )}
        {showForm && (
          <button
          id="btnuser"
            onClick={() => {
              setShowForm(false);
              setEditMode(false);
              setFormData({ name: "", email: "", phone: "", password: "" });
              setEditingUserId(null);
            }}
          >
            Close Form
          </button>
        )}
      </div>

      {showForm && currentUser?.role === "admin" && (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleFormChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder={editMode ? "Change Password (optional)" : "Password"}
            value={formData.password}
            onChange={handleFormChange}
            required={!editMode}
            style={inputStyle}
          />
          <button type="submit" style={{ marginTop: "10px" }}>
            {editMode ? "Update User" : "Add User"}
          </button>
        </form>
      )}

      {!showForm && (
        <>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Role</th>
                  {currentUser?.role === "admin" && (
                    <th style={thStyle}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={trStyle}>
                    <td style={tdStyle}>{user.id}</td>
                    <td style={tdStyle}>{user.name}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>{user.phone}</td>
                    <td style={tdStyle}>{user.role}</td>
                    {currentUser?.role === "admin" && (
                      <td style={tdStyle}>
                        <button onClick={() => handleEditClick(user)}>
                         ✏️
                        </button>{" "}
                        <button onClick={() => handleViewClick(user)}> 👁️</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const thStyle = {
  padding: "12px 15px",
  borderBottom: "2px solid #ddd",
  backgroundColor: "#f7f7f7",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid #eee",
};

const trStyle = {
  backgroundColor: "#fff",
};

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
  width: "100%",
  maxWidth: "400px",
};

export default Users;
