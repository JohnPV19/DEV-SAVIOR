import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const API_URL = "http://localhost:5005";


function ProjectView() {
  const { fileId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  const [projectName, setProjectName] = useState([]);
  const [projectContent, setProjectContent] = useState([]);
  const [projectSaveDate, setProjectSaveDate] = useState([]);
  const [, setForceUpdate] = useState(false);

  useEffect(() => { 
    let isMounted = true;

    axios
      .get(`${API_URL}/api/projects/${fileId}`)
      .then((response) => {
        const projectData = response.data;
        setProjectDetails(projectData);
        setProjectName(projectData.fileName);
        setProjectContent(projectData.content);
        setProjectSaveDate(projectData.saveDate);
        Prism.highlightAll();
        setForceUpdate((prev) => !prev);
      })
      .catch((error) => console.log(error));

      return () => {
        isMounted = false;
      };
  }, [fileId]);


  const getLanguageClass = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Map file extensions to Prism language classes
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
      h: 'language-cpp', // Assuming header files are associated with C++ code
      php: 'language-php',  // PHP
      ts: 'language-typescript',  // TypeScript
      tsx: 'language-tsx', 
    };

    // Use the mapped language class or default to 'language-text'
    return languageMap[fileExtension] || 'language-text';
  };



  return (
    <div>
      <h1>File Viewer</h1>
      {projectDetails &&
      <pre>
        <div>
        <h3>File: </h3> <br />
            <code className={getLanguageClass(projectDetails.fileName)}>
              {projectDetails.fileName}
            </code>
        </div>
        <div>
        <h3>Code: </h3>
            <code
              className={getLanguageClass(projectDetails.fileName)}
              dangerouslySetInnerHTML={{ __html: projectDetails.content }}
            />
        </div>
        <div>
        <h3>Date uploaded: </h3>
            <code className="language-javascript">{projectDetails.saveDate}</code>
        </div>
    </pre>
      }
      
    </div>
  );
}

export default ProjectView;
