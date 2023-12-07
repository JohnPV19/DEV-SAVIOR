import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../Context/auth.context';
<<<<<<< HEAD
import React, {useContext} from 'react';

const API_URL = "http://localhost:5005";
=======
import './index.css';
const API_URL = "https://devhub.adaptable.app";
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
function ViewPost() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isLoggedIn;
<<<<<<< HEAD

=======
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
  const {_id} = useParams();
  const [clickedPost, setClickedPost] = useState([]);
  const [clickedPostTitle, setClickedPostTitle] = useState("");
  const [clickedPostText, setClickedPostText] = useState("");
  const [clickedPostImg, setClickedPostImg] = useState("");
  const [clickedPostUser, setClickedPostUser] = useState("");
  const [clickedPostComments, setClickedPostComments] = useState([]);
    // Post Replies
  const [replyText, setReplyText] = useState("");
  const [replyImg, setReplyImg] = useState("");
    // Fetches and saves clicked Post properties from the Homepage
<<<<<<< HEAD
  const updateComments = () => {
=======
    const updateComments = () => {
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
      axios
        .get(`${API_URL}/api/posts/${_id}`)
        .then((response) => {
          const postData = response.data;
          setClickedPost(postData);
          setClickedPostTitle(postData.title);
          setClickedPostText(postData.bodyText);
          setClickedPostImg(postData.img);
          setClickedPostUser(postData.username);
          setClickedPostComments(postData.comments);
          console.log(`Viewing post of "${postData.username}"`); // DEBUGGER
        })
        .catch(() => console.log({ error: "Failed to fetch specified post" }));
    };
<<<<<<< HEAD
    // useEffect to trigger the fetching of the post data based on _id
    useEffect(() => {
      updateComments();
    }, [_id, clickedPostComments.length]);
=======
    
    // useEffect to trigger the fetching of the post data based on _id
    useEffect(() => {
      updateComments();
    }, [_id,clickedPostComments.length]);
   

>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
    // Navigates to Edit Post page
  const handleEditNavigate =()=>{
    navigate(`/api/posts/edit/${_id}`);
  };
    // Deletes post
  const handleDeleteButton =()=>{
    // Shows a confirmation window
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      // If the user says "Yes":
    if (isConfirmed){
      axios
    .delete(`${API_URL}/api/posts/${_id}`)
    .then(()=>{
      console.log("Post deleted!" );
        navigate(`/`)
    })
    .catch((error)=> console.log("Failed to delete post", error));}
      // If the user says "No":
    else {
      console.log("Deletion canceled");}
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
    console.log("NewComment:", newComment)
      // Create the new reply and save it
<<<<<<< HEAD
    axios
      .post(`${API_URL}/api/posts/${_id}/comment/new`, newComment)
      .then((response)=> {
        console.log("response:", response)
        const postData = response.data
        console.log("latest post:", postData)
        const postsData = [...clickedPostComments]
        console.log("Posts copy:", postsData)
        setClickedPostComments([...clickedPostComments, postData])
        console.log("[...clickedPostComments, postData]", clickedPostComments)
        console.log(`Comment by "${username}" successefully created`) // DEBUGGER
        console.log("All comments:", clickedPostComments)
        //navigate(`/`)
      })
      .catch((error) => {console.log({error: "Failed to create post"})})
  };
=======
      axios
    .post(`${API_URL}/api/posts/${_id}/comment/new`, newComment)
    .then((response) => {
      console.log("Response:", response);
      const postData = response.data;
      console.log("New comment:", postData);

      // Update the state with the new comment
      setClickedPostComments((prevComments) => [...prevComments, postData]);
      console.log(`Comment by "${username}" successfully created`);
    })
    .catch((error) => {
      console.log({ error: "Failed to create post" });
    });
};
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f

  const handleLoggedOutClick = (e) =>{
        navigate(`/login`)
  }
<<<<<<< HEAD

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
            {isAuthenticated ? (<>
=======
  return (
    <div id="viewPostContainer">
  <h1>ViewPost</h1>
  <div id="postDetails">
    {!clickedPost && (
      <div id="errorMessage">
        <p>Sorry, we couldn't fetch that specific post</p>
      </div>
    )}
    {clickedPost && (
      <div id="postContent">
        <p>Title: {clickedPostTitle}</p>
        <p>Text: {clickedPostText}</p>
        <p>Image: {clickedPostImg}</p>
        {isAuthenticated ? (<>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
              <p>Author: <Link to="">{clickedPostUser}</Link></p></>):(<>
              <p>Author: <Link to="/login">{clickedPostUser}</Link></p></>)}
              {isAuthenticated ? (<>
                <button onClick={handleEditNavigate}>Edit</button>
                <button onClick={handleDeleteButton}>Delete</button></>):(<>
                <button onClick={handleLoggedOutClick}>Edit</button>
                <button onClick={handleLoggedOutClick}>Delete</button></>)}
<<<<<<< HEAD
            
          </div>
        }
=======
      </div>
    )}
  </div>
  <div id="repliesContainer">
    <h2>Replies</h2>
    <div id="comments">
      {clickedPostComments.length === 0 && (
        <div id="noComments">
          <p>Be the first to comment this</p>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
        </div>
      )}
      {clickedPostComments.length > 0 && (
        <div>
<<<<<<< HEAD
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
                    {isAuthenticated ? (<>
                    <p>replied by "<a href="">{post.username}</a></p></>):(<>
                      <p>replied by "<a href="/login">{post.username}</a></p></>)}
                    
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
            {isAuthenticated ? (<>
              <button onClick={handleReplySubmit}>Submit</button></>):(<>
                <button onClick={handleLoggedOutClick}>Submit</button></>)}
            </div>
          </form>
=======
          {clickedPostComments.map((post, index) => {
            return (
              <div key={index} className="commentItem">
                <p>{post.content}</p>
                <p>{post.img}</p>
                {isAuthenticated ? (<>
                    <p>replied by "<a href="">{post.username}</a></p></>):(<>
                      <p>replied by "<a href="/login">{post.username}</a></p></>)}
              </div>
            );
          })}
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
        </div>
      )}
    </div>
  </div>
  <h4>Reply</h4>
  <div id="replyForm">
    <form>
      <div>
        <label>
          Text:{" "}
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Image:{" "}
          <input
            type="img"
            value={replyImg}
            onChange={(e) => setReplyImg(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
      {isAuthenticated ? (<>
              <button onClick={handleReplySubmit}>Submit</button></>):(<>
                <button onClick={handleLoggedOutClick}>Submit</button></>)}
      </div>
    </form>
  </div>
</div>
  )
}
export default ViewPost