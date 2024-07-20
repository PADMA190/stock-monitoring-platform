import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  var isNotValid = false;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login/', formData);
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error.response.data);
      isNotValid = true;
    }
  };



  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {isNotValid && <span>Invalid Details</span> }
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginForm;
