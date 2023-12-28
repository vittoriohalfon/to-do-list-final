const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
// ... other imports ...

const app = express();
const PORT = process.env.PORT || 5001
app.use(express.json()); // for parsing application/json
app.use('/tasks', tasksRouter); // Use the tasks router for all requests to /tasks

// ... any other routers you might have ...

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
