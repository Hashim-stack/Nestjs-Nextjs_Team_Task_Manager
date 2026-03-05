import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Tasks
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="text-gray-600">{t.description}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}