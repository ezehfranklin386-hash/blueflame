import React, { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'blueflame2024';

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('adminPassword');
    const validPassword = stored || ADMIN_PASSWORD;

    if (password === validPassword) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      setError('');
      onLogin();
    } else {
      setError('Incorrect password. Try again!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <p>Blue Flame Gas Supply Dashboard</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
