import React from 'react';

function TaskList({ tasks, onComplete, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className={task.completed ? 'completed' : ''}>
            <td>{task.name}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onComplete(index)}
              />
            </td>
            <td>
              <button onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
