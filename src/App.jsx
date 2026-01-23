import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/notes"
        element={<ProtectedRoute />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
