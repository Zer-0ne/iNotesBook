import React, { useContext, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import Notes from '../Notes/Notes'
import './Home.css'
export default function Home() {
  const context = useContext(NoteContext)
  const { addNote } = context
  const [note, setNote] = useState({ title: '', description: '', tag: '' })
  const Add = (e) => {
    e.preventDefault(); //avoid to reload page in web
    addNote(note.title,note.description,note.tag)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="home-container">
        
        <div className="add-note">
          <h1>ADD A NEW NOTE</h1>
          <input onChange={onChange} type="text" name="title" id="title" placeholder='Title' />
          <input onChange={onChange} type="text" name="tag" id="tag" placeholder='Tags' />
          <textarea onChange={onChange} name="description" id="description" cols="30" rows="11" placeholder='Description'></textarea>
          <button type="submit" className='add-btn' onClick={Add}>ADD</button>
        </div>
        <Notes />
      </div>
    </>
  )
}
