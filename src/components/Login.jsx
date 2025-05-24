import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { authenticateUser } from '../utils/auth';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    if (authenticateUser(username, password)) {
      sessionStorage.setItem('loggedInUser', username);
      navigate('/dashboard');
    } else {
      alert('Felaktiga inloggningsuppgifter');
    }
  };
  return (
    <div className="container">
      <h1>Logga in</h1>
      <input type="text" placeholder="Användarnamn" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Logga in</button>
    </div>
  );
};
export default Login;

