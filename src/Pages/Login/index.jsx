import { useContext, useState } from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

=======
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f

const API_URL = "https://devhub.adaptable.app";

function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, SetError] = useState("")

    const navigate = useNavigate();
    //use shared functions provided bt AuthContext 
    const {storeToken, authenticateUser} = useContext(AuthContext)

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody ={email, password, name};

        authService
        .login(requestBody)
        .then((response)=>{
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/')
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                SetError(errorDescription)
            })
    }

    return( 
        <div id='login-box'>
            <h1>Login Page</h1>
            <form onSubmit = {handleLoginSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div>
                    <p><Link to="/signup"> Don't have an account?  </Link></p>
                </div>
                <div>
                    <button type ="submit">Sign Up</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
    
export default LoginPage