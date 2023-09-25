import React, { useState, useEffect } from "react";
import AllTasks from "./components/AllTasks";
import TodoForm from "./components/TodoForm";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios
      .get("/api/todos")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <header className="p-4">
        <div className="max-w-3xl mx-auto p-4 bg-indigo-700 rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold mb-4 text-white">
            Task Manager
          </h1>
          <TodoForm onTaskAdded={handleTaskAdded} />
          <AllTasks tasks={tasks} />
        </div>
      </header>
    </div>
  );
}

export default App;
