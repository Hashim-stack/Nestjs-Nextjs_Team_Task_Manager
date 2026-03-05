import { useState } from "react"
import axios from "axios"
import Navbar from "./components/Navbar"

export default function Login(){

 const[email,setEmail]=useState("")
 const[password,setPassword]=useState("")

 const login = async()=>{

 try{

  const res = await axios.post(
   "http://localhost:3001/auth/login",
   {email,password}
  )

  localStorage.setItem("token",res.data.access_token)
  localStorage.setItem("role",res.data.role)

  if(res.data.role === "admin"){
   window.location.href="/admin"
  }else{
   window.location.href="/dashboard"
  }

 }catch(err){
  console.log(err.response.data)
  alert(err.response.data.message)
 }

}
 return(

 <div>

  <Navbar/>

  <div className="flex justify-center mt-20">

   <div className="bg-white p-8 rounded shadow w-80">

    <h1 className="text-2xl font-bold mb-4 text-center">
      Login
    </h1>

    <input
     className="border p-2 w-full mb-3 rounded"
     placeholder="Email"
     onChange={e=>setEmail(e.target.value)}
    />

    <input
     type="password"
     className="border p-2 w-full mb-3 rounded"
     placeholder="Password"
     onChange={e=>setPassword(e.target.value)}
    />

    <button
     className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
     onClick={login}
    >
      Login
    </button>

   </div>

  </div>

 </div>

 )
}