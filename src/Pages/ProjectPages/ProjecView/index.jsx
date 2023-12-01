import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"


const API_URL = "http://localhost:5005";


function ProjectView() {

  const navigate = useNavigate();

  const {_id} = useParams();

  const [clickedProject, setClickedProject] = useState([]);
  const [clickedProjectTitle, setClickedProjectTitle] = useState("");
  const [clickedProjectDescription, setClickedProjectDescription] = useState("");
  const [clickedProjectFile, setClickedProjectFile] = useState("");


    // Fetches and saves clicked Post properties from the Homepage
  useEffect(()=>{
    axios
    .get(`${API_URL}/api/projects/${_id}`)
    .then((response)=>{
      const projectData = response.data;
      setClickedProject(projectData);
      setClickedProjectTitle(projectData.projectName);
      setClickedProjectDescription(projectData.description);
      setClickedProjectFile(projectData.files);
    })
    .catch(()=>console.log({error: "Failed to fetch specified post"}))
  }, [])
 
  
  const handleEditNavigate =()=>{
    navigate(`/api/projects/edit/${_id}`);
  };

  const handleDeleteButton =()=>{
    // Show a confirmation window
    const isConfirmed = window.confirm("Are you sure you want to delete this project?");
      // If the user says "Yes":
    if (isConfirmed){
      axios
    .delete(`${API_URL}/api/projects/${_id}`)
    .then(()=>{
      console.log("Project deleted!" ); 
        navigate(`/`)
    })
    .catch((error)=> console.log("Failed to delete project", error));
    } 
      // If the user says "No":
    else {
      console.log("Deletion canceled");
    }
    
  };


  return ( 
    <div>
        <h1>Project view</h1>
        <div>
          {!clickedProject &&  // Renders error message if clicked Post wasn't found/properly saved
          <div>
            <p>Sorry, we couldn't fetch that specific project</p>
          </div>
          }
          {clickedProject && // Renders clicked Post details
          <div>
            <p>Title: {clickedProjectTitle}</p> 
            <p>Description: {clickedProjectDescription}</p>
            <p>File: {clickedProjectFile}</p>
            <button onClick={handleEditNavigate}>Edit</button>
            <button onClick={handleDeleteButton}>Delete</button>
          </div>
        }
        </div>
    </div>
  )
}

export default ProjectView