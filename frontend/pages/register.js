import axios from "axios"
import { useState } from "react"
import Navbar from "./components/Navbar"

export default function Register(){

 const[name,setName]=useState("")
 const[email,setEmail]=useState("")
 const[password,setPassword]=useState("")

 const register = async()=>{

  await axios.post(
   "http://localhost:3001/auth/register",
   {name,email,password}
  )

  alert("User created")
 }

 return(

  <div className="min-h-screen bg-gray-100">

   {/* Navbar */}
   <Navbar/>

   {/* Page Content */}
   <div className="flex justify-center items-center mt-20">

    <div className="bg-white p-10 rounded-xl shadow-lg w-96">

     <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
      Create Account
     </h1>

     <input
      className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Name"
      onChange={e=>setName(e.target.value)}
     />

     <input
      className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Email"
      onChange={e=>setEmail(e.target.value)}
     />

     <input
      type="password"
      className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      placeholder="Password"
      onChange={e=>setPassword(e.target.value)}
     />

     <button
      className="bg-indigo-600 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition"
      onClick={register}
     >
      Register
     </button>

    </div>

   </div>

  </div>

 )
}