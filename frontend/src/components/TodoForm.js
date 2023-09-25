import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
    setErrorMessage("");
  };

  const handleAddTask = async () => {
    if (!task.trim()) {
      setErrorMessage("Task title cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/todos", {
        title: task,
      });
      console.log("New task created:", response.data);
      setTask("");
      if (typeof onTaskAdded === "function") {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="bg-slate-800 p-4">
      <input
        type="text"
        placeholder="Enter a new task"
        value={task}
        id="newTask"
        name="newTask"
        onChange={handleTaskChange}
        className="w-full p-2 rounded shadow-md bg-slate-600"
      />
      <p className="text-red-600">{errorMessage}</p>
      <button
        onClick={handleAddTask}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default TodoForm;
