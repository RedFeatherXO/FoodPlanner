import React, { useState } from 'react';

const CORRECT_PASSWORD = process.env.REACT_APP_SITE_PASSWORD; // Change this to your desired password

export default function PasswordProtect({ children }) {
  const [input, setInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  if (authenticated) return children;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Enter Password to Access the Site</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Password"
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>Enter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
