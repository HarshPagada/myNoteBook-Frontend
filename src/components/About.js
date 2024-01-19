import React, { useContext, useEffect } from 'react'
// import NoteContext from '../context/notes/NoteContext'

export default function About() {

  // const a = useContext(NoteContext);  // useContext hook for practice purpose
  // useEffect(() => {
  //   a.update();
  //   // eslint-disable-next-line
  // }, [])
  return (
    <>
      <h1 className='text-center text-info'>WELCOME TO MyNoteBook app</h1>
      <p className='text-center'>our application is all about note and some sensitive data.</p>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">message</label>
          <textarea type="text" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="col-md-6 mb-3">
          <label for="inputCity" className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity"/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>

  )
}

