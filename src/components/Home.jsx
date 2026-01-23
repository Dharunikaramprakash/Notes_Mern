import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Login from './Login'
import SignUp from './SignUp'
import './Auth.css'

function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/notes')
    }
  }, [user, navigate])

  if (showLogin) {
    return (
      <div>
        <Login onBack={() => setShowLogin(false)} />
      </div>
    )
  }

  if (showSignUp) {
    return (
      <div>
        <SignUp onBack={() => setShowSignUp(false)} />
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📝 Notes App</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Organize your thoughts and ideas
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            className="btn btn-primary btn-block"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => setShowSignUp(true)}
            style={{ background: 'white', color: '#667eea', border: '2px solid #667eea' }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
