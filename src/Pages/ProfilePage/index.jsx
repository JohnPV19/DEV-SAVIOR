import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import './index.css';

const API_URL = "https://devhub.adaptable.app";

const API_URL = "http://localhost:5005";

function ProfilePage() {
    const navigate = useNavigate();
<<<<<<< HEAD
    const authContext = useContext(AuthContext); 
    const {_id} = useParams();

    const [userData, setUserData] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');

=======
    const authContext = useContext(AuthContext);
    const {_id} = useParams();
    const [userData, setUserData] = useState([]);
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
    useEffect(()=>{
        axios
        .get(`${API_URL}/api/profile/${_id}/user`)
        .then((response)=> {
            setUserData(response.data)
<<<<<<< HEAD
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
=======
            console.log("TESTE:" , response.data)
            })
        .catch((error)=>console.log(error))
    }, [])
  return (
    <div>
        <div> <img src="" alt="" />
            {!userData.avatar &&
            <p>Show us your face</p>}
            {userData.avatar &&
            <img src={userData.avatar} alt="user_avatar" />
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
            {!userData.createdProjects &&
            <p>Add your first project...</p>}
            {userData.createdProjects&&
            userData.createdProjects.map((project, index)=>{
                return(
                    <div key={index}>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
                    <Link to={`/api/project/${project._id}`}><p>{project.fileName}</p></Link>
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Skills:</h4>
<<<<<<< HEAD
            {!userData.skills &&
            <p>Show us your skills</p>}
            {userData.skills &&
            (userData.skills).map((skill, index)=>{
                return(
                    <div key={index}> 
=======
            {userData.skills &&
            <p>Show us your skills</p>}
            {!userData.skills === "" &&
            userData.skills.map((skill, index)=>{
                return(
                    <div key={index}>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
                    <p>{skill}</p>
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Interests:</h4>
<<<<<<< HEAD
            {!userData.interests &&
            <p>What are you into?</p>}
            {userData.interests &&
            (userData.interests).map((interest, index)=>{
                return(
                    <div key={index}> 
=======
            {userData.interests &&
            <p>What are you into?</p>}
            {!userData.interests === "" &&
            userData.interests.map((interest, index)=>{
                return(
                    <div key={index}>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
                    <p>{interest}</p>
                    </div>
                )
            })}
<<<<<<< HEAD
        </div> 
=======
        </div>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
        <div>
            <h4>Your Posts:</h4>
            {!userData.createdPosts &&
            <p>You haven't created any posts</p>}
            {userData.createdPosts &&
            userData.createdPosts.map((post, index)=>{
                console.log("test" , post.title)
                return(
<<<<<<< HEAD
                    <div key={index}> 
=======
                    <div key={index}>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
                    <Link to={`/api/posts/${post._id}`}><p>{post.title}</p></Link>
                    </div>
                )
            })}
<<<<<<< HEAD
        </div> 
        <div>
            <a href={`/profile/${_id}/edit`}><button>Edit Profile</button></a>
            
=======
        </div>
        <div>
            <a href={`/profile/${_id}/edit`}><button>Edit Profile</button></a>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
        </div>
    </div>
  )
}
export default ProfilePage