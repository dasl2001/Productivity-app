import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => { 
  const navigate = useNavigate();
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <h1>ProduktivitetsApp</h1>
      <div>
        {loggedInUser ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/todos">Att Göra</Link>
            <Link to="/habits">Vanor</Link>
            <Link to="/events">Händelser</Link>
            <button onClick={handleLogout}>Logga ut</button>
          </>
        ) : (
          <>
            <Link to="/">Logga in</Link>
            <Link to="/register">Registrera</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
