import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const host='http://localhost:55000'
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)
  // {state,update} or we can {state:state,update:update} both r same


  // Add Note
  const getNote = async() => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MjZmOTI2NWI2NTI4YWQyYTZjOWQ0In0sImlhdCI6MTY2NTMwMDc4OH0.i_Uk4FDnI1ql32ZdQni4QyPzoTR16r-xYghLOvH_9mM'
      }
    });
    const json=await response.json()
    setNotes(json)    
  }
  // Add Note
  const addNote = async(title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MjZmOTI2NWI2NTI4YWQyYTZjOWQ0In0sImlhdCI6MTY2NTMwMDc4OH0.i_Uk4FDnI1ql32ZdQni4QyPzoTR16r-xYghLOvH_9mM'
      },
      
      body: JSON.stringify({title,description,tag}) 
    });

    console.log(title);
    // const note ={}
    const note = {
      
        "title":title,
        "description":description,
        "tag":tag
      
    }
    setNotes(notes.concat(note))
  }

  //delete Note
  const  deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MjZmOTI2NWI2NTI4YWQyYTZjOWQ0In0sImlhdCI6MTY2NTMwMDc4OH0.i_Uk4FDnI1ql32ZdQni4QyPzoTR16r-xYghLOvH_9mM'
      }
    });
    const json = response.json()
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // Api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0MjZmOTI2NWI2NTI4YWQyYTZjOWQ0In0sImlhdCI6MTY2NTMwMDc4OH0.i_Uk4FDnI1ql32ZdQni4QyPzoTR16r-xYghLOvH_9mM'
      },
      
      body: JSON.stringify({title,tag,description}) 
    });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title
        element.tag = tag
        element.description = description
      }
    }
    // return response.json();
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState