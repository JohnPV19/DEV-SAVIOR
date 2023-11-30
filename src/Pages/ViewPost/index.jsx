import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"


const API_URL = "http://localhost:5005";


function ViewPost() {

  const navigate = useNavigate();

  const {_id} = useParams();

  const [clickedPost, setClickedPost] = useState([]);
  const [clickedPostTitle, setClickedPostTitle] = useState("");
  const [clickedPostText, setClickedPostText] = useState("");
  const [clickedPostImg, setClickedPostImg] = useState("");


    // Fetches and saves clicked Post properties from the Homepage
  useEffect(()=>{
    axios
    .get(`${API_URL}/api/posts/${_id}`)
    .then((response)=>{
      const postData = response.data;
      setClickedPost(postData);
      setClickedPostTitle(postData.title);
      setClickedPostText(postData.bodyText);
      setClickedPostImg(postData.img);
    })
    .catch(()=>console.log({error: "Failed to fetch specified post"}))
  }, [])
 
  
  const handleEditNavigate = () => {
    navigate(`/api/posts/edit/${_id}`);
  };



  return ( 
    <div>
        <h1>ViewPost</h1>
        <div>
          {!clickedPost &&  // Renders error message if clicked Post wasn't found/properly saved
          <div>
            <p>Sorry, we couldn't fetch that specific post</p>
          </div>
          }
          {clickedPost && // Renders clicked Post details
          <div>
            <p>Title: {clickedPostTitle}</p> 
            <p>Text: {clickedPostText}</p>
            <p>Image: {clickedPostImg}</p>
            <button onClick={handleEditNavigate}>Edit</button>
            <button>Delete</button>
          </div>
        }
        </div>
    </div>
  )
}

export default ViewPost