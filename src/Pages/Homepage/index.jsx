import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useParams } from "react-router-dom"
import './index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const API_URL = "https://devhub.adaptable.app";

const renderQuillContent = (content) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

function HomePage() {


  const [postsList, setPostsList] = useState([]);

  useEffect(()=>{
    axios
    .get(`${API_URL}/api/posts`)
    .then((response)=>{
      const postData = response.data;

      setPostsList(postData);
    })
    .catch((error)=> console.log(error))
  }, []);


  return (
    <div id="homepage">
      <h1>Snips</h1>
      <h2>All Posts</h2>
      <div id="postsContainer">
        <div id="postsList">
          {postsList &&
            postsList.map((post, index) => (
              <div className="postBox" key={index}>
                <div className="postTitle">
                  <Link to={`/api/posts/${post._id}`}>{post.title}</Link>
                </div>
                <div className="postText">
                  <Link to={`/api/posts/${post._id}`}>{renderQuillContent(post.bodyText)}</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage