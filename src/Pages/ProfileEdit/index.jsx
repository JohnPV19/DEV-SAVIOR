import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
const API_URL = "http://localhost:5005";
function ProfileEdit() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {_id} = useParams();
    const [userData, setUserData] = useState([]);
    useEffect(()=>{
        axios
        .get(`${API_URL}/api/profile/${_id}/user`)
        .then((response)=> {
            setUserData(response.data)
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
            <form>
            <input type="img" value={userData.firstName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${userData.username}`}  />
            </form>
        </div>
        <div>
            <h4>E-mail:</h4>
            <form>
            <input type="img" value={userData.email} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${userData.email}`}  />
            </form>
        </div>
        <div>
            <h4>First Name:</h4>
            <form>
            <input type="img" value={userData.firstName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.firstName ? userData.firstName : "First Name"}  />
            </form>
        </div>
        <div>
            <h4>Last Name:</h4>
            <form>
            <input type="img" value={userData.lastName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.lastName ? userData.lastName : "Last Name"}  />
            </form>
        </div>
        <div>
            <h4>Projects:</h4>
            {!userData.createdProjects &&
            <p>Show us your work</p>}
            {userData.createdProjects &&
            userData.createdProjects.map((project, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={project.fileName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${project.fileName}`}  />
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Skills:</h4>
            {userData.skills == [] &&
            <p>Add some skills</p>}
            {userData.skills &&
            userData.skills.map((skills, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={skills.skills} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${skills.skills}`}  />
                    </div>
                )
            })}
            {userData.skills.map((skill, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={skill.skill} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.skill ? userData.skill : "Add some skills"}  />
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Interests:</h4>
            {userData.interests &&
            <p>What are you into?</p>}
            {!userData.interests === "" &&
            userData.interests.map((interest, index)=>{
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
            <button to="/">Edit Profile</button>
        </div>
    </div>
  )
}
export default ProfileEdit