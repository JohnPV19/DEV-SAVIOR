import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import './index.css';

const API_URL = "https://devhub.adaptable.app";



function ProfilePage() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {_id} = useParams();
    const [user, setUser] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');
    useEffect(()=>{
        axios
        .get(`${API_URL}/api/profile/${_id}/user`)
        .then((response)=> {
            if (response.data.avatar) {
                const bufferData = response.data.avatar.data;
                const uint8Array = new Uint8Array(bufferData);
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                const imageUrl = `data:image/jpeg;base64,${base64String}`;
                setAvatarUrl(imageUrl);
                setUser(response.data)
                console.log("userData:", user)
                console.log(response.data)
              }
            })
        .catch((error)=>console.log(error))
    }, [_id])
    useEffect(() => {
        // Log user state after it's updated
        console.log('User Data:', user);
      }, [user]); // Add a separate useEffect for logging when user state changes
      return (
        <div className="profile-container">
          <div className="profile-image">
            {!user.avatar && <p>Show us your face</p>}
            {user.avatar && <img src={avatarUrl} alt="User Avatar" style={{ width: '100px', height: 'auto' }} />}
          </div>
          <div className="profile-details">
            <div>
              <h4>Username:</h4>
              <p>{user.username}</p>
            </div>
            <div>
              <h4>E-mail:</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Name:</h4>
              {!user.firstName && <p>Who are you?</p>}
              {user.firstName && user.lastName && <p>{user.firstName} {user.lastName}</p>}
            </div>
            <div>
              <h4>Projects:</h4>
              {!user.createdProjects.length && <p>Add your first project...</p>}
              {user.createdProjects.length > 0 &&
                user.createdProjects.map((project, index) => (
                  <div key={index}>
                    <Link to={`/api/project/${project._id}`}><p>{project.fileName}</p></Link>
                  </div>
                ))}
            </div>
            <div>
              <h4>Skills:</h4>
              {!user.skills.length && <p>Show us your skills</p>}
              {user.skills.length > 0 &&
                user.skills.map((skill, index) => (
                  <div key={index}>
                    <p>{skill}</p>
                  </div>
                ))}
            </div>
            <div>
              <h4>Interests:</h4>
              {!user.interests.length && <p>What are you into?</p>}
              {user.interests.length > 0 &&
                user.interests.map((interest, index) => (
                  <div key={index}>
                    <p>{interest}</p>
                  </div>
                ))}
            </div>
            <div>
              <h4>Your Posts:</h4>
              {!user.createdPosts.length && <p>You haven't created any posts</p>}
              {user.createdPosts.length > 0 &&
                user.createdPosts.map((post, index) => (
                  <div key={index}>
                    <Link to={`/api/posts/${post._id}`}><p>{post.title}</p></Link>
                  </div>
                ))}
            </div>
            <div>
              <a href={`/profile/${_id}/edit`}><button>Edit Profile</button></a>
            </div>
          </div>
        </div>
      );
    }
export default ProfilePage