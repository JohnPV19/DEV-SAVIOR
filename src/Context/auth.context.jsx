import React,{ useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

export const AuthContext = React.createContext();

export function AuthProviderWrapper(props){
    const[isLoggedin, setIsLoggedin] = useState(false)
    const[isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    /* Store the token in the local storage */
    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    /* Authenticate the User via JWT */
    const authenticateUser =() =>{
        //Get the stored token from the local storage
        const storedToken = localStorage.getItem
        ('authToken');

        if(storedToken){
            axios.get(`${API_URL}/auth/veify`, {Authorization: `Bearer ${storeToken}`})
            .then ((response)=>{
                const user = response.data
                setIsLoggedin(true)
                setIsLoading(false)
                setUser(user);
            })
            .catch((error)=>{
                setIsLoggedin(false)
                setIsLoading(true)
                setUser(null);
            })
        }
        else{
            setIsLoggedin(false)
            setIsLoading(true)
            setUser(null);

        }
    }

    const removeToken = () =>{
        localStorage.removeItem('authToken');

    }
    const logOut = ()=>{
        removeToken();
        authenticateUser();
    }
    useEffect(()=>{
        authenticateUser();
    },[]);
    
    return(
        <AuthContext.Provider value = {{
            isLoggedin, isLoading, user, 
            storeToken, authenticateUser, logOut}}> 
            {props.children}
        </AuthContext.Provider>
    )

}
