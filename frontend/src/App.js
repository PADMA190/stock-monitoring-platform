import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TotalData from './components/TotalData';


axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);


  useEffect(() => {
    axios.get('user/isLoggedIn/').then((response) => {
      setisLoggedIn(response.data['authenticated']);
    });
  }, [])



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={isLoggedIn ? <HomePage /> : <LoginForm />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="home/total" element={<TotalData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;