const pool = require('../db/database');

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await pool.query("SELECT * FROM tasks");
        res.json(allTasks.rows);
      } catch (err) {
        logger.error(`Error fetching tasks: ${err.message}`);
        res.status(500).json({ error: "Internal server error", message: err.message });
      }
};

const addTask = async (req, res) => {
    console.log("Received task for creation:", req.body);
    try {
      const { name, dueDate, priority } = req.body;
      
      // Basic validation
      if (!name || !dueDate || !priority) {
        return res.status(400).json({ error: 'Please provide name, dueDate, and priority' });
      }
  
      const newTask = await pool.query(
        "INSERT INTO tasks (name, dueDate, priority) VALUES($1, $2, $3) RETURNING *",
        [name, dueDate, priority]
      ).catch(err => console.error(err));
      res.status(201).json(newTask.rows[0]);
    } catch (err) {
      logger.error(`Error adding new task: ${err.message}`);
      res.status(500).json({ error: "Internal server error", message: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dueDate, priority, completed } = req.body;
    
        console.log("Updating task:", { id, name, dueDate, priority, completed });
        
        // Basic validation
        if (!name || !dueDate || !priority) {
          return res.status(400).json({ error: 'Please provide name, dueDate, and priority' });
        }
    
        const updateTask = await pool.query(
          "UPDATE tasks SET name = $1, dueDate = $2, priority = $3, completed = $4 WHERE id = $5 RETURNING *",
          [name, dueDate, priority, completed, id]
        );
        if (updateTask.rows.length === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json(updateTask.rows[0]);
      } catch (err) {
        logger.error(`Error updating task with ID ${req.params.id}: ${err.message}`);
        res.status(500).json({ error: "Internal server error", message: err.message });
      }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        if (deleteTask.rowCount === 0) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: 'Task was successfully deleted!' });
      } catch (err) {
        logger.error(`Error deleting task with ID ${req.params.id}: ${err.message}`);
        res.status(500).json({ error: "Internal server error", message: err.message });
      }
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };