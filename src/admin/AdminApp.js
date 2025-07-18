import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminApp = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <AdminProtectedRoute>
              <ProductList />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/products/add" 
          element={
            <AdminProtectedRoute>
              <ProductForm />
            </AdminProtectedRoute>
          } 
        />
        <Route 
          path="/products/:id/edit" 
          element={
            <AdminProtectedRoute>
              <ProductForm />
            </AdminProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AdminProvider>
  );
};

export default AdminApp;
