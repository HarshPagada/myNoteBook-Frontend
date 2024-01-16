import { useState } from "react";
import NoteContext from "./NoteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  // const detail = {
  //   "name": "harsh",
  //   "std": "10A"
  // }

  // const [state, setState] = useState(detail);

  // const update = () => {
  //   setTimeout(() => {              // for useContext hook for practice purpose
  //     setState({
  //       "name": "rohan",
  //       "std": "11B"
  //     })
  //   }, 2000);
  // }

  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getallNotes = async () => {

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json)
    } catch {
      console.error('Fetch operation failed:');
    }
  }
  // const getallNotes = async () => {
  //   try {
  //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": "your-auth-token-here"
  //       }
  //     });

  //     if (!response.ok) {
  //       // Handle non-successful responses
  //       console.error(`HTTP error! Status: ${response.status}`);
  //       return;
  //     }

  //     const json = await response.json();
  //     console.log(json);
  //     setNotes(json);
  //   } catch (error) {
  //     console.error('Fetch operation failed:', error);
  //   }
  // };



  // ADD Note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    console.log(json)
  }

  // DELETE Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)

    console.log("deleted note is : " + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // EDIT Note
  const editNote = async (id, description, tag, title) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)


    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }


  return (                      // state,update
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;
