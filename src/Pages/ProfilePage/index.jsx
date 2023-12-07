import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "http://localhost:5005";

function ProfilePage() {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext); 
    const {_id} = useParams();

    const [userData, setUserData] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(()=>{
        axios
        .get(`${API_URL}/api/profile/${_id}/user`)
        .then((response)=> {
            setUserData(response.data)
            if (response.data.avatar) {
                const bufferData = response.data.avatar.data;
                const uint8Array = new Uint8Array(bufferData);
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                const imageUrl = `data:image/jpeg;base64,${base64String}`;
                setAvatarUrl(imageUrl);
                console.log("userData:", userData)
              }
            })
        .catch((error)=>console.log(error))
    }, [_id])


  return (
    <div>
        <div>
            {!userData.avatar &&
            <p>Show us your face</p>}
            {userData.avatar &&
            <img src={avatarUrl}  style={{ width: '100px', height: 'auto' }}/>
            }
        </div>
        <div>
            <h4>Username:</h4> 
            <p>{userData.username}</p>
        </div>
        <div> 
            <h4>E-mail:</h4> 
            <p>{userData.email}</p>
        </div>
        <div>
            <h4>Name:</h4>
            {!userData.firstName &&
            <p>Who are you?</p>}
            {userData.lastName &&
            <p>{userData.firstName} {userData.lastName}</p>
            }
        </div>
        <div> 
            <h4>Projects:</h4> 
            {userData.createdProjects == [] && 
            <p>Add your first project...</p>}
            {userData.createdProjects && 
            userData.createdProjects.map((project, index)=>{
                return(
                    <div key={index}> 
                    <Link to={`/api/project/${project._id}`}><p>{project.fileName}</p></Link>
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Skills:</h4>
            {!userData.skills &&
            <p>Show us your skills</p>}
            {userData.skills &&
            (userData.skills).map((skill, index)=>{
                return(
                    <div key={index}> 
                    <p>{skill}</p>
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Interests:</h4>
            {!userData.interests &&
            <p>What are you into?</p>}
            {userData.interests &&
            (userData.interests).map((interest, index)=>{
                return(
                    <div key={index}> 
                    <p>{interest}</p>
                    </div>
                )
            })}
        </div> 
        <div>
            <h4>Your Posts:</h4>
            {!userData.createdPosts &&
            <p>You haven't created any posts</p>}
            {userData.createdPosts &&
            userData.createdPosts.map((post, index)=>{
                console.log("test" , post.title)
                return(
                    <div key={index}> 
                    <Link to={`/api/posts/${post._id}`}><p>{post.title}</p></Link>
                    </div>
                )
            })}
        </div> 
        <div>
            <a href={`/profile/${_id}/edit`}><button>Edit Profile</button></a>
            
        </div>
    </div>
  )
}

export default ProfilePage