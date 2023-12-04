import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';

function ProfilePage() {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext); 

    const {username, email} = authContext.user

  return (
    <div>
        <div>
            <img src="" alt="your_profile_picture" />
        </div>
        <div>
            <h4>Username:</h4> 
            <p>{username}</p>
        </div>
        <div> 
            <h4>E-mail:</h4> 
            <p>{email}</p>
        </div>
        <div>
            <h4>Projects:</h4>
            <p>user_projects</p>
        </div>
        <div>
            <h4>Skills:</h4>
            <ul> List of tech skills
                <li>Javscript</li>
                <li>React...</li>
            </ul>
        </div>
        <div>
            <h4>Interests:</h4>
            <p>user_interests</p>
        </div>
    </div>
  )
}

export default ProfilePage