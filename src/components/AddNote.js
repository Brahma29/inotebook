import React from "react";
import noteContext from '../context/notes/noteContext';
import { useContext, useState } from 'react';

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : ""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({id: "", title : "", description : "", tag : ""})
        props.showAlert("Note Added Successfully", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-4">
        <h1>Add a Note</h1>
        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
            Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name = "title"
              value={note.title}
              aria-describedby="emailHelp" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name = "description" 
              value = {note.description}
              onChange={onChange}
            />
            </div>
             <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name = "tag" 
              value = {note.tag}
              onChange={onChange}
            />
          </div>
          <button type="submit" disabled = {note.title.length<5 || note.description.length<12} className="btn btn-primary" onClick = {handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote