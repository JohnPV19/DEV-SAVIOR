import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '/src/Pages/ProjectPages/ProjecView/index.css';


const API_URL = "http://localhost:5005";

function ProjectView() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const getLanguageClass = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const languageMap = {
      // Javascript and React related files
      js: 'language-javascript',
        'package.json': 'language-json',
        'package-lock.json': 'language-json',
      jsx: 'language-jsx',
      css: 'language-css',
      html: 'language-html',
      json: 'language-json',
      ejs: 'language-html',
      pug: 'language-pug',
      md: 'language-markdown',
      scss: 'language-scss',
      sass: 'language-sass',
      less: 'language-less',
      gitignore: 'language-git',
      Dockerfile: 'language-dockerfile',
        'docker-compose.yml': 'language-yaml',
      // Other Languages files
      py: 'language-python',  // Python
      java: 'language-java',  // Java
      cs: 'language-csharp',  // C#
      cpp: 'language-cpp',  // C++
      h: 'language-cpp', 
      php: 'language-php',  // PHP
      ts: 'language-typescript',  // TypeScript
      tsx: 'language-tsx',
  };
    return languageMap[fileExtension] || 'language-text';
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects/${_id}`)
      .then((response) => {
        const projectData = response.data;
        setProjectDetails(projectData);
      })
      .catch((error) => console.log(error));
  }, [_id]);
  
  const handleDeleteButton =()=>{
    // Show a confirmation window
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      // If the user says "Yes":
    if (isConfirmed){
      axios
    .delete(`${API_URL}/api/projects/${_id}`)
    .then(()=>{
      console.log("Post deleted!" ); 
        navigate(`/projects`)
    })
    .catch((error)=> console.log("Failed to delete post", error));
    } 
      // If the user says "No":
    else {
      console.log("Deletion canceled");
    }
    
  };



  return (
    <div id="fileViewerContainer">
  <h1>File Viewer</h1>
  {projectDetails && (
    <div id="fileDetails">
      <h3 style={{ color: 'blue' }}>File:</h3>
      <SyntaxHighlighter language="plaintext" style={okaidia}>
        {projectDetails.fileName}
      </SyntaxHighlighter>
      <h3 style={{ color: 'blue' }}>Code:</h3>
      <SyntaxHighlighter
        language={getLanguageClass(projectDetails.fileName)}
        style={okaidia}
        PreTag="div"
        CodeTag="div"
        customStyle={{
          backgroundColor: 'black', // Background color of the code block
          padding: '10px',
        }}
      >
        {projectDetails.content}
      </SyntaxHighlighter>
      <h3 style={{ color: 'green' }}>Date uploaded:</h3>
      <SyntaxHighlighter language="plaintext" style={okaidia}>
        {projectDetails.saveDate}
      </SyntaxHighlighter>
      <p>Author: <a href="/">{projectDetails.username}</a></p>
      <button onClick={handleDeleteButton}>Delete</button>
    </div>
  )}
</div>
  );
}
export default ProjectView;
