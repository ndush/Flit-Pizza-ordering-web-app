// components/Login.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const Login = () => {
  const { login, checkUserRole } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password');
        return;
      }

      await login(email, password);
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid credentials');
    }
  };

  // Redirect based on user role outside handleLogin
  useEffect(() => {
    const userRole = checkUserRole();

    if (userRole === 'admin') {
      router.push('/dashboard');
    } else if (userRole === 'user') {
      router.push('/products');
    }
  }, [checkUserRole, router]);

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
