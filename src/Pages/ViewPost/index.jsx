import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../Context/auth.context';
import './index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = "https://devhub.adaptable.app";

const renderQuillContent = (content) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  };
function ViewPost() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isLoggedIn;
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
    const updateComments = () => {
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
    
    // useEffect to trigger the fetching of the post data based on _id
    useEffect(() => {
      updateComments();
    }, [_id,clickedPostComments.length]);
   

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

  const handleLoggedOutClick = (e) =>{
        navigate(`/login`)
  }
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
            {/* Render the ReactQuill content as HTML */}
            <p>Text:</p>
              {renderQuillContent(clickedPostText)}
              {isAuthenticated ? (<>
              <p>Author: <Link to="">{clickedPostUser}</Link></p></>):(<>
              <p>Author: <Link to="/login">{clickedPostUser}</Link></p></>)}
              {isAuthenticated ? (<>
                <button onClick={handleEditNavigate}>Edit</button>
                <button onClick={handleDeleteButton}>Delete</button></>):(<>
                <button onClick={handleLoggedOutClick}>Edit</button>
                <button onClick={handleLoggedOutClick}>Delete</button></>)}

          </div>
        )}
      </div>
      <div id="repliesContainer">
        <h2>Replies</h2>
        <div id="comments">
          {clickedPostComments.length === 0 && (
            <div id="noComments">
              <p>Be the first to comment this</p>
            </div>
          )}
          {clickedPostComments.length > 0 && (
            <div>
              {clickedPostComments.map((post, index) => {
                return (
                  <div key={index} className="commentItem">
                    <p>{post.content}</p>
                    <p>{post.img}</p>
                    {isAuthenticated ? (
                      <p>replied by "<a href="">{post.username}</a></p>
                    ) : (
                      <p>replied by "<a href="/login">{post.username}</a></p>
                    )}
                  </div>
                );
              })}
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
          </div>
          <div>
            {isAuthenticated ? (
              <button onClick={handleReplySubmit}>Submit</button>
            ) : (
              <button onClick={handleLoggedOutClick}>Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ViewPost