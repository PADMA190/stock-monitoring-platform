import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
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
      const response = await axios.post('/user/register/', formData);
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error(error.response.data);
      isNotValid = true;
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      {isNotValid && <span>Registration failed</span>}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterForm;
