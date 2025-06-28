import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col } from 'react-bootstrap'; // Import Col

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) { // Added 'e' parameter
    e.preventDefault(); // Prevent default anchor tag behavior if button is inside <a>
    setIsLoading(true);
    axios.post("https://ecom-server-u4xj.onrender.com/ecommerce/login", { email, password })
      .then(() => {
      //  alert("Login successful!"); // More user-friendly message
        setEmail('');
        setPassword('');
        navigate('/home');
      })
      .catch((err) => {
        // Provide more specific error feedback
        if (err.response && err.response.data && err.response.data.message) {
          alert(`Login failed: ${err.response.data.message}`);
        } else if (err.message) {
          alert(`Login failed: ${err.message}`);
        } else {
          alert("Login failed. Please try again.");
        }
        console.error("Login error:", err); // Log error for debugging
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <StyledWrapper>
      <div className="login-main"> {/* This div already centers its content */}
        <Col xs={11} sm={10} md={8} lg={6} xl={5} xxl={4}> {/* Bootstrap Col for responsive width */}
          <div className="login-box"> {/* Styles from StyledWrapper, but width/positioning adjusted */}
            <p>Login</p>
            <form onSubmit={handleSubmit}> {/* Added onSubmit to form for better practice */}
              <div className="user-box">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Password</label>
              </div>
              <button type="submit" className="login-button-styled" disabled={isLoading}>
                {/* Spans for animation */}
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                {/* Span for button text */}
                <span className="button-text-content">
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </span>
              </button>
            </form>
            <p>Don't have an account? <Link to="/" className="a2">Sign up</Link></p> {/* Fixed route to match App.js routing */}
          </div>
        </Col>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .login-main {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #1B1B3A;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
  }

  .login-box {
    /* position: absolute; */ /* REMOVED for Bootstrap Col handling */
    /* top: 50%; */ /* REMOVED */
    /* left: 50%; */ /* REMOVED */
    width: 100%; /* CHANGED - takes width of parent Col */
    padding: 40px;
    /* margin: 20px auto; */ /* REMOVED or set to margin: 0; as Col and login-main handle centering */
    margin: 0;
    /* transform: translate(-50%, -55%); */ /* REMOVED */
    background-color: #F4F4F9;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }

  .login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #1B1B3A;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #1B1B3A;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #1B1B3A;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #1B1B3A;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #1B1B3A;
    font-size: 12px;
  }

  .login-button-styled {
    display: block; 
    width: 100%; 
    margin-top: 40px; /* Adjusted to match original a tag margin */
    color:rgb(255, 255, 255);
    padding: 0.5em 1.5em; /* This padding is for the content inside the button */
    font-size: 18px;
    font-weight: bold; 
    text-transform: uppercase; 
    letter-spacing: 3px; 
    border-radius: 0.5em;
    background:rgb(39, 68, 149) ;
    cursor: pointer;
    border: 1px solid rgb(39, 68, 149); 
    transition: all 0.3s;
    box-shadow: 6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.7); 
    text-decoration: none; 
    text-align: center;
    position: relative; /* Needed for positioning animation spans */
    overflow: hidden;   /* Needed to contain the animation spans */
  }

  .login-button-styled .button-text-content {
    position: relative;
    z-index: 1; /* Ensure text is above animation spans */
  }

  .login-button-styled:hover {
    background: white;
    color: black; 
    border-color: white;
  }

  .login-button-styled:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Animated border spans */
  .login-button-styled .animation-span {
    position: absolute;
    display: block;
    z-index: 0; /* Below button text */
  }

  .login-button-styled .animation-span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1B1B3A); /* Original animation color */
    animation: btn-anim1 1.5s linear infinite;
  }

  .login-button-styled .animation-span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #1B1B3A);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s;
  }

  .login-button-styled .animation-span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #1B1B3A);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s;
  }

  .login-button-styled .animation-span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #1B1B3A);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
  }

  /* Keyframes for button animation */
  @keyframes btn-anim1 {
    0% { left: -100%; }
    50%,100% { left: 100%; }
  }
  @keyframes btn-anim2 {
    0% { top: -100%; }
    50%,100% { top: 100%; }
  }
  @keyframes btn-anim3 {
    0% { right: -100%; }
    50%,100% { right: 100%; }
  }
  @keyframes btn-anim4 {
    0% { bottom: -100%; }
    50%,100% { bottom: 100%; }
  }
  
  .login-box p:last-child {
    margin-top: 20px;
    color: gray;
    font-size: 14px;
  }

  .login-box a.a2 {
    color: #1B1B3A;
    text-decoration: none;
  }

  .login-box a.a2:hover {
    background: transparent;
    color: #1B1B3A;
    border-radius: 5px;
  }
    
  /* The global button style might conflict or be redundant now, 
     preferring .login-button-styled or direct button styling within .login-box */
  /* button { ... } */
  /* button:hover { ... } */

`;




export default Login;
