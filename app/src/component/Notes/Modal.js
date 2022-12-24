import React, { useRef } from 'react'
import './Notes.css'
export default function Modal(props) {
    
  return (
    <>
      <div className="modal-container">
        <div className="modal" >
        <div className="add-note">
          <h1>ADD A NEW NOTE</h1>
          <input type="text" name="title" id="title" placeholder='Title' />
          <input type="text" name="tag" id="tag" placeholder='Tags' />
          <textarea name="description" id="description" cols="10" rows="5" placeholder='Description'></textarea>
          <button type="submit" ref={props.ref} className='add-btn' >UPDATE</button>
          <i className="fa-solid fa-xmark"></i>
        </div>
        </div>
      </div>
    </>
  )
}
