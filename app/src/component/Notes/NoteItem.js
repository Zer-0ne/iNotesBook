import React, { useContext } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import './Notes.css'
export default function NoteItem(props) {
    const {note,updateNote} = props
    const context = useContext(NoteContext)
    const {deleteNote}=context
  return (
    <>

      <div className="noteitem-container card">
        <h2>{note.title}</h2>
        <h4>{note.tag}</h4>
        <p>{note.description} </p>
        <div className="del-edit">
        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note);}}></i>
        <i className="fa-regular fa-trash-can" onClick={()=>{deleteNote(note._id)}}></i>
        </div>
      </div>
    
    </>
  )
}
