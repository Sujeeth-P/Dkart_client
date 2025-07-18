import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Nave from './Components/Nave';
import Home from './pages/Home';
import Product from './pages/Product.js';
import Cart from './pages/Cart';
import Footer from './Components/Footer';
import AdminApp from './admin/AdminApp';
import './App.css';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* Main App Routes */}
        <Route 
          path="/*" 
          element={
            <CartProvider>
              <div className="app-container">
                <Nave />
                <main className="main-content">
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<h1 className="container mt-5">Page Not Found</h1>} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;