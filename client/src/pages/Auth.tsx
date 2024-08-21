import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Modal from '@mui/material/Modal';
import AddProduct from "../components/AddProduct";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setToken, setLoginStatus, loginStatus, token, userData, isAdmin, setUserData } = useAuth();

  const navigate = useNavigate();
  const { auth } = useParams();

  function isEmailValid(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isPasswordValid(password: string) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= minLength;

    return (
      isLongEnough &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  }

  async function handleRegister(e:any) {
    e.preventDefault();
    if (
      username &&
      email &&
      password &&
      isEmailValid(email) &&
      isPasswordValid(password)
    ) {
      try {
        const response = await axios.post("/auth/register", {
          username,
          email,
          password,
          role : isAdmin ? "admin" : "user",
          isAdmin 
        });
        // console.log(response.data);
        setToken(response.data.token);
        setLoginStatus(true);
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.log("Registration Failed", error);
      }
    } else {
      console.log("please enter all the fields in a valid format");
    }
  }

  async function handleLogin(e:any) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        {
          email,
          password,
          isAdmin
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setUserData(response.data);
      setToken(response.data.token);
      setLoginStatus(true);
      localStorage.setItem("loginStatus", "true");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error);

    }
  }

  function handleLogout() {
    setLoginStatus(false);
    localStorage.setItem("loginStatus", "false");
  }

  // useEffect(() => {
  //   console.log("loginstatus", loginStatus);
  //   console.log("token", token);
  //   console.log(auth);
  // }, [token, loginStatus]);

  // console.log('isAdmin', isAdmin);
  

  return (
    <>
      {(!loginStatus && auth!=='all-products') ? (
        <div className="auth-container">
          {auth == "register" && (
            <div className="container">
              <h1>Signup</h1>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={(e) => handleRegister(e)}>
                Signup
              </button>
              <p>
                Already an {isAdmin ? 'admin' : 'user'}? <button onClick={(e) => {
                  e.preventDefault();
                  navigate('/login')
                }}><a>Login</a></button>
              </p>
            </div>
          )}
          {auth == "login" && (
            <div className="container">
              <h1>Login</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={(e) => handleLogin(e)}>
                Login
              </button>
              <p>
                New {isAdmin ? 'admin' : 'user'}? <button onClick={(e) => {
                  e.preventDefault();
                  navigate('/register')
                }}><a>Register</a></button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <h1>
            User data{" "}
            <a href="/login" onClick={handleLogout}>
              logout
            </a>
          </h1>
          <p>Username : {userData.username}</p>
          <p>Email : {userData.email}</p>

          {isAdmin && (
            <>
            <button onClick={handleOpen}>Upload Product</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddProduct />
      </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Auth;
