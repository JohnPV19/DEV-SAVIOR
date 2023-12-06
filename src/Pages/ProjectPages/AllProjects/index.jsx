import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useParams } from "react-router-dom"
import './index.css';

const API_URL = "https://devhub.adaptable.app";


function Projects() {


  const [projectsList, setProjectsList] = useState([]);


  useEffect(()=>{
    axios
    .get(`${API_URL}/api/projects`)
    .then((response)=>{
      const projectData = response.data;
      console.log(response.data)
      setProjectsList(projectData);
      console.log(projectsList)
    })
    .catch((error)=> console.log(error))
  }, []);


  return (
    <div className="projectsWrapper">
    <div id="projectsContainer">
    <h1 id="projectsTitle">Projects</h1>
    <h2 id="allProjectsTitle">All Projects</h2>
    <div id="projectsListContainer">
      {projectsList &&
        projectsList.map((project, index) => (
          <div key={index} className="projectItem">
            <div className="projectDetails">
              <p>
                <span>Title: </span>
                <Link to={`/api/project/${project._id}`}>{project.fileName}</Link>
              </p>
              <p>
                <span>by: </span>
                <Link to={`/api/project/${project._id}`}>{project.username}</Link>
              </p>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
  )
}

export default Projects