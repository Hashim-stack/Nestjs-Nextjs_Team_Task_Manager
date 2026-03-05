import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    setRole(userRole);

    if (userRole === "admin") {
      router.push("/admin");
      return;
    }

    loadTasks(token);
  }, []);
  const markCompleted = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3001/tasks/${id}`,
      { status: "completed" },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    loadTasks(token);
  };

  const loadTasks = async (token) => {
    try {
      const res = await axios.get("http://localhost:3001/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3001/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setDescription("");

      loadTasks(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

        {role !== "admin" && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="font-semibold mb-3">Add New Task</h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border p-2 w-full mb-3 rounded"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={createTask}
            >
              Add Task
            </button>
          </div>
        )}
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => markCompleted(task.id)}
        >
          Complete
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{task.title}</h3>

              <p className="text-gray-600">{task.description}</p>
              <p
                className={`text-sm font-bold ${
                  task.priority === "high"
                    ? "text-red-500"
                    : task.priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                Priority: {task.priority}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
