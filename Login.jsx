import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';
import './App.css';
import './Login.css';
import { 
  signinAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth
} from './utils/firebase';


const Login = (props) => {
  const [contact, setContact] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signinAuthUserWithEmailAndPassword(email, password);
      // Handle successful login (e.g., redirect)
    } catch (error) {
      console.error("Error logging in with email and password", error);
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocFromAuth(user);
  };

  return (
    <div className="main-content">
      <div className="header-divv" style={{ width: '400px' }}>
        <label>Email</label>
        <Input
          name='email'
          type='text'
          placeholder='email'
          onChange={handleChange}
          value={email}
        />

        <br />
        <label>Password</label>
        <Input
          name='password'
          type='password'
          placeholder='password'
          onChange={handleChange}
          value={password}
        />

        <br />
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleEmailLogin}>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <br />
        <button onClick={logGoogleUser}>
          Login with Google
        </button>
        <br />
        <br />
        <div className='signup-link'>
          <Link to='/signup'>
            Sign up instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
