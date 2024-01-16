/* eslint-disable no-restricted-globals */
import React, { useEffect, useLocation } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// const navigation = [
// { name: 'Home', href: '/', current: location.pathname === '/' },
// { name: 'About', href: '/about', current: location.pathname === '/about' },
// ]

export default function Navbar({ loggedInUser }) {
    // let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    let navigate = useNavigate()

    const color = {
        backgroundColor: "gainsboro"
    }

    const color2 = {
        marginRight: "10%",
    }

    const clickLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg " style={color}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">MyNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className='d-flex'>
                        <Link className="btn btn-primary mx-2" role="button" to='/login'>Login</Link>
                        <Link className="btn btn-primary" role="button" to='/Signup'>Sign Up</Link>
                    </form> :
                        <ul className="navbar-nav" style={color2}>
                            <li className="nav-item dropdown">
                                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Profile
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark text-center">
                                    <p>{loggedInUser ? loggedInUser : 'Email not available'}</p>
                                    <button onClick={clickLogout} className='btn btn-primary'>Logout</button>
                                </ul>
                            </li>
                        </ul>}
                </div>
            </div>
        </nav>
    )
}


