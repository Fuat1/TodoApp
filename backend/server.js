const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const sequelize = new Sequelize("todoapp", "fuat", "default123", {
  host: "postgres", // Change "localhost" to "postgres"
  dialect: "postgres",
});

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync().then(() => {
  console.log("Database and table have been created.");
});

// Create a new to-do item
app.post("/api/todos", async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Retrieve all tasks
app.get("/api/todos", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    console.log("Tasks found:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Delete task by ID
app.delete("/api/todos/:taskID", async (req, res) => {
  const { taskID } = req.params;
  try {
    await Task.destroy({
      where: {
        id: taskID,
      },
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete a task" });
  }
});

// Update task by ID
app.put("/api/todos/:taskID", async (req, res) => {
  const { taskID } = req.params;
  const { title } = req.body;
  try {
    const updatedTask = await Task.update(
      { title },
      {
        where: {
          id: taskID,
        },
      }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update a task" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
