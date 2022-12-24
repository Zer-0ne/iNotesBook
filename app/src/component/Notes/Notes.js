import React, { useContext, useEffect } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import '../Home/Home.css'
import NoteItem from './NoteItem'
import './Notes.css'
export default function Notes() {
    const context = useContext(NoteContext)
    const { notes, getNote } = context
    useEffect(() => {
        // eslint-disable-next-line
        getNote()
    }, [])
    const updateNote = (note) => {
        const modal = document.querySelector('.modal-container')
        modal.style.top = (modal.style.top === '15vh') ? '-100vh' : '15vh'
        const home = document.querySelector('.add-note')
        home.style.filter = (home.style.filter === 'blur(5px)') ? 'blur(0)' : 'blur(5px)'
        const blur = document.querySelector('.all-notes')
        blur.style.filter = (blur.style.filter === 'blur(5px)') ? 'blur(0)' : 'blur(5px)'
        // for (let index = 0; index < home.length; index++) {            
        //     home[index].style.filter=(home[index].style.filter==='blur(5px)')?'blur(0)':'blur(5px)'
        // }
    }
    return (
        <>

            <div className="modal-container" id='modal-container'>
                <div className="modal" >
                    <div className="add-note">
                        <h1>ADD A NEW NOTE</h1>
                        <input type="text" name="title" id="title" placeholder='Title' />
                        <input type="text" name="tag" id="tag" placeholder='Tags' />
                        <textarea name="description" id="description" cols="10" rows="5" placeholder='Description'></textarea>
                        <button type="submit" className='add-btn' >UPDATE</button>
                        <i className="fa-solid fa-xmark" onClick={() => {
                            const modal = document.querySelector('.modal-container'); modal.style.top = '-100vh';
                            const home = document.querySelector('.add-note')
                            home.style.filter = (home.style.filter === 'blur(5px)') ? 'blur(0)' : 'blur(5px)';
                            const blur = document.querySelector('.all-notes')
                            blur.style.filter = (blur.style.filter === 'blur(5px)') ? 'blur(0)' : 'blur(5px)'
                        }}></i>
                    </div>
                </div>
            </div>
            <div className=" add-note all-notes">
                <h1>ALL YOUR NOTES</h1>

                <div className="cards">
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
