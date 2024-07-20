import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgotpass = (props) => {

    const [credentials, setCredentials] = useState({
        email: "", password: ""
    });

    let navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://mynotebook-backend-z56j.onrender.com/api/auth/resetpassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();  // Parse JSON response

        if (response.ok) {
            props.setLoggedInUser(credentials.email);
            navigate('/login');
            props.ShowAlert('Password has been updated', "success");
        } else {
            const errorMsg = json.errors && json.errors.length > 0 ? json.errors[0].msg : "Enter valid details";
            props.ShowAlert(errorMsg, "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <h1 className=''>Reset Password</h1>
            <form className="row g-3 my-3" onSubmit={handlesubmit}>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name='email' onChange={onChange} value={credentials.email} autoComplete="off"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Enter New Password</label>
                    <input type="password" className="form-control" id="inputPassword4" name='password' onChange={onChange} value={credentials.password} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default Forgotpass
