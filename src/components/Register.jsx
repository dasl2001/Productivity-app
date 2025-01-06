import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      alert('Användarnamnet finns redan!');
    } else {
      users[username] = { password, todos: [], habits: [], events: [] };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registrering lyckades! Du omdirigeras till inloggningssidan.');
      navigate('/');  
    }
  };
  return (
    <div className="container">
      <h1>Registrera</h1>
      <input 
        type="text" 
        placeholder="Användarnamn" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Lösenord" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Registrera</button>
    </div>
  );
};
export default Register;


