import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hälsa');
  const [deadline, setDeadline] = useState('');
  const [filterStatus, setFilterStatus] = useState('Alla');
  const [sortOption, setSortOption] = useState('deadline-asc');
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[loggedInUser]) {
      setTodos(users[loggedInUser].todos || []);
    }
  }, []);
  const handleAddTodo = () => {
    if (!title || !deadline) {
      alert('Titel och deadline krävs!');
      return;
    }
    const newTodo = {
      id: Date.now(),
      title,
      description,
      category,
      deadline,
      status: 'Ej utförd',
    };
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    users[loggedInUser].todos.push(newTodo);
    localStorage.setItem('users', JSON.stringify(users));
    setTodos(users[loggedInUser].todos);
    setTitle('');
    setDescription('');
    setDeadline('');
  };
  const handleFilter = () => {
    let filteredTodos = [...todos];
    if (filterStatus !== 'Alla') {
      filteredTodos = filteredTodos.filter(todo =>
        filterStatus === 'Slutförd' ? todo.status === 'Slutförd' : todo.status !== 'Slutförd'
      );
    }
    filteredTodos.sort((a, b) => {
      switch (sortOption) {
        case 'deadline-asc':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'deadline-desc':
          return new Date(b.deadline) - new Date(a.deadline);
        default:
          return 0;
      }
    });
    return filteredTodos;
  };
  return (
    <div className="container">
      <h1>Alla Ärenden</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="Hälsa">Hälsa</option>
          <option value="Jobb">Jobb</option>
          <option value="Nöje">Nöje</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={handleAddTodo}>Lägg till</button>
      </div>
      <div className="filters">
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="Alla">Alla</option>
          <option value="Slutförd">Slutförd</option>
          <option value="Ej utförd">Ej utförd</option>
        </select>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="deadline-asc">Deadline (stigande)</option>
          <option value="deadline-desc">Deadline (fallande)</option>
        </select>
      </div>
      <ul>
        {handleFilter().map(todo => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>  
            <p>Deadline: {todo.deadline}</p>
            <p>Status: {todo.status}</p>
            <Link to={`/todos/${todo.id}`} className="edit-link">Redigera</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;







