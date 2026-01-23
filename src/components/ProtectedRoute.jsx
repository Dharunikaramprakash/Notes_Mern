import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NotesApp from './NotesApp'

function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <NotesApp user={user} />
}

export default ProtectedRoute
