import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route,BrowserRouter, Link,Outlet  } from 'react-router-dom';

import './App.css'

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Home from './components/Home';
import DeviceList from './components/DeviceList';
import Users from './components/Users';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import DeviceDetails from './components/DeviceDetails';
import ViewUser from './components/ViewUser';
import AssignUserPage from "./components/AssignUserPage";
function App() {
 

  return (
    <>
    
     <div>
  

      <div className="app">

       
  

<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={ <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>}>
     <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
    <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="devices" element={<ProtectedRoute><DeviceList /></ProtectedRoute>} />
     <Route path="devices/:id" element={<DeviceDetails />} />
            <Route path="devices/assign-user/:id" element={<AssignUserPage />} />

    <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
    <Route path="profile" element={ <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>}/>
   
    <Route path="users/:id" element={<ViewUser />} />

  </Route>
 
</Routes>

    
      </div>
    </div>
  
   
     
    </>
  )
}

export default App
