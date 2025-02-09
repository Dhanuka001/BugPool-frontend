import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate()
    const title = "{BugPool}"
  return (
    <div className="absolute top-4 w-full flex justify-between px-8">
      <h1 className="text-3xl font-bold text-green-500">{title}</h1>
      <div>
        <button 
        onClick={() => navigate('/login')}
        className="px-4 py-2 border border-green-500 text-green-500 rounded mr-4 hover:bg-green-500 hover:text-black">
          Login
        </button>
        <button 
        onClick={() => navigate('/register')}
        className="px-4 py-2 bg-green-500 text-black rounded hover:opacity-80">
          Register
        </button>
      </div>
    </div>
  )
}
