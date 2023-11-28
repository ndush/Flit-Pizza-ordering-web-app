// components/Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';


const dashboard = () => {
  const { user } = useAuth(); // Replace with your authentication hook or context
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // Redirect to the login page or any other desired page
    router.push('/login');
  };
  return (
    <div>
      <h1>Welcome to the Dashboard, {user && user.email}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default dashboard;
