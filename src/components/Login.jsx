import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import axios from 'axios'

function Login({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try{
     const response = await axios.post("https://notes-backend-1gqs.onrender.com/user/login",{email,password})
     console.log(response.data.token);
     localStorage.setItem("token",JSON.stringify(response.data.token))
     login(response.data)
     navigate("/notes")
     
     
   }catch(error){
    console.log(error)
   }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
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

export default Login
