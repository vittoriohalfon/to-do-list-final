// App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const [successMessage, setSuccessMessage] = useState(''); // To display success messages

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks fetched:", data);
        setTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    console.log("Adding task:", task); 
    fetch('http://localhost:5001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then((response) => response.json())
    .then((newTask) => {
      setTasks([...tasks, newTask]);
    })
    .catch((error) => console.error('Error adding task:', error));
  };

  const completeTask = (index) => {
    const taskToUpdate = tasks[index];
  
    // Check if dueDate is undefined before sending the request
    if (!taskToUpdate.dueDate) {
      setErrorMessage("Due date is undefined. Cannot update task.");
      return;  // Exit the function early
    }
  
    fetch(`http://localhost:5001/tasks/${taskToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...taskToUpdate,
        completed: !taskToUpdate.completed ,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      setSuccessMessage('Task updated successfully!');
      // Additional logic to handle the successful response (e.g., updating state)
    })
    .catch((error) => {
      console.error('Error updating task:', error);
      setErrorMessage(`Error updating task: ${error.message}`);
    });
  };
  

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    fetch(`http://localhost:5001/tasks/${taskToDelete.id}`, { method: 'DELETE' })
      .then((response) => {
        setTasks(tasks.filter((_, i) => i !== index));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}  {/* Display error message */}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
