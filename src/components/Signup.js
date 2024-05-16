import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup(props) {

  const [credentials, setCredentials] = useState({
    name: "", email: "", password: "", cpassword: ""
  });


  let navigate = useNavigate()
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json)
      props.ShowAlert('Sign in successfully', 'success')

      if (json.success) {
        localStorage.setItem('token', json.authtoken)
        props.setLoggedInUser(email);
        navigate('/home')
        props.ShowAlert('Sign in successfully', 'success')
      } else {
        props.ShowAlert('invalid Credential', 'danger')
      }
    }
    catch (error) {
      console.error("Error during signup:", error);
      props.ShowAlert('enter valid Detail', 'danger')
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="w-100 d-flex align-items-center flex-column">
      <h1>Create an Account</h1>
      <form onSubmit={handlesubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} minLength={5} id="password" required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} minLength={5} id="cpassword" required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p className="text-center">Copyright &copy; 2023-2024 &mdash; MyNoteBook - Already have an account <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup
