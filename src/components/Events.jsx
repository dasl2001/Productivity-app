import React, { useState, useEffect } from 'react'; 
const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [filterOption, setFilterOption] = useState('Kommande');
  const [editingEvent, setEditingEvent] = useState(null); 
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[loggedInUser]) {
      const sortedEvents = [...users[loggedInUser].events].sort((a, b) => new Date(a.start) - new Date(b.start));
      setEvents(sortedEvents);
    }
  }, []);
  const handleAddEvent = () => {
    if (!eventName || !start || !end) {
      alert('Alla fält måste fyllas i!');
      return;
    }
    const newEvent = {
      id: Date.now(),
      name: eventName,
      start,
      end,
    };
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    users[loggedInUser].events.push(newEvent);
    users[loggedInUser].events.sort((a, b) => new Date(a.start) - new Date(b.start)); 
    localStorage.setItem('users', JSON.stringify(users));
    setEvents(users[loggedInUser].events);
    setEventName('');
    setStart('');
    setEnd('');
  };
  const handleDeleteEvent = (id) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedEvents = users[loggedInUser].events.filter(event => event.id !== id);
    users[loggedInUser].events = updatedEvents;
    localStorage.setItem('users', JSON.stringify(users));
    setEvents(updatedEvents);
  };
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setStart(event.start);
    setEnd(event.end);
  };
  const handleUpdateEvent = () => {
    if (!eventName || !start || !end) {
      alert('Alla fält måste fyllas i!');
      return;
    }
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedEvents = users[loggedInUser].events.map(event =>
      event.id === editingEvent.id
        ? { ...event, name: eventName, start, end }
        : event
    );
    users[loggedInUser].events = updatedEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    localStorage.setItem('users', JSON.stringify(users));
    setEvents(updatedEvents);
    setEditingEvent(null);
    setEventName('');
    setStart('');
    setEnd('');
  };
  const filteredEvents = events.filter(event =>
    filterOption === 'Kommande'
      ? new Date(event.start) >= new Date()
      : new Date(event.start) < new Date()
  );
  return (
    <div className="container">
      <h1>Händelser</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Namn på händelse"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        {editingEvent ? (
          <button onClick={handleUpdateEvent}>Uppdatera händelse</button>
        ) : (
          <button onClick={handleAddEvent}>Lägg till händelse</button>
        )}
      </div>
      <div className="filters">
        <select onChange={(e) => setFilterOption(e.target.value)}>
          <option value="Kommande">Kommande</option>
          <option value="Tidigare">Tidigare</option>
        </select>
      </div>
      <ul>
        {filteredEvents.map(event => (
          <li
            key={event.id}
            className={
              new Date(event.start) < new Date() ? 'past-event' : ''
            }
          >
            {event.name} - {event.start}
            <button onClick={() => handleEditEvent(event)}>Redigera</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Events;




