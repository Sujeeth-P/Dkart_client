import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  function handleSubmit() {
    axios.post("https://ecom-server-u4xj.onrender.com/ecommerce/login", { email, password })
      .then(() => {
        alert("Data posted successfully")
        setEmail('')
        setPassword('')
        navigate('/home')
      })
      .catch((err) => {
        alert(err)
      })
  }
  return (
    <StyledWrapper>
      <div className="login-main">
        <div className="login-box">
          <p>Login</p>
          <form>
            <div className="user-box">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
          </form>
          <a href="#">
            <span />
            <span />
            <span />
            <span />
            <button onClick={handleSubmit}>Login</button>
          </a>
          <p>Don't have an account? <Link as={Link} to="/signup" className="a2">Sigup</Link></p>
        </div>
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
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
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

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px;
    cursor: pointer;
  }

  .login-box a:hover {
    background: white;
    color: #fff;
    border-radius: 7px;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1B1B3A);
    animation: btn-anim1 1.5s linear infinite;
  }

  @keyframes btn-anim1 {
    0% { left: -100%; }
    50%,100% { left: 100%; }
  }

  .login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #1B1B3A);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s;
  }

  @keyframes btn-anim2 {
    0% { top: -100%; }
    50%,100% { top: 100%; }
  }

  .login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #1B1B3A);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s;
  }

  @keyframes btn-anim3 {
    0% { right: -100%; }
    50%,100% { right: 100%; }
  }

  .login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #1B1B3A);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
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
    
  button {
  color:rgb(255, 255, 255);
  padding: 0.5em 1.5em;
  font-size: 18px;
  border-radius: 0.5em;
  background:rgb(39, 68, 149) ;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12pxrgb(197, 197, 197), -6px -6px 12px #ffffff;
}

button:hover {
  color: black;
  letter-spacing: 3px;
  padding: 0.5em 1.7em;
  background: #fff;
 }

`;




export default Login;
