import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">VougeSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on VougeSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
              autoComplete="email"
            />
            <input
              placeholder="Password"
              type="password"
              minLength={6}
              className="loginInput"
              ref={password}
              required
              autoComplete="current-password"
            />
            <button
              className="loginButton"
              type="submit"
              disabled={isFetching}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}>
              <Box sx={{ display: "flex" }}>
                {isFetching ? <CircularProgress color="success" /> : "Log In"}
              </Box>
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              to={"/register"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}>
              <button className="loginRegisterButton">
                <Box sx={{ display: "flex" }}>
                  {isFetching ? (
                    <CircularProgress color="success" />
                  ) : (
                    "Create a New Account"
                  )}
                </Box>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
