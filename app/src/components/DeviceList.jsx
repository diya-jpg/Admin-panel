
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const DeviceList = () => {
// //   const [users, setUsers] = useState([]);
// //   const [devices, setDevices] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [formData, setFormData] = useState({
// //     user_id: "",
// //     code_name: "",
// //     category: "",
// //     manufacturer: "",
// //     supplier: "",
// //     purchase_on: "",
// //     price: "",
// //     warranty_months: "",
// //     warranty_till: "",
// //     is_dead: 0,
// //     remarks: "",
// //     photo1: "",
// //     photo2: "",
// //   });

// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       const userObj = JSON.parse(storedUser);
// //       setCurrentUser({
// //         role: userObj.role,
// //         userId: userObj.id || userObj.userId,
// //       });
// //     }

// //     fetchDevices();
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = () => {
// //     axios
// //       .get("http://localhost:3001/dashboard/users")
// //       .then((res) => setUsers(res.data))
// //       .catch((err) => console.log("Failed to fetch users", err));
// //   };

// //   const fetchDevices = () => {
// //     axios
// //       .get("http://localhost:3001/dashboard/devices")
// //       .then((res) => setDevices(res.data))
// //       .catch((err) => console.log("Failed to fetch devices", err));
// //   };

// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const token = localStorage.getItem("token");
// // console.log("Submitting user with token:", token);
// //   console.log("Form data:", formData);
// //       await axios.post(
// //         "http://localhost:3001/addDevice",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       alert("Device added successfully!");
// //       setShowForm(false);
// //       fetchDevices();
// //       setFormData({
// //         user_id: "",
// //         code_name: "",
// //         category: "",
// //         manufacturer: "",
// //         supplier: "",
// //         purchase_on: "",
// //         price: "",
// //         warranty_months: "",
// //         warranty_till: "",
// //         is_dead: 0,
// //         remarks: "",
// //         photo1: "",
// //         photo2: "",
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to add device");
// //     }
// //   };

// //   return (
// //     <div>
// //       {(currentUser?.role === "admin" || currentUser?.role === "super admin") && (
// //         <button id="btn_devices" onClick={() => setShowForm(!showForm)}>
// //           {showForm ? "Close Form" : "Add Device"}
// //         </button>
// //       )}

// //       {showForm &&
// //       (currentUser?.role === "admin" || currentUser?.role === "super admin") ? (
// //         <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
// //             <label htmlFor="user_id">Assigned User</label>
// //           <select
// //             name="user_id"
// //             id="user_id"
// //             value={formData.user_id}
// //             onChange={handleFormChange}
// //             required 
// //           >
// //             <option value="">-- Select a User --</option>
// //             {users.map((user) => (
// //               <option key={user.id || user.userId} value={user.id || user.userId}>
// //                 {user.name}
// //               </option>
// //             ))}
// //           </select>

// //           <label>Code Name</label>
// //           <input
// //             name="code_name"
// //             value={formData.code_name}
// //             onChange={handleFormChange}
// //             placeholder="Code Name"
// //             required
// //           />

// //           <label>Category</label>
// //           <input
// //             name="category"
// //             value={formData.category}
// //             onChange={handleFormChange}
// //             placeholder="Category"
// //             required
// //           />

// //           <label>Manufacturer</label>
// //           <input
// //             name="manufacturer"
// //             value={formData.manufacturer}
// //             onChange={handleFormChange}
// //             placeholder="Manufacturer"
// //             required
// //           />

// //           <label>Supplier</label>
// //           <input
// //             name="supplier"
// //             value={formData.supplier}
// //             onChange={handleFormChange}
// //             placeholder="Supplier"
// //           />

// //           <label>Purchase On</label>
// //           <input
// //             name="purchase_on"
// //             type="date"
// //             value={formData.purchase_on}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Price</label>
// //           <input
// //             name="price"
// //             type="number"
// //             value={formData.price}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Warranty Months</label>
// //           <input
// //             name="warranty_months"
// //             type="number"
// //             value={formData.warranty_months}
// //             onChange={handleFormChange}
// //           />

// //           <label>Warranty Till</label>
// //           <input
// //             name="warranty_till"
// //             type="date"
// //             value={formData.warranty_till}
// //             onChange={handleFormChange}
// //           />

// //           <label>Is Dead</label>
// //           <select
// //             name="is_dead"
// //             value={formData.is_dead}
// //             onChange={handleFormChange}
// //           >
// //             <option value={0}>No</option>
// //             <option value={1}>Yes</option>
// //           </select>

// //           <label>Remarks</label>
// //           <textarea
// //             name="remarks"
// //             value={formData.remarks}
// //             onChange={handleFormChange}
// //             placeholder="Remarks"
// //           />

// //           <label>Photo 1 URL (optional)</label>
// //           <input
// //             type="text"
// //             name="photo1"
// //             value={formData.photo1}
// //             onChange={handleFormChange}
// //             placeholder="https://example.com/photo1.jpg"
// //           />

// //           <label>Photo 2 URL (optional)</label>
// //           <input
// //             type="text"
// //             name="photo2"
// //             value={formData.photo2}
// //             onChange={handleFormChange}
// //             placeholder="https://example.com/photo2.jpg"
// //           />

// //           <button type="submit" style={{ marginTop: "20px" }}>
// //             Submit
// //           </button>
// //         </form>
// //       ) : (
// //         <div className="device-container">
// //           <h2>Device List</h2>
// //           <table className="device-table">
// //             <thead>
// //               <tr>
// //                 <th>Code Name</th>
// //                 <th>Category</th>
// //                 <th>Manufacturer</th>
// //                 <th>Supplier</th>
// //                 <th>Purchase On</th>
// //                 <th>Price</th>
// //                 <th>Warranty Till</th>
// //                 <th>Is Dead</th>
// //                 <th>Remarks</th>
// //                 <th>Assigned User</th>
// //                 <th>Edit / Info</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {devices.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="10" className="no-devices-cell">
// //                     No devices found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 devices.map((device) => (
// //                   <tr key={device.id || device.device_id}>
// //                     <td>{device.code_name}</td>
// //                     <td>{device.category}</td>
// //                     <td>{device.manufacturer}</td>
// //                     <td>{device.supplier}</td>
// //                     <td>{device.purchase_on?.split("T")[0]}</td>
// //                     <td>{device.price}</td>
// //                     <td>{device.warranty_till?.split("T")[0]}</td>
// //                     <td>{device.is_dead ? "Yes" : "No"}</td>
// //                     <td>{device.remarks}</td>
// //                     <td>{device.user_name}</td>
// //                     <td>
// //   <button onClick={() => handleView(user_id)} title="View User">
// //     👁️
// //   </button>
// //   <button onClick={() => handleEdit(device_id)} title="Edit Device">
// //     ✏️
// //   </button>
// // </td>

// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DeviceList;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const DeviceList = () => {
// //   const [users, setUsers] = useState([]);
// //   const [devices, setDevices] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [editingDeviceId, setEditingDeviceId] = useState(null);
// //   const [viewDevice, setViewDevice] = useState(null);

// //   const [formData, setFormData] = useState({
// //     user_id: "",
// //     code_name: "",
// //     category: "",
// //     manufacturer: "",
// //     supplier: "",
// //     purchase_on: "",
// //     price: "",
// //     warranty_months: "",
// //     warranty_till: "",
// //     is_dead: 0,
// //     remarks: "",
// //     photo1: "",
// //     photo2: "",
// //   });

// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       const userObj = JSON.parse(storedUser);
// //       setCurrentUser({
// //         role: userObj.role,
// //         userId: userObj.id || userObj.userId,
// //       });
// //     }

// //     fetchDevices();
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = () => {
// //     axios
// //       .get("http://localhost:3001/dashboard/users")
// //       .then((res) => setUsers(res.data))
// //       .catch((err) => console.log("Failed to fetch users", err));
// //   };

// //   const fetchDevices = () => {
// //     axios
// //       .get("http://localhost:3001/dashboard/devices")
// //       .then((res) => setDevices(res.data))
// //       .catch((err) => console.log("Failed to fetch devices", err));
// //   };

// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const token = localStorage.getItem("token");
// //       const url = editMode
// //         ? `http://localhost:3001/devices/${editingDeviceId}`
// //         : "http://localhost:3001/addDevice";

// //       const method = editMode ? "put" : "post";

// //       await axios[method](url, formData, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       alert(`Device ${editMode ? "updated" : "added"} successfully!`);
// //       setShowForm(false);
// //       fetchDevices();
// //       setFormData({
// //         user_id: "",
// //         code_name: "",
// //         category: "",
// //         manufacturer: "",
// //         supplier: "",
// //         purchase_on: "",
// //         price: "",
// //         warranty_months: "",
// //         warranty_till: "",
// //         is_dead: 0,
// //         remarks: "",
// //         photo1: "",
// //         photo2: "",
// //       });
// //       setEditMode(false);
// //       setEditingDeviceId(null);
// //     } catch (err) {
// //       console.error(err);
// //       alert(`Failed to ${editMode ? "update" : "add"} device`);
// //     }
// //   };

// //   const handleEdit = (device) => {
// //     setFormData({
// //       user_id: device.user_id,
// //       code_name: device.code_name,
// //       category: device.category,
// //       manufacturer: device.manufacturer,
// //       supplier: device.supplier || "",
// //       purchase_on: device.purchase_on?.split("T")[0],
// //       price: device.price,
// //       warranty_months: device.warranty_months || "",
// //       warranty_till: device.warranty_till?.split("T")[0] || "",
// //       is_dead: device.is_dead ? 1 : 0,
// //       remarks: device.remarks || "",
// //       photo1: device.photo1 || "",
// //       photo2: device.photo2 || "",
// //     });
// //     setEditMode(true);
// //     setEditingDeviceId(device.device_id || device.id);
// //     setShowForm(true);
// //   };

// //   const handleView = (device) => {
// //     setViewDevice(device);
// //   };

// //   return (
// //     <div>
// //       {(currentUser?.role === "admin" || currentUser?.role === "super admin") && (
// //         <button id="btn_devices" onClick={() => {
// //           setShowForm(!showForm);
// //           setEditMode(false);
// //           setFormData({
// //             user_id: "",
// //             code_name: "",
// //             category: "",
// //             manufacturer: "",
// //             supplier: "",
// //             purchase_on: "",
// //             price: "",
// //             warranty_months: "",
// //             warranty_till: "",
// //             is_dead: 0,
// //             remarks: "",
// //             photo1: "",
// //             photo2: "",
// //           });
// //         }}>
// //           {showForm ? "Close Form" : "Add Device"}
// //         </button>
// //       )}

// //       {showForm &&
// //       (currentUser?.role === "admin" || currentUser?.role === "super admin") ? (
// //         <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
// //           <label htmlFor="user_id">Assigned User</label>
// //           <select
// //             name="user_id"
// //             id="user_id"
// //             value={formData.user_id}
// //             onChange={handleFormChange}
// //             required
// //           >
// //             <option value="">-- Select a User --</option>
// //             {users.map((user) => (
// //               <option key={user.id || user.userId} value={user.id || user.userId}>
// //                 {user.name}
// //               </option>
// //             ))}
// //           </select>

// //           <label>Code Name</label>
// //           <input
// //             name="code_name"
// //             value={formData.code_name}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Category</label>
// //           <input
// //             name="category"
// //             value={formData.category}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Manufacturer</label>
// //           <input
// //             name="manufacturer"
// //             value={formData.manufacturer}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Supplier</label>
// //           <input
// //             name="supplier"
// //             value={formData.supplier}
// //             onChange={handleFormChange}
// //           />

// //           <label>Purchase On</label>
// //           <input
// //             name="purchase_on"
// //             type="date"
// //             value={formData.purchase_on}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Price</label>
// //           <input
// //             name="price"
// //             type="number"
// //             value={formData.price}
// //             onChange={handleFormChange}
// //             required
// //           />

// //           <label>Warranty Months</label>
// //           <input
// //             name="warranty_months"
// //             type="number"
// //             value={formData.warranty_months}
// //             onChange={handleFormChange}
// //           />

// //           <label>Warranty Till</label>
// //           <input
// //             name="warranty_till"
// //             type="date"
// //             value={formData.warranty_till}
// //             onChange={handleFormChange}
// //           />

// //           <label>Is Dead</label>
// //           <select
// //             name="is_dead"
// //             value={formData.is_dead}
// //             onChange={handleFormChange}
// //           >
// //             <option value={0}>No</option>
// //             <option value={1}>Yes</option>
// //           </select>

// //           <label>Remarks</label>
// //           <textarea
// //             name="remarks"
// //             value={formData.remarks}
// //             onChange={handleFormChange}
// //           />

// //           <label>Photo 1 URL (optional)</label>
// //           <input
// //             type="text"
// //             name="photo1"
// //             value={formData.photo1}
// //             onChange={handleFormChange}
// //           />

// //           <label>Photo 2 URL (optional)</label>
// //           <input
// //             type="text"
// //             name="photo2"
// //             value={formData.photo2}
// //             onChange={handleFormChange}
// //           />

// //           <button type="submit" style={{ marginTop: "20px" }}>
// //             {editMode ? "Update" : "Submit"}
// //           </button>
// //         </form>
// //       ) : (
// //         <div className="device-container">
// //           <h2>Device List</h2>
// //           <table className="device-table">
// //             <thead>
// //               <tr>
// //                 <th>Code Name</th>
// //                 <th>Category</th>
// //                 <th>Manufacturer</th>
// //                 <th>Supplier</th>
// //                 <th>Purchase On</th>
// //                 <th>Price</th>
// //                 <th>Warranty Till</th>
// //                 <th>Is Dead</th>
// //                 <th>Remarks</th>
// //                 <th>Assigned User</th>
// //                 <th>Edit / Info</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {devices.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="11" className="no-devices-cell">
// //                     No devices found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 devices.map((device) => (
// //                   <tr key={device.device_id || device.id}>
// //                     <td>{device.code_name}</td>
// //                     <td>{device.category}</td>
// //                     <td>{device.manufacturer}</td>
// //                     <td>{device.supplier}</td>
// //                     <td>{device.purchase_on?.split("T")[0]}</td>
// //                     <td>{device.price}</td>
// //                     <td>{device.warranty_till?.split("T")[0]}</td>
// //                     <td>{device.is_dead ? "Yes" : "No"}</td>
// //                     <td>{device.remarks}</td>
// //                     <td>{device.user_name}</td>
// //                     <td>
// //                       <button onClick={() => handleView(device)} title="View Device">👁️</button>
// //                       <button onClick={() => handleEdit(device)} title="Edit Device">✏️</button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {viewDevice && (
// //         <div className="modal" style={modalStyles.overlay}>
// //           <div className="modal-content" style={modalStyles.content}>
// //             <h3>Device Details</h3>
// //             <p><strong>Code Name:</strong> {viewDevice.code_name}</p>
// //             <p><strong>Category:</strong> {viewDevice.category}</p>
// //             <p><strong>Manufacturer:</strong> {viewDevice.manufacturer}</p>
// //             <p><strong>Supplier:</strong> {viewDevice.supplier}</p>
// //             <p><strong>Purchase On:</strong> {viewDevice.purchase_on?.split("T")[0]}</p>
// //             <p><strong>Price:</strong> {viewDevice.price}</p>
// //             <p><strong>Warranty Till:</strong> {viewDevice.warranty_till?.split("T")[0]}</p>
// //             <p><strong>Is Dead:</strong> {viewDevice.is_dead ? "Yes" : "No"}</p>
// //             <p><strong>Remarks:</strong> {viewDevice.remarks}</p>
// //             <p><strong>Assigned User:</strong> {viewDevice.user_name}</p>
// //             {viewDevice.photo1 && <img src={viewDevice.photo1} alt="Photo 1" style={{ maxWidth: "200px" }} />}
// //             {viewDevice.photo2 && <img src={viewDevice.photo2} alt="Photo 2" style={{ maxWidth: "200px" }} />}
// //             <button onClick={() => setViewDevice(null)} style={{ marginTop: "10px" }}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // Minimal modal styling
// // const modalStyles = {
// //   overlay: {
// //     position: "fixed",
// //     top: 0, left: 0, right: 0, bottom: 0,
// //     backgroundColor: "rgba(0, 0, 0, 0.5)",
// //     zIndex: 999,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center"
// //   },
// //   content: {
// //     background: "#fff",
// //     padding: "20px",
// //     borderRadius: "8px",
// //     width: "80%",
// //     maxWidth: "600px",
// //     maxHeight: "80vh",
// //     overflowY: "auto"
// //   }
// // };

// // export default DeviceList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DeviceList = () => {
//   const [users, setUsers] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingDeviceId, setEditingDeviceId] = useState(null);

//   const [formData, setFormData] = useState({
//     user_id: "",
//     code_name: "",
//     category: "",
//     manufacturer: "",
//     supplier: "",
//     purchase_on: "",
//     price: "",
//     warranty_months: "",
//     warranty_till: "",
//     is_dead: 0,
//     remarks: "",
//     photo1: "",
//     photo2: "",
//   });

//   const [currentUser, setCurrentUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userObj = JSON.parse(storedUser);
//       setCurrentUser({
//         role: userObj.role,
//         userId: userObj.id || userObj.userId,
//       });
//     }

//     fetchDevices();
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios
//       .get("http://localhost:3001/dashboard/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log("Failed to fetch users", err));
//   };

//   const fetchDevices = () => {
//     axios
//       .get("http://localhost:3001/dashboard/devices")
//       .then((res) => setDevices(res.data))
//       .catch((err) => console.log("Failed to fetch devices", err));
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

//     try {
//       const token = localStorage.getItem("token");
//       const url = editMode
//         ? `http://localhost:3001/devices/${editingDeviceId}`
//         : "http://localhost:3001/addDevice";

//       const method = editMode ? "put" : "post";

//       await axios[method](url, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert(`Device ${editMode ? "updated" : "added"} successfully!`);
//       setShowForm(false);
//       fetchDevices();
//       setFormData({
//         user_id: "",
//         code_name: "",
//         category: "",
//         manufacturer: "",
//         supplier: "",
//         purchase_on: "",
//         price: "",
//         warranty_months: "",
//         warranty_till: "",
//         is_dead: 0,
//         remarks: "",
//         photo1: "",
//         photo2: "",
//       });
//       setEditMode(false);
//       setEditingDeviceId(null);
//     } catch (err) {
//       console.error(err);
//       alert(`Failed to ${editMode ? "update" : "add"} device`);
//     }
//   };

//   const handleEdit = (device) => {
//     setFormData({
//       user_id: device.user_id,
//       code_name: device.code_name,
//       category: device.category,
//       manufacturer: device.manufacturer,
//       supplier: device.supplier || "",
//       purchase_on: device.purchase_on?.split("T")[0],
//       price: device.price,
//       warranty_months: device.warranty_months || "",
//       warranty_till: device.warranty_till?.split("T")[0] || "",
//       is_dead: device.is_dead ? 1 : 0,
//       remarks: device.remarks || "",
//       photo1: device.photo1 || "",
//       photo2: device.photo2 || "",
//     });
//     setEditMode(true);
//     setEditingDeviceId(device.device_id || device.id);
//     setShowForm(true);
//   };

//   const handleView = (device) => {
//     navigate(`/dashboard/devices/${device.device_id || device.id}`);
//   };

//   return (
//     <div>
//       {(currentUser?.role === "admin" || currentUser?.role === "super admin") && (
//         <button
//           id="btn_devices"
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditMode(false);
//             setFormData({
//               user_id: "",
//               code_name: "",
//               category: "",
//               manufacturer: "",
//               supplier: "",
//               purchase_on: "",
//               price: "",
//               warranty_months: "",
//               warranty_till: "",
//               is_dead: 0,
//               remarks: "",
//               photo1: "",
//               photo2: "",
//             });
//           }}
//         >
//           {showForm ? "Close Form" : "Add Device"}
//         </button>
//       )}

//       {showForm &&
//       (currentUser?.role === "admin" || currentUser?.role === "super admin") ? (
//         <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
//           <label htmlFor="user_id">Assigned User</label>
//           <select
//             name="user_id"
//             id="user_id"
//             value={formData.user_id}
//             onChange={handleFormChange}
//             required
//           >
//             <option value="">-- Select a User --</option>
//             {users.map((user) => (
//               <option key={user.id || user.userId} value={user.id || user.userId}>
//                 {user.name}
//               </option>
//             ))}
//           </select>

//           <label>Code Name</label>
//           <input
//             name="code_name"
//             value={formData.code_name}
//             onChange={handleFormChange}
//             required
//           />

//           <label>Category</label>
//           <input
//             name="category"
//             value={formData.category}
//             onChange={handleFormChange}
//             required
//           />

//           <label>Manufacturer</label>
//           <input
//             name="manufacturer"
//             value={formData.manufacturer}
//             onChange={handleFormChange}
//             required
//           />

//           <label>Supplier</label>
//           <input
//             name="supplier"
//             value={formData.supplier}
//             onChange={handleFormChange}
//           />

//           <label>Purchase On</label>
//           <input
//             name="purchase_on"
//             type="date"
//             value={formData.purchase_on}
//             onChange={handleFormChange}
//             required
//           />

//           <label>Price</label>
//           <input
//             name="price"
//             type="number"
//             value={formData.price}
//             onChange={handleFormChange}
//             required
//           />

//           <label>Warranty Months</label>
//           <input
//             name="warranty_months"
//             type="number"
//             value={formData.warranty_months}
//             onChange={handleFormChange}
//           />

//           <label>Warranty Till</label>
//           <input
//             name="warranty_till"
//             type="date"
//             value={formData.warranty_till}
//             onChange={handleFormChange}
//           />

//           <label>Is Dead</label>
//           <select
//             name="is_dead"
//             value={formData.is_dead}
//             onChange={handleFormChange}
//           >
//             <option value={0}>No</option>
//             <option value={1}>Yes</option>
//           </select>

//           <label>Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleFormChange}
//           />

//           <label>Photo 1 URL (optional)</label>
//           <input
//             type="text"
//             name="photo1"
//             value={formData.photo1}
//             onChange={handleFormChange}
//           />

//           <label>Photo 2 URL (optional)</label>
//           <input
//             type="text"
//             name="photo2"
//             value={formData.photo2}
//             onChange={handleFormChange}
//           />

//           <button type="submit" style={{ marginTop: "20px" }}>
//             {editMode ? "Update" : "Submit"}
//           </button>
//         </form>
//       ) : (
//         <div className="device-container">
//           <h2>Device List</h2>
//           <table className="device-table">
//             <thead>
//               <tr>
//                 <th>Code Name</th>
//                 <th>Category</th>
//                 <th>Manufacturer</th>
//                 <th>Supplier</th>
//                 <th>Purchase On</th>
//                 <th>Price</th>
//                 <th>Warranty Till</th>
//                 <th>Is Dead</th>
//                 <th>Remarks</th>
//                 <th>Assigned User</th>
//                 <th>Edit / Info</th>
//               </tr>
//             </thead>
//             <tbody>
//               {devices.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="no-devices-cell">
//                     No devices found
//                   </td>
//                 </tr>
//               ) : (
//                 devices.map((device) => (
//                   <tr key={device.device_id || device.id}>
//                     <td>{device.code_name}</td>
//                     <td>{device.category}</td>
//                     <td>{device.manufacturer}</td>
//                     <td>{device.supplier}</td>
//                     <td>{device.purchase_on?.split("T")[0]}</td>
//                     <td>{device.price}</td>
//                     <td>{device.warranty_till?.split("T")[0]}</td>
//                     <td>{device.is_dead ? "Yes" : "No"}</td>
//                     <td>{device.remarks}</td>
//                     <td>{device.user_name}</td>
//                   <td>
//   {(currentUser?.role === "admin" || currentUser?.role === "super admin") && (
//     <>
//       <button
//         onClick={() => handleView(device)}
//         title="View Device"
//       >
//         👁️
//       </button>
//       <button
//         onClick={() => handleEdit(device)}
//         title="Edit Device"
//       >
//         ✏️
//       </button>
//     </>
//   )}
// </td>

//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeviceList;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
 const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    code_name: "",
    category: "",
    manufacturer: "",
    supplier: "",
    purchase_on: "",
    price: "",
    warranty_months: "",
    warranty_till: "",
    is_dead: 0,
    remarks: "",
    photo1: "",
    photo2: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setCurrentUser({
        role: userObj.role,
        userId: userObj.id || userObj.userId,
      });
    }

    fetchDevices();
  }, []);

  const fetchDevices = () => {
    axios
      .get("http://localhost:3001/dashboard/devices")
      .then((res) => {setDevices(res.data)
     const uniqueCategories = Array.from(
          new Set(res.data.map((d) => d.category).filter(Boolean))
        );
        setCategories(uniqueCategories)})
      .catch((err) => console.log("Failed to fetch devices", err));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
g
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const url = editMode
        ? `http://localhost:3001/devices/${editingDeviceId}`
        : "http://localhost:3001/addDevice";
      const method = editMode ? "put" : "post";

      const dataToSend = {
        ...formData,
        user_id: currentUser?.userId || 1, // assign to admin automatically
      };

      await axios[method](url, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
 if (!categories.includes(formData.category)) {
        setCategories((prev) => [...prev, formData.category]);
      }
      alert(`Device ${editMode ? "updated" : "added"} successfully!`);
      setShowForm(false);
      fetchDevices();
      resetForm();
      setEditMode(false);
      setEditingDeviceId(null);
    } catch (err) {
      console.error(err);
      alert(`Failed to ${editMode ? "update" : "add"} device`);
    }
  };

  const resetForm = () => {
    setFormData({
      code_name: "",
      category: "",
      manufacturer: "",
      supplier: "",
      purchase_on: "",
      price: "",
      warranty_months: "",
      warranty_till: "",
      is_dead: 0,
      remarks: "",
      photo1: "",
      photo2: "",
    });
  };

  const handleEdit = (device) => {
    setFormData({
      code_name: device.code_name,
      category: device.category,
      manufacturer: device.manufacturer,
      supplier: device.supplier || "",
      purchase_on: device.purchase_on?.split("T")[0],
      price: device.price,
      warranty_months: device.warranty_months || "",
      warranty_till: device.warranty_till?.split("T")[0] || "",
      is_dead: device.is_dead ? 1 : 0,
      remarks: device.remarks || "",
      photo1: device.photo1 || "",
      photo2: device.photo2 || "",
    });
    setEditMode(true);
    setEditingDeviceId(device.device_id || device.id);
    setShowForm(true);
  };

  const handleView = (device) => {
    navigate(`/dashboard/devices/${device.device_id || device.id}`);
  };

  return (
    <div>
      {(currentUser?.role === "admin" || currentUser?.role === "super admin") && (
        <button
          id="btn_devices"
          onClick={() => {
            setShowForm(!showForm);
            setEditMode(false);
            resetForm();
          }}
        >
          {showForm ? "Close Form" : "Add Device"}
        </button>
      )}

      {showForm &&
      (currentUser?.role === "admin" || currentUser?.role === "super admin") ? (
        <form onSubmit={handleFormSubmit} style={{ marginTop: "20px" }}>
          <label>Code Name</label>
          <input
            name="code_name"
            value={formData.code_name}
            onChange={handleFormChange}
            required
          />

          <label>Category</label>
          <input
            name="category"
             list="category-list"  
            value={formData.category}
            onChange={handleFormChange}
            required
          />
             <datalist id="category-list">
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>

          <label>Manufacturer</label>
          <input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleFormChange}
            required
          />

          <label>Supplier</label>
          <input
            name="supplier"
            value={formData.supplier}
            onChange={handleFormChange}
          />

          <label>Purchase On</label>
          <input
            name="purchase_on"
            type="date"
            value={formData.purchase_on}
            onChange={handleFormChange}
            required
          />

          <label>Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
          />

          <label>Warranty Months</label>
          <input
            name="warranty_months"
            type="number"
            value={formData.warranty_months}
            onChange={handleFormChange}
          />

          <label>Warranty Till</label>
          <input
            name="warranty_till"
            type="date"
            value={formData.warranty_till}
            onChange={handleFormChange}
          />

          <label>Is Dead</label>
          <select
            name="is_dead"
            value={formData.is_dead}
            onChange={handleFormChange}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>

          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleFormChange}
          />

          <label>Photo 1 URL (optional)</label>
          <input
            type="text"
            name="photo1"
            value={formData.photo1}
            onChange={handleFormChange}
          />

          <label>Photo 2 URL (optional)</label>
          <input
            type="text"
            name="photo2"
            value={formData.photo2}
            onChange={handleFormChange}
          />

          <button type="submit" style={{ marginTop: "20px" }}>
            {editMode ? "Update" : "Submit"}
          </button>
        </form>
      ) : (
        <div className="device-container">
          <h2>Device List</h2>
          <table className="device-table">
            <thead>
              <tr>
                <th>Code Name</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Supplier</th>
                <th>Purchase On</th>
                <th>Price</th>
                <th>Warranty Till</th>
                <th>Is Dead</th>
                <th>Remarks</th>
                <th>Assigned User</th>
                <th>Edit / Info</th>
              </tr>
            </thead>
            <tbody>
              {devices.length === 0 ? (
                <tr>
                  <td colSpan="11" className="no-devices-cell">
                    No devices found
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <tr key={device.device_id || device.id}>
                    <td>{device.code_name}</td>
                    <td>{device.category}</td>
                    <td>{device.manufacturer}</td>
                    <td>{device.supplier}</td>
                    <td>{device.purchase_on?.split("T")[0]}</td>
                    <td>{device.price}</td>
                    <td>{device.warranty_till?.split("T")[0]}</td>
                    <td>{device.is_dead ? "Yes" : "No"}</td>
                    <td>{device.remarks}</td>
                    <td>{device.user_name || "Admin"}</td>
                    <td>
                      {(currentUser?.role === "admin" ||
                        currentUser?.role === "super admin") && (
                        <>
                          <button
                            onClick={() => handleView(device)}
                            title="View Device"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleEdit(device)}
                            title="Edit Device"
                          >
                            ✏️
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeviceList;
