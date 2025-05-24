import React, { useState, useEffect } from 'react';
const Habits = () => { 
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [priority, setPriority] = useState('låg');
  const [filterPriority, setFilterPriority] = useState('Alla');
  const [sortOption, setSortOption] = useState('reps-desc');
  const [habitToDelete, setHabitToDelete] = useState(null);  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); 
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[loggedInUser]) {
      setHabits(users[loggedInUser].habits || []);
    }
  }, []);
  const handleAddHabit = () => {
    if (!habitName) {
      alert('En titel krävs!');
      return;
    }
    const newHabit = {
      id: Date.now(),
      habit: habitName,
      repetitions: 0,
      priority,
    };
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    users[loggedInUser].habits.push(newHabit);
    localStorage.setItem('users', JSON.stringify(users));
    setHabits(users[loggedInUser].habits);
    setHabitName('');
  };
  const confirmDeleteHabit = (habit) => {
    setHabitToDelete(habit);
    setShowConfirmDialog(true);
  };
  const handleDeleteHabit = () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedHabits = users[loggedInUser].habits.filter(habit => habit.id !== habitToDelete.id);
    users[loggedInUser].habits = updatedHabits;
    localStorage.setItem('users', JSON.stringify(users));
    setHabits(updatedHabits);
    setShowConfirmDialog(false);
    setHabitToDelete(null);
  };
  const incrementRepetitions = (id) => {
    updateHabitRepetitions(id, 1);
  };
  const decrementRepetitions = (id) => {
    updateHabitRepetitions(id, -1);
  };
  const resetRepetitions = (id) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, repetitions: 0 } : habit
    );
    updateHabits(updatedHabits);
  };
  const updateHabitRepetitions = (id, change) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id
        ? { ...habit, repetitions: habit.repetitions + change }
        : habit
    );
    updateHabits(updatedHabits);
  };
  const updateHabits = (updatedHabits) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users'));
    users[loggedInUser].habits = updatedHabits;
    localStorage.setItem('users', JSON.stringify(users));
    setHabits(updatedHabits);
  };
  const filteredHabits = () => {
    let result = [...habits];

    if (filterPriority !== 'Alla') {
      result = result.filter(habit => habit.priority === filterPriority);
    }
    result.sort((a, b) => {
      switch (sortOption) {
        case 'reps-desc':
          return b.repetitions - a.repetitions;
        case 'reps-asc':
          return a.repetitions - b.repetitions;
        default:
          return 0;
      }
    });
    return result;
  };
  return (
    <div className="container">
      <h1>Vanor</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Ny vana"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>
        <button onClick={handleAddHabit}>Lägg till</button>
      </div>
      <div className="filters">
        <select onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="Alla">Alla prioriteter</option>
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="reps-desc">Repetitioner (Högst först)</option>
          <option value="reps-asc">Repetitioner (Lägst först)</option>
        </select>
      </div>
      <ul>
        {filteredHabits().map(habit => (
          <li key={habit.id}>
            <strong>{habit.habit}</strong>  
            <p>Prioritet: {habit.priority}</p>
            <p>Repetitioner: {habit.repetitions}</p>
            <button onClick={() => incrementRepetitions(habit.id)}>+1</button>
            <button onClick={() => decrementRepetitions(habit.id)}>-1</button>
            <button onClick={() => resetRepetitions(habit.id)}>Återställ</button>
            <button className="delete" onClick={() => confirmDeleteHabit(habit)}>Ta bort</button>
          </li>
        ))}
      </ul>
      {showConfirmDialog && (
        <div className="confirm-popup">
          <p>Är du säker på att du vill ta bort vanan "{habitToDelete.habit}"?</p>
          <button onClick={handleDeleteHabit}>Ja, ta bort</button>
          <button onClick={() => setShowConfirmDialog(false)}>Avbryt</button>
        </div>
      )}
    </div>
  );
};
export default Habits;





