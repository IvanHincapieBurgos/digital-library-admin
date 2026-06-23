import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Libros from './pages/Libros';
import Prestamos from './pages/Prestamos';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/libros"
          element={
            <PrivateRoute>
              <Libros />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestamos"
          element={
            <PrivateRoute>
              <Prestamos />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
