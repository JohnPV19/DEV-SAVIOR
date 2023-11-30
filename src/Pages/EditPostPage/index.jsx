import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"


const API_URL = "http://localhost:5005";


function EditPost() {

const {_id} = useParams();

const navigate = useNavigate();

const [postToEdit, setPostToEdit] = useState([]);
const [postTitleToEdit, setPostTitleToEdit] = useState("");
const [postTextToEdit, setPostTextToEdit] = useState("");
const [postImgToEdit, setPostImgToEdit] = useState("");

    // Fetches and saves the selected Post's details for updating
useEffect(()=>{
    axios
    .get(`${API_URL}/api/posts/${_id}`)
    .then((response)=>{
      const postData = response.data;
      setPostToEdit(postData);
      setPostTitleToEdit(postData.title);
      setPostTextToEdit(postData.bodyText);
      setPostImgToEdit(postData.img);
    })
    .catch(()=>console.log({error: "Error trying to edit post"}))
}, []);


    // Edits the post when clicking the "Edit Post" button
function handlePostEdit(e){
    e.preventDefault(); 

    // Creates new Post Object with updated properties
    const editedPost = {
        title: postTitleToEdit,
        bodyText:postTextToEdit,
        img: postImgToEdit,
    }
    // Updates and Saves current Post with the previously created Object
    axios
    .put(`${API_URL}/api/posts/edit/${_id}`, editedPost)
    .then((response)=> {
        console.log("Edited post title:" , response.data.title); 
        navigate(`/api/posts/${_id}`)
    })
    .catch((error)=>console.error("Sorry, failed to edit post"))
 };


  return (
    <div>
        <h1>EditPost</h1>
        <div>
          {!postToEdit &&  // Renders error message if clicked Post wasn't found/properly opened
          <div>
            <p>Error trying to edit post</p>
          </div>
          }
          {postToEdit && // Renders clicked Post details
          <div>
            <form onSubmit={handlePostEdit}> 
                <div>
                <label>Title: <input type="text" name="title" value={postTitleToEdit} onChange={(e)=>setPostTitleToEdit(e.target.value)}/></label>
                </div>
                <div>
                <label>Text: <input type="text" name="bodyText" value={postTextToEdit} onChange={(e)=>setPostTextToEdit(e.target.value)}/></label>
                </div>
                <div>
                <label>Image: <input type="text" name="image" value={postImgToEdit} onChange={(e)=>setPostImgToEdit(e.target.value)}/></label>
                </div> 
                <button type="submit">Edit Post</button>
            </form>
          </div>
        }
        </div>
    </div>
  )
}

export default EditPost