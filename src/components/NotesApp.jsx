import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../App.css'
import axios from 'axios'
import { APIURL } from '../data/apiUrl.js'

function NotesApp({ user }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  const token = JSON.parse(localStorage.getItem("token"))

  // Load notes from localStorage on mount (user-specific)
  // useEffect(() => {
  //   const userNotes = localStorage.getItem(`notes_${user.id}`)
  //   if (userNotes) {
  //     setNotes(JSON.parse(userNotes))
  //   }
  // }, [user.id])



  useEffect(() => {
        const fetchNotes = async () => {
    try {
      const res = await axios.get("https://notes-backend-1gqs.onrender.com/notes/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNotes(res.data)
    } catch (error) {
      console.log("Error fetching notes:", error)
    }
  }
  fetchNotes()
}, [notes])

  // Save notes to localStorage whenever notes change (user-specific)
  // useEffect(() => {
  //   localStorage.setItem(`notes_${user.id}`, JSON.stringify(notes))
  // }, [notes, user.id])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (!title.trim() && !content.trim()) return

  //   if (editingId) {
  //     // Update existing note
  //     setNotes(notes.map(note =>
  //       note.id === editingId
  //         ? { ...note, title: title.trim(), content: content.trim(), updatedAt: new Date().toISOString() }
  //         : note
  //     ))
  //     setEditingId(null)
  //   } else {
  //     // Create new note
  //     const newNote = {
  //       id: Date.now(),
  //       title: title.trim(),
  //       content: content.trim(),
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString()
  //     }
  //     setNotes([newNote, ...notes])
  //   }

  //   setTitle('')
  //   setContent('')
  // }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(editingId){
      try {
      const res = await axios.put(`${APIURL}/notes/update/${editingId}`,{title,content}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(res.data)
    } catch (error) {
      console.log("Error update notes:", error)
    }
    }

    try {
      const res = await axios.post(`${APIURL}/notes/create`,{title,content}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(res.data)
    } catch (error) {
      console.log("Error posting notes:", error)
    }

  }

  const handleEdit = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note._id)
  }

  const handleDelete =async (id) => {
    try {
      const res = await axios.delete(`${APIURL}/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(res.data)
    } catch (error) {
      console.log("Error delete notes:", error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h1>📝 Notes App</h1>
            <p>Welcome, {user.name}!</p>
          </div>
          <button onClick={handleLogout} className="btn btn-cancel" style={{ marginTop: 0 }}>
            Logout
          </button>
        </div>
      </header>

      <div className="app-container">
        <form className="note-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="note-title-input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="note-content-input"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
          />
          <div className="form-actions">
            {editingId && (
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        </form>

        <div className="notes-grid">
          {notes?.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            notes?.map(note => (
              <div key={note._id} className="note-card">
                <div className="note-header">
                  <h3 className="note-title">{note.title || 'Untitled'}</h3>
                  <div className="note-actions">
                    <button
                      className="btn-icon"
                      onClick={() => handleEdit(note)}
                      aria-label="Edit note"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => handleDelete(note._id)}
                      aria-label="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <span className="note-date">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NotesApp
