import { useEffect,useState } from "react"
import axios from "axios"
import Navbar from "./components/Navbar"

export default function Admin(){

 const [tasks,setTasks] = useState([])
 const [users,setUsers] = useState([])
 const [stats,setStats] = useState({})

 const [title,setTitle] = useState("")
 const [description,setDescription] = useState("")
 const [userId,setUserId] = useState("")

 useEffect(()=>{

  const token = localStorage.getItem("token")

  loadTasks(token)
  loadUsers(token)
  loadStats(token)

 },[])


 const loadTasks = async(token)=>{

  const res = await axios.get(
   "http://localhost:3001/tasks",
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  setTasks(res.data)

 }


 const loadUsers = async(token)=>{

  const res = await axios.get(
   "http://localhost:3001/users",
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  setUsers(res.data)

 }


 const loadStats = async(token)=>{

  const res = await axios.get(
   "http://localhost:3001/tasks/stats",
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  setStats(res.data)

 }


 const createTask = async()=>{

  const token = localStorage.getItem("token")

  await axios.post(
   "http://localhost:3001/tasks",
   {title,description,userId},
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  setTitle("")
  setDescription("")
  setUserId("")

  loadTasks(token)
  loadStats(token)

 }


 const markCompleted = async(id)=>{

  const token = localStorage.getItem("token")

  await axios.put(
   `http://localhost:3001/tasks/${id}/complete`,
   {},
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  loadTasks(token)
  loadStats(token)

 }


 const setPriority = async(id,priority)=>{

  const token = localStorage.getItem("token")

  await axios.put(
   `http://localhost:3001/tasks/${id}/priority`,
   {priority},
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  loadTasks(token)

 }


 const deleteTask = async(id)=>{

  const token = localStorage.getItem("token")

  await axios.delete(
   `http://localhost:3001/tasks/${id}`,
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  loadTasks(token)
  loadStats(token)

 }


 const deleteUser = async(id)=>{

  const token = localStorage.getItem("token")

  await axios.delete(
   `http://localhost:3001/users/${id}`,
   { headers:{ Authorization:`Bearer ${token}` } }
  )

  loadUsers(token)

 }


 return(

  <div>

   <Navbar/>

   <div className="max-w-5xl mx-auto mt-10">

    <h1 className="text-3xl font-bold mb-6">
     Admin Dashboard
    </h1>


{/* STATS */}

<div className="grid grid-cols-3 gap-4 mb-10">

 <div className="bg-white shadow p-4 rounded text-center">
  <h2 className="text-2xl font-bold">{stats.totalTasks || 0}</h2>
  <p>Total Tasks</p>
 </div>

 <div className="bg-green-100 shadow p-4 rounded text-center">
  <h2 className="text-2xl font-bold">{stats.completedTasks || 0}</h2>
  <p>Completed Tasks</p>
 </div>

 <div className="bg-yellow-100 shadow p-4 rounded text-center">
  <h2 className="text-2xl font-bold">{stats.pendingTasks || 0}</h2>
  <p>Pending Tasks</p>
 </div>

</div>


{/* CREATE TASK */}

<div className="bg-white p-4 rounded shadow mb-6">

 <h2 className="font-bold mb-3">Create Task</h2>

 <input
  className="border p-2 w-full mb-2"
  placeholder="Title"
  value={title}
  onChange={(e)=>setTitle(e.target.value)}
 />

 <input
  className="border p-2 w-full mb-2"
  placeholder="Description"
  value={description}
  onChange={(e)=>setDescription(e.target.value)}
 />

 <select
  className="border p-2 w-full mb-2"
  value={userId}
  onChange={(e)=>setUserId(e.target.value)}
 >

  <option value="">Assign User</option>

  {users.map(u=>(
   <option key={u.id} value={u.id}>
    {u.email}
   </option>
  ))}

 </select>

 <button
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onClick={createTask}
 >
  Create Task
 </button>

</div>


{/* TASK LIST */}

<h2 className="text-2xl font-bold mb-4">Task Management</h2>

{tasks.map(t=>(

 <div
  key={t.id}
  className="border p-4 mb-3 rounded flex justify-between items-center"
 >

  <div>
   <h3 className="font-bold">{t.title}</h3>
   <p>{t.description}</p>

   <p className="text-sm text-blue-500">
    Status: {t.status}
   </p>

   <p className="text-sm text-gray-500">
    Created by: {t.user?.email}
   </p>

  </div>


  <div className="flex gap-2">

   <select
    className="border p-1 rounded"
    value={t.priority}
    onChange={(e)=>setPriority(t.id,e.target.value)}
   >

    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>

   </select>


   {t.status !== "completed" && (
    <button
     className="bg-green-500 text-white px-3 py-1 rounded"
     onClick={()=>markCompleted(t.id)}
    >
     Complete
    </button>
   )}


   <button
    className="bg-red-500 text-white px-3 py-1 rounded"
    onClick={()=>deleteTask(t.id)}
   >
    Delete
   </button>

  </div>

 </div>

))}


{/* USER MANAGEMENT */}

<h2 className="text-2xl font-bold mt-10 mb-4">
 User Management
</h2>

{users.map(u=>(

 <div
  key={u.id}
  className="border p-4 mb-3 rounded flex justify-between items-center"
 >

  <div>
   <p className="font-bold">{u.email}</p>
   <p className="text-sm text-gray-500">Role: {u.role}</p>
  </div>

  {u.role !== "admin" && (
   <button
    className="bg-red-500 text-white px-3 py-1 rounded"
    onClick={()=>deleteUser(u.id)}
   >
    Delete User
   </button>
  )}

 </div>

))}

   </div>

  </div>

 )

}