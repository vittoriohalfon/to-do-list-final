import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null); // Updated to manage user state
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [view, setView] = useState('login'); // New state to manage login/register view

  const API_BASE_URL = 'http://localhost:5001/api'; // Define API base URL

  useEffect(() => {
    if (user) { // Fetch tasks only if user is authenticated
      fetch(`${API_BASE_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } // Use token from localStorage
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks fetched:", data);
        setTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
    }
  }, [user]); // Dependency array includes 'user' to refetch when user state changes

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then(setCategories)
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleLogin = (username, password) => {
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('token', data.token); // Store the token in localStorage
      setUser(data);
      setView('tasks'); // Change view to tasks after login
    })
    .catch((error) => {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to login');
    });
  };

  const handleRegister = (username, password) => {
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      setSuccessMessage('Registered successfully! Please log in.');
      setView('login'); // Change view to login after successful registration
    })
    .catch((error) => {
      console.error('Error registering:', error);
      setErrorMessage('Failed to register');
    });
  };

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

  const renderView = () => {
    if (user && view === 'tasks') { // Render tasks if user is logged in
      return (
        <>
          <TaskForm onAddTask={addTask} categories={categories} />
          <TaskList tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
        </>
      );
    } else if (view === 'register') {
      return <Register onRegister={handleRegister} />;
    } else {
      return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <button onClick={() => setView('login')}>Login</button>
      <button onClick={() => setView('register')}>Register</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {renderView()}
    </div>
  );
}

export default App;