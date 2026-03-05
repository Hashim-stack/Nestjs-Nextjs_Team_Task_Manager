import { useEffect,useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Navbar(){

 const [role,setRole] = useState(null)
 const [token,setToken] = useState(null)
 const router = useRouter()

 useEffect(()=>{

  if(typeof window === "undefined") return

  const t = localStorage.getItem("token")
  const r = localStorage.getItem("role")

  setToken(t)
  setRole(r)

 },[])

 const logout = ()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  router.push("/login")
 }

 return(

  <nav className="bg-indigo-600 text-white shadow">

   <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

    <h1 className="font-bold text-lg">
     Team Task Management System
    </h1>

    <div className="flex gap-4">

     {!token && (
      <>
       <Link href="/login">Login</Link>
       <Link href="/register">Register</Link>
      </>
     )}

     {token && role === "admin" && (
      <Link href="/admin">Admin Panel</Link>
     )}

     {token && role !== "admin" && (
      <Link href="/dashboard">Dashboard</Link>
     )}

     {token && (
      <button
       className="bg-red-500 px-3 py-1 rounded"
       onClick={logout}
      >
       Logout
      </button>
     )}

    </div>

   </div>

  </nav>

 )

}