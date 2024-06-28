import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match!");
    } else {
      const newUser = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        // Send registration request
        await axios.post("http://localhost:8800/api/auth/register", newUser);
        
        // Navigate to login page on success
        navigate('/login');
      } catch (err) {
        console.log(err);
        // Handle error if registration fails (e.g., display an error message)
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vougesocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Vougesocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              ref={password}
              type="password"
              maxLength={6} // Adjust as needed
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              ref={passwordAgain}
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to={'/login'} style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}>
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
