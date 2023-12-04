import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "http://localhost:5005";


function NewPost() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 
  
  const [postTitle, setPostTitle] = useState(``);
  const [postBodyText, setPostBodyText] = useState(``);
  const [postImg, setPostImg] = useState(``);


  const handleCreatedPost = (e) =>{
    e.preventDefault()

    const username = authContext.user.username
    console.log(`Creating post of "${username}"...`)  // DEBUGGER

      // Create the new post's object
    const newPost = {
      title: postTitle,
      bodyText: postBodyText,
      img: postImg,
      username: username,
    }

      // Create the new post and save it
      axios
      .post(`${API_URL}/api/posts/new`, newPost)
      .then(()=> {
        console.log(`Post by "${username}" successefully created`) // DEBUGGER
        navigate("/")
      })
      .catch((error) => {console.log({error: "Failed to create post"})})
  };


  return (
    <div>
        <h1>New Post</h1>
        <div>
          <form onSubmit={handleCreatedPost}>
            <div>
              <label>Title: <input type="text" value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} required/> </label>
            </div>
            <div>
              <label>Content: <input type="text" value={postBodyText} onChange={(e)=>setPostBodyText(e.target.value)} required/> </label>
            </div>
            <div>
              <label>Image: <input type="img" value={postImg} onChange={(e)=>setPostImg(e.target.value)}/> </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default NewPost