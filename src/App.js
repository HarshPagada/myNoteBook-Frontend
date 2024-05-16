import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'


function App() {
  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar loggedInUser={loggedInUser} />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/Home" element={<Home ShowAlert={ShowAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login ShowAlert={ShowAlert} setLoggedInUser={setLoggedInUser} />} />
              <Route exact path="/signup" element={<Signup ShowAlert={ShowAlert} setLoggedInUser={setLoggedInUser} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;


