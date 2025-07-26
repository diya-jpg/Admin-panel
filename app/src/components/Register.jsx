

// const Register = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // default to 'user'

//   const validatePhone = (phone) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone);
//   };
// const isValidEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!validatePhone(phone)) {
//       alert("Please enter a valid 10-digit phone number");
//       return;
//     }
// if(!validateEmail(email)){
//   alert("Please enter a correct email");
//   return;
// }
//     const data = { name, email, phone, password, role };

//     axios.post('http://localhost:3001/register', data)
//       .then(res => {
//         alert(res.data.message);

//         if (res.data.token) {
//           localStorage.setItem('token', res.data.token);
//         }

//         navigate('/login');
//       })
//       .catch(err => {
//         console.error("Registration error:", err);
//         alert("Error registering user");
//       });
//   };

//   return (
//     <div className="register-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Register</h2>

//         <label>Name</label>
//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           required
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />

//         <label>Phone</label>
//         <input
//           type="text"
//           placeholder="Enter 10-digit Phone"
//           value={phone}
//           onChange={e => setPhone(e.target.value)}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <label>Role</label>
//         <select value={role} onChange={e => setRole(e.target.value)} required>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//           <option value="super admin">Super Admin</option>
//         </select>

//         <button type="submit">Register</button>
//         <h5><Link to="/login">Back to login</Link></h5>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', // default to 'user'
  });

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Please enter a correct email');
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    };

    axios
      .post('http://localhost:3001/register', data)
      .then((res) => {
        alert(res.data.message);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration error:', err);
        alert('Error registering user');
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          name="phone"
          type="text"
          placeholder="Enter 10-digit Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="super admin">Super Admin</option>
        </select>

        <button type="submit">Register</button>
        <h5>
          <a href="/login">Back to login</a>
        </h5>
      </form>
    </div>
  );
};

export default Register;
