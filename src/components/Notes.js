import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Notes(props) {
    const context = useContext(noteContext);
    const { notes, editNote, getallNotes } = context;

    let history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallNotes()
        } else {
            history('/login')
        }
        // eslint-disable-next-line
    }, []);


    // const {setAlert}=props;
    const ref = useRef(null);

    const [note, setNote] = useState({ id:"", edittitle: "", editdescription: "", edittag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description, edittag: currentNote.tag })
    }
    
    const handleclick = (e) => {    
        editNote(note.id, note.editdescription, note.edittag, note.edittitle);
        console.log('updated note :', note)
        ref.current.click(); // Close the modal
        props.ShowAlert('Note is Updated', "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>

                <AddNote ShowAlert={props.ShowAlert}/>


                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Note
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                        <input type="text" className="form-control" name='edittitle' value={note.edittitle} onChange={onChange} id="edittitle" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                        <textarea type="texarea" className="form-control" name='editdescription' value={note.editdescription} onChange={onChange} id="editdescription" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                        <input type="text" className="form-control" name='edittag' value={note.edittag} onChange={onChange} id="edittag" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button  disabled={note.edittitle.length < 5 || note.editdescription.length < 5} type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleclick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='h-auto'>
                    <h3 className='my-4 '>Your Note</h3>
                        {notes.length ===0 && 'Nothing Else Here'} 
                    <div className='h-auto'>
                        {notes.map((note) => {
                            return <Noteitem key={note._id} ShowAlert={props.ShowAlert} updateNote={updateNote} note={note} />;
                        })}
                    </div>
                </div>
            </div>
                    
   )
}

export default Notes
