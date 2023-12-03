import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const API_URL = "http://localhost:5005";

function ProjectView() {
  const { fileId } = useParams();
  const [projectDetails, setProjectDetails] = useState([]);
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

  return (
    <div>
      <h1>File Viewer</h1>
      {projectDetails &&
      <pre>
        <div>
          <h3>File: </h3> <br />
          <code className="language-javascript">{projectName}</code>
        </div>
        <div>
          <h3>Code: </h3>
          <code className="language-javascript">{projectContent}</code>
        </div>
        <div>
          <h3>Date uploaded: </h3>
          <code className="language-javascript">{projectSaveDate}</code>
        </div>
    </pre>
      }
      
    </div>
  );
}

export default ProjectView;
