import { useState, useEffect} from 'react'
import Note from './Note'
import noteService from "../services/notes"
import Notification from "./Notification"
import Footer from "./Footer.jsx"


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note ...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then( initialNotes => setNotes(initialNotes))
    }, [])


    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()

        noteService
            .create({
                content: newNote,
                date: new Date().toISOString(),
                important: Math.random() < 0.5
            })
            .then(createdNote => setNotes(notes.concat(createdNote)))
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        noteService.update(id,
                           {
                               ...note, important: !note.important
                            })
            .then(updatedNote => setNotes(notes.map(note => note.id !== id ? note : updatedNote)))
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
        <h1>Notes</h1>
              <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
        <ul>
        {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
        </ul>
        <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
        </form>
        <Footer />
        </div>
    )
}

export default App
