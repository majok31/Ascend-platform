import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Clear the stored token
    alert('Logged out successfully');
    navigate('/login');
  }, [navigate]);

  return <h2>Logging out...</h2>;
}

export default Logout;
