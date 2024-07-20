import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [formData, setFormData] = useState({
    symbol_name: ''
  });
  const [watchList, setwatchList] = useState([]);
  var isAdded = false;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('user/addSymbol/', formData);
      console.log(response.data);
      isAdded = true;
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleLogout = async () => {
    axios.get('user/logout/').then((res) => {
      navigate('/login');
    })
  }

  useEffect(() => {
    axios.get('user/getWatchList/').then((response) => {
      console.log(response.data['watch_list']);
      setwatchList(response.data['watch_list']);

    });
  }, []);


  return (
    <>
      <div className="main-container">
        <div className='add-container'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="symbol_name" value={formData.symbol_name} onChange={handleChange} placeholder=" Add Symbol Name" required />
            <button type="submit">Add Symbol</button>
          </form>
          {isAdded && <span>Symbol added successfully. Refresh the window to see the latest stock details.</span>}
        </div>
        <span></span>
        <div className='add-container'>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <br /><br />

      {watchList.map((item) => <Card symbol={item} />)}



    </>

  );
};

export default HomePage
