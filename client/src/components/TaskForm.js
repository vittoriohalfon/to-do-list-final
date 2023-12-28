import React, { useState } from 'react';

function TaskForm({ onAddTask, categories }) {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { name, dueDate, priority };
    console.log("Creating new task with:", newTask);  // Log the new task to verify its structure
    onAddTask(newTask);
    setName('');
    setDueDate('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="task-input">Task:</label>
      <input type="text" id="task-input" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="due-date-input">Due Date:</label>
      <input type="date" id="due-date-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

      <label htmlFor="priority-input">Priority:</label>
      <select id="priority-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" className="submit-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
