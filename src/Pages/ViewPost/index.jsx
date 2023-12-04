import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../Context/auth.context'
const API_URL = "http://localhost:5005";
function ViewPost() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {_id} = useParams();
    // Selected Post properties
  const [clickedPost, setClickedPost] = useState([]);
  const [clickedPostTitle, setClickedPostTitle] = useState("");
  const [clickedPostText, setClickedPostText] = useState("");
  const [clickedPostImg, setClickedPostImg] = useState("");
  const [clickedPostUser, setClickedPostUser] = useState("");
  const [clickedPostComments, setClickedPostComments] = useState([]);
    // Post Replies
  const [replyText, setReplyText] = useState("");
  const [replyImg, setReplyImg] = useState("");
  const [lastPost, setLastPost] = useState([]);
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
      setClickedPostUser(postData.username);
      setClickedPostComments(postData.comments);
      console.log(`Viewing post of "${postData.username}"`) // DEBUGGER
    })
    .catch(()=>console.log({error: "Failed to fetch specified post"}))
  }, [])
    // Navigates to Edit Post page
  const handleEditNavigate =()=>{
    navigate(`/api/posts/edit/${_id}`);
  };
    // Deletes post
  const handleDeleteButton =()=>{
    // Show a confirmation window
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      // If the user says "Yes":
    if (isConfirmed){
      axios
    .delete(`${API_URL}/api/posts/${_id}`)
    .then(()=>{
      console.log("Post deleted!" );
        navigate(`/`)
    })
    .catch((error)=> console.log("Failed to delete post", error));
    }
      // If the user says "No":
    else {
      console.log("Deletion canceled");
    }
  };
      // Submits and saves new Post Reply
  const handleReplySubmit = (e) =>{
    e.preventDefault()
    const username = authContext.user.username
    console.log(`Creating reply of "${username}"...`)  // DEBUGGER
      // Create the new reply's object
    const newComment = {
      content: replyText,
      img: replyImg,
      username: username,
    }
      // Create the new reply and save it
      axios
      .post(`${API_URL}/api/comment/new`, newComment)
      .then((response)=> {
        const postData = response.data
        console.log("latest post:", postData)
        setLastPost(postData)
        const postsData = [...clickedPostComments]
        console.log("Posts copy:", postsData)
        setClickedPostComments([...postsData, lastPost])
        console.log(`Comment by "${username}" successefully created`) // DEBUGGER
        console.log("All comments:", clickedPostComments)
        //navigate(`/`)
      })
      .catch((error) => {console.log({error: "Failed to create post"})})
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
            <p>Author: <Link to="">{clickedPostUser}</Link></p>
            <button onClick={handleEditNavigate}>Edit</button>
            <button onClick={handleDeleteButton}>Delete</button>
          </div>
        }
        </div>
        <div>
          <h2>Replies</h2>
          <div>
            {clickedPostComments.length === 0 &&
             <div>
              <p>Be the first to comment this</p></div>}
            {clickedPostComments.length > 0 &&
            <div>
              {clickedPostComments.map((post, index)=>{
                return(
                  <div key={index}>
                    <p>{post.content}</p>
                    <p>{post.img}</p>
                    <p>replied by "{post.username}"</p>
                  </div>
                )
              })}
            </div> }
          </div>
        </div>
        <h4>Reply</h4>
        <div>
          <form>
            <div>
              <label>Text: <input type="text" value={replyText} onChange={(e)=>setReplyText(e.target.value)} required /> </label>
            </div>
            <div>
              <label>Image: <input type="img" value={replyImg} onChange={(e)=>setReplyImg(e.target.value)} required /> </label>
            </div>
            <div>
              <button onClick={handleReplySubmit}>Submit</button>
            </div>
          </form>
        </div>
    </div>
  )
}
export default ViewPost