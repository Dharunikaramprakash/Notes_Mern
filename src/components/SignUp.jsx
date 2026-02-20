import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import axios from 'axios'
import { APIURL } from '../data/apiUrl.js'

function SignUp({ onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
   try{
     const response = await axios.post(`${APIURL}/user/register`,{name,email,password})
     console.log(response);
     
     
   }catch(error){
    console.log(error)
   }



    // Check if email already exists
    // const users = JSON.parse(localStorage.getItem('users') || '[]')
    // const existingUser = users.find(u => u.email === email)

    // if (existingUser) {
    //   setError('Email already registered. Please login instead.')
    //   return
    // }

    // // Create new user
    // const newUser = {
    //   id: Date.now(),
    //   name: name.trim(),
    //   email: email.trim(),
    //   password: password,
    //   createdAt: new Date().toISOString()
    // }

    // // Save user to localStorage
    // users.push(newUser)
    // localStorage.setItem('users', JSON.stringify(users))

    // login(newUser)
    navigate('/notes')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          {onBack && (
            <button 
              type="button" 
              className="btn btn-cancel btn-block"
              onClick={onBack}
              style={{ marginTop: '10px' }}
            >
              Back
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default SignUp
