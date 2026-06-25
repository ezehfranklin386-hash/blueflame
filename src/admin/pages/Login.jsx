import React, { useState } from 'react';

const ADMIN_PASSWORD = 'blueflame2024';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Invalid password');
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
            <input type="password" id="password" placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} autoFocus required />
          </div>
          <button type="submit" className="login-btn">Login</button>
          {error && <div className="error-msg">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
