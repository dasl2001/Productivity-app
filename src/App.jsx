import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TodoList from './components/TodoList';
import Habits from './components/Habits';
import Events from './components/Events';
import TodoDetails from './components/TodoDetails';
import Navbar from './components/Navbar';
import './styles.css';
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/:id" element={<TodoDetails />} />  
          <Route path="/habits" element={<Habits />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App; 




