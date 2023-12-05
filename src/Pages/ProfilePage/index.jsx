import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import '/src/Pages/ProfilePage/index.css';

const API_URL = "http://localhost:5005";

function ProfilePage() {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {_id} = useParams();
    const [userData, setUserData] = useState([]);
    useEffect(()=>{
        axios
        .get(`${API_URL}/profile/${_id}/user`)
        .then((response)=> {
            setUserData(response.data)
            console.log("TESTE:" , response.data)
            })
        .catch((error)=>console.log(error))
    }, [])

  return (
    <div className="profile-container">
    <div className="profile-image">
        <img src="" alt="your_profile_picture" />
    </div>
    <div className="profile-details">
        <div>
            <h4>Username:</h4>
            <p>{userData.username}</p>
        </div>
        <div>
            <h4>E-mail:</h4>
            <p>{userData.email}</p>
        </div>
        <div>
            <h4>Projects:</h4>
            <p>user_projects</p>
        </div>
        <div>
            <h4>Skills:</h4>
            <ul>
                <li>Javscript</li>
                <li>React...</li>
            </ul>
        </div>
        <div>
            <h4>Interests:</h4>
            <p>user_interests</p>
        </div>
    </div>
</div>
  )
}

export default ProfilePage