import axios from 'axios';
import { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";

const API_URL = "https://devhub.adaptable.app";

function SignUpPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setName] = useState("")
    const [error, SetError] = useState("")

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        // prevent default actions of the form submission e.g.: refreshing the page
        e.preventDefault();


        // Create a request body object
        const requestBody ={email, password, username};

        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then(()=>{
                navigate('/login');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                SetError(errorDescription)
            })
    }



    return (
        <div id="signup-box">
          <h1>SignUp Page</h1>
          <form onSubmit={handleLoginSubmit}>
            <div id="email-field">
              <label>Email:</label>
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div id="password-field">
              <label>Password:</label>
              <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div id="username-field">
              <label>Username:</label>
              <input type="text" name="username" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <Link to="/login"> Already have an account? </Link>
            </div>
            <div id="submit-button">
              <button type="submit">Sign Up</button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      );
    }
export default SignUpPage