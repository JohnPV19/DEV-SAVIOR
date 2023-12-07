import React, { useContext } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
import './index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = "https://devhub.adaptable.app";
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
      comments: [],
      id: authContext.user._id
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
  const handleChange = (value) => {
    setPostBodyText(value);
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'blockquote', 'code-block'],
      [{'header': 1}, {'header': 2}],
      [{'color': []}, {'background': []}],
      [{'font': []}],
      [{'align': []}],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'blockquote', 'code-block',
    'header1', 'header2',
    'color', 'background',
    'font',
    'align',
    'clean',
  ];
  return (
    <div>
      <h1 id="newPostTitle">New Post</h1>
      <div id="postFormContainer">
        <form onSubmit={handleCreatedPost}>
          <div id="postTitleField">
            <label>Title: <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required /> </label>
          </div>
          <div id="postContentField">
            <ReactQuill value={postBodyText} onChange={handleChange} modules={modules} formats={formats} placeholder="Your post here..."/>
            </div>
            <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default NewPost