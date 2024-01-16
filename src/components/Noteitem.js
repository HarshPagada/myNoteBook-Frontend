import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import noteContext from '../context/notes/NoteContext'


function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const color={
        backgroundColor : 'gray',
        color: 'white',
    }


    return (
        <>
            <p className='position-relative top-1'>{new Date(note.date).toLocaleString('en-IN')}</p>
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between " style={color}>
                <div className='hello'>
                    {note.title}
                </div>
                <div>
                    <FontAwesomeIcon className='mx-2' icon={faPenToSquare} onClick={() => { updateNote(note) }} />
                    <FontAwesomeIcon className='mx-2' icon={faTrash} onClick={() => {
                        deleteNote(note._id);
                        props.ShowAlert('Note has been Deleted', "success")
                    }} />
                </div>
            </div>
            <div className="card-body" style={{backgroundColor: 'cornsilk'}}>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </>
    )
}

export default Noteitem

