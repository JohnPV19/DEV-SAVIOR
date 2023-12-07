import React, { useContext, } from 'react';
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
            setUser(response.data)
            if (response.data.avatar) {
                const bufferData = response.data.avatar.data;
                const uint8Array = new Uint8Array(bufferData);
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                const imageUrl = `data:image/jpeg;base64,${base64String}`;
                setAvatarUrl(imageUrl);
                setUser(response.data)
                console.log("userData:", user)
                console.log("response.data:", response.data)
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
          <div className="left-section">
                <div className="profile-image">
                     {!user.avatar && <p>Show us your face</p>}
                        {user.avatar && (
                         <img src={avatarUrl} style={{ width: '200px', height: '200px' }} alt="User Avatar" />
                     )}
                </div>


          <div className="profile-details">
              <h3>WELCOME:</h3>
              <h3>{user.username}</h3>
              <div>
                <h4>E-mail:</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Name:</h4>
                <p>{`${user.firstName} ${user.lastName}`}</p>
              </div>
                </div> 
                
                <div>
                <a href={`/profile/${_id}/edit`}>
                  <button>Edit Profile</button>
                </a>
              </div>
        </div>
              <div className='mid-section'>
              <div id="Interests">
                <h4>Interests:</h4>
                <div>
                  {user.interests && user.interests.map((interest, index) => (
                    <p key={index}>{interest}</p>
                  ))}
                  {/* Add other interests here */}
                </div>
              </div>
             
            
          
           <div id="Skills">
                <h4>Skills:</h4>
                <div>
                  {user.skills && user.skills.map((skill, index) => (
                    <p key={index}>{skill}</p>
                  ))}
                  {/* Add other skills here */}
                </div>
              </div>
          </div>
        
          <div className="right-section">
         

            <div id="Projects">
              <h4>Projects:</h4>
              <div>
                <p>No projects available</p>
              </div>
            </div>
            <div id="YourPosts">
              <h4>Your Posts:</h4>
              <div>
                <p>No posts available</p>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    
    export default ProfilePage