import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from '@mui/material/Modal';
import AddProduct from '../components/AddProduct';
import { useCart } from '../context/CartContext';
// import CartItems from "../components/CartItems";
import OrderHistory from '../components/OrderHistory';
import UpdatePassword from '../components/UpdatePassword';
import UpdateEmail from '../components/UpdateEmail';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const { userData = {}, allOrders = [] } = location.state || {};
  console.log('location.state', location.state);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    setToken,
    setLoginStatus,
    loginStatus,
    token,
    isAdmin,
    setUserData,
    setAmount,
  } = useAuth();

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

  async function handleRegister(e: any) {
    e.preventDefault();
    if (
      username &&
      email &&
      password &&
      isEmailValid(email) &&
      isPasswordValid(password)
    ) {
      if(password == confirmPassword) {
        try {
          const response = await axios.post(
            'http://localhost:5000/auth/register',
            {
              username,
              email,
              password,
              role: isAdmin ? 'admin' : 'user',
              isAdmin,
            }
          );
          // console.log('amount', response.data.response.amount);
          setToken(response.data.token);
          setLoginStatus(true);
          setAmount(response.data.response.amount);
          localStorage.setItem('amount', response.data.response.amount);
          localStorage.setItem('loginStatus', 'true');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.response._id);
          navigate('/');
          toast.success('User created Successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
        } catch (error:any) {
          toast.error(error.response.data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
        }
      } else {
        toast.warn('Password and confirm password does not match', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    } else {
      toast.warn('please enter all the fields in a valid format', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        {
          email,
          password,
          isAdmin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUserData(response.data);
      setToken(response.data.token);
      setLoginStatus(true);
      localStorage.setItem('loginStatus', 'true');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('amount', response.data.user.amount);
      localStorage.setItem('id', response.data.user._id);
      navigate('/');
      toast.success('Loggedin Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    } catch (error: any) {
      toast.error(error.response.data, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  }

  function handleLogout(e:any) {
    e.preventDefault();
    toast.success('Loggedout Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
  
    // Perform the logout operations after a short delay to ensure the toast is shown
    // setTimeout(() => {
      setLoginStatus(false);
      localStorage.setItem('loginStatus', 'false');
      localStorage.setItem('amount', 'null');
      localStorage.setItem('id', 'null');
      navigate('/');
    // }, 1000); // 1-second delay
  }

  // console.log('orderHistory', orderHistory);

  return (
    <>
      {!loginStatus && auth !== 'all-products' ? (
        <div className='auth-container'>
          {auth == 'register' && (
            <div className='container'>
              <h1>Signup</h1>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type='button' onClick={(e) => handleRegister(e)}>
                Signup
              </button>
              <p>
                Already an {isAdmin ? 'admin' : 'user'}?{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  <a>Login</a>
                </button>
              </p>
            </div>
          )}
          {auth == 'login' && (
            <div className='container'>
              <h1>Login</h1>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='button' onClick={(e) => handleLogin(e)}>
                Login
              </button>
              <p>
                New {isAdmin ? 'admin' : 'user'}?{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                >
                  <a>Register</a>
                </button>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className='user-profile'>
          <div className='user-data'>
            <h1>User profile </h1>
            <a href='/login' onClick={(e) => handleLogout(e)}>
              Logout
            </a>
          </div>
          <div className='user-data2'>
            <p>
              <span>Username :</span> {userData?.username}
            </p>
            <p>
              <span>Email :</span> {userData?.email}
            </p>
            <p>
              <span>Amount :</span> {userData?.amount}
            </p>

            <UpdatePassword />
            <UpdateEmail />
          </div>

          <div className='my-orders'>
            <h3>{!isAdmin ? 'Order History' : 'Add Product'}</h3>
            <div className='all-orders'>
              {allOrders?.map((order: any) => {
                return <OrderHistory cartDetails={order} profile={true} />;
              })}
            </div>
          </div>

          {isAdmin && (
            <>
              <button className='upload-product-button' onClick={handleOpen}>
                Upload Product
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <AddProduct />
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
