import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

const AllTasks = (props) => {
  const [editTask, setEditTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [sortedTasks, setSortedTasks] = useState(props.tasks);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const sorted = [...props.tasks].sort((a, b) => a.id - b.id);
    setSortedTasks(sorted);
  }, [props.tasks]);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    const sorted = [...sortedTasks].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    setSortedTasks(sorted);
  };

  const handleEdit = async (task) => {
    try {
      await axios.put(`/api/todos/${task.id}`, {
        title: editedTaskTitle,
      });
      setEditTask(null);
      setEditedTaskTitle("");
      const updatedSortedTasks = sortedTasks.map((t) =>
        t.id === task.id ? { ...t, title: editedTaskTitle } : t
      );
      setSortedTasks(updatedSortedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/todos/${taskId}`);
      const updatedSortedTasks = sortedTasks.filter(
        (task) => task.id !== taskId
      );
      setSortedTasks(updatedSortedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-slate-800 p-4 ">
      <h2 className="text-3xl font-semibold mb-4">All Tasks</h2>
      <div className="max-h-60 overflow-y-auto md:max-h-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-slate-700  items-center cursor-pointer">
              <th
                className="border border-gray-600 p-2 cursor-pointer"
                onClick={handleSort}
              >
                ID
                {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="border border-gray-600 p-2">Title</th>
              <th className="border border-gray-600 p-2">Created At</th>
              <th className="border border-gray-600 p-2">Updated At</th>
              <th className="border border-gray-600 p-2" colSpan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-950">
                <td className="border border-gray-600 p-2">{task.id}</td>
                <td className="border border-gray-600 p-2">
                  {editTask === task.id ? (
                    <input
                      className="text-black"
                      type="text"
                      id="editTask"
                      name="editTask"
                      value={editedTaskTitle}
                      onChange={(e) => setEditedTaskTitle(e.target.value)}
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="border border-gray-600 p-2">{task.createdAt}</td>
                <td className="border border-gray-600 p-2">{task.updatedAt}</td>
                <td className="border border-gray-600 p-2">
                  {editTask === task.id ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(task)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditTask(task.id);
                        setEditedTaskTitle(task.title);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="border border-gray-600 p-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasks;
