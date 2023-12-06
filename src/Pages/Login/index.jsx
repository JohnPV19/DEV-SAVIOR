import { useContext, useState } from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';
import '/src/Pages/Login/index.css';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

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

        axios.post(`${API_URL}/auth/login`,requestBody)
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