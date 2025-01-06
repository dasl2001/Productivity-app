import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [habits, setHabits] = useState([]);
  const [events, setEvents] = useState([]);
  const [quote, setQuote] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    setUsername(loggedInUser);
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[loggedInUser] || { todos: [], habits: [], events: [] };
    const sortedTodos = userData.todos
      .filter(todo => todo.status !== 'Slutförd')
      .slice(-3)
      .reverse();
    const sortedHabits = userData.habits
      .sort((a, b) => b.repetitions - a.repetitions)
      .slice(0, 3);
    const sortedEvents = userData.events
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 3);
    setTodos(sortedTodos);
    setHabits(sortedHabits);
    setEvents(sortedEvents);
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote('Välkommen tillbaka!'));
  }, []);
  return (
    <div className="container">
      <h1>Välkommen, {username}</h1>
      <p>"{quote}"</p>
      <section>
        <h2>Senaste ärenden</h2>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title} - Deadline: {todo.deadline}
                <Link to={`/todo/${todo.id}`}>Visa</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga ej utförda ärenden.</p>
        )}
        <Link to="/todos">Visa alla ärenden</Link>
      </section>

      <section>
        <h2>Rutiner med flest repetitioner</h2>
        {habits.length > 0 ? (
          <ul>
            {habits.map((habit) => (
              <li key={habit.id}>
                {habit.habit} - {habit.repetitions} repetitioner
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga rutiner hittades.</p>
        )}
        <Link to="/habits">Visa alla rutiner</Link>
      </section>
      <section>
        <h2>Kommande händelser</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.name} - {event.start}
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga kommande händelser.</p>
        )}
        <Link to="/events">Visa alla händelser</Link>
      </section>
    </div>
  );
};
export default Dashboard;





