import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userTodos = users[loggedInUser]?.todos || [];
    const selectedTodo = userTodos.find(todo => todo.id.toString() === id);
    if (selectedTodo) {
      setTodo(selectedTodo);
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setCategory(selectedTodo.category);
      setDeadline(selectedTodo.deadline);
      setStatus(selectedTodo.status);
    }
  }, [id]);
  const handleUpdate = () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedTodos = users[loggedInUser].todos.map(todo =>
      todo.id.toString() === id
        ? { ...todo, title, description, category, deadline, status }
        : todo
    );
    users[loggedInUser].todos = updatedTodos;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Ärendet har uppdaterats!');
    navigate('/todos');
  };
  const handleComplete = () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedTodos = users[loggedInUser].todos.map(todo =>
      todo.id.toString() === id ? { ...todo, status: 'Slutförd' } : todo
    );
    users[loggedInUser].todos = updatedTodos;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Ärendet har markerats som slutfört.');
    navigate('/todos');
  };
  const handleDelete = () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedTodos = users[loggedInUser].todos.filter(todo => todo.id.toString() !== id);
    users[loggedInUser].todos = updatedTodos;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Ärendet har tagits bort.');
    navigate('/todos');
  };
  if (!todo) return <p>Laddar...</p>;
  return (
    <div className="container">
      <h1>Redigera ärende</h1>
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Hälsa">Hälsa</option>
        <option value="Jobb">Jobb</option>
        <option value="Nöje">Nöje</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Ej utförd">Ej utförd</option>
        <option value="Slutförd">Slutförd</option>
      </select>
      <div className="actions">
        <button onClick={handleUpdate}>Spara ändringar</button>
        <button onClick={handleComplete}>Markera som slutförd</button>
        <button className="delete" onClick={handleDelete}>
          Ta bort ärendet
        </button>
      </div>
    </div>
  );
};
export default TodoDetails;

