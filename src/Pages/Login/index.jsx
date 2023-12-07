import { useContext, useState } from 'react'; 
import { AuthContext } from '../../Context/auth.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';


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
        <div>
            <h3>Login Page</h3>
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
                    <button type ="submit">Sign Up</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
    
export default LoginPage