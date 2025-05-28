import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Nave from './Components/Nave';
import Home from './pages/Home';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Footer from './Components/Footer';
import './App.css';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Nave />
          <main className="main-content">
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<h1 className="container mt-5">Page Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;