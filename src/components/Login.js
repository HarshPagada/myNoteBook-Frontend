import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({
        email: "", password: ""
    });

    let history = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/credential`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.setLoggedInUser(credentials.email);
            history('/home')
            props.ShowAlert('Logged in Successfully', "success")

        } else {
            props.ShowAlert("Enter valid Detail", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onClick={handlesubmit}>
                <section className="fire">
                    <div className="h-50">
                        <div className="row justify-content-sm-center h-100 w-100">
                            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                                <div className="card shadow-lg">
                                    <div className="card-body p-5">
                                        <h1 className="fs-2 card-title text-center fw-bold mb-4">Login</h1>
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                            <input id="email" onChange={onChange} type="email" className="form-control" name="email" value={credentials.email} required  />
                                        </div>

                                        <div className="mb-3">
                                            <div className="mb-2 w-100">
                                                <label className="text-muted" htmlFor="password">Password</label>
                                            </div>
                                            <input id="password" onChange={onChange} type="password" value={credentials.password} className="form-control" name="password" required />
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <button type="submit" className="btn btn-primary ">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

export default Login
