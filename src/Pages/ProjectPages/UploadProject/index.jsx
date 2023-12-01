import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';


const API_URL = "http://localhost:5005";



function NewProject() {

  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState(``);
  const [projectDescription, setProjectDescriptiont] = useState(``);
  const [projectFiles, setProjectFiles] = useState(``);
  const [projectContributors, setProjectContributors] = useState(``);


  const handleCreatedPost = (e) =>{
    e.preventDefault()
      // Create the new post's object
    const newProject = {
      projectName: projectTitle,
      description: projectDescription,
      files: projectFiles,
      contributors:projectContributors,
    }

      // Create the new post and save it
      axios
      .post(`${API_URL}/api/projects/upload`, newProject)
      .then(()=> console.log("Project successefully created!")), navigate("/projects")
      .catch((error) => {console.log({error: "Failed to upload project"})})
  };


  return (
    <div>
        <h1>New Project</h1>
        <div>
          <form onSubmit={handleCreatedPost}>
            <div>
              <label>Title: <input type="text" value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)} required/> </label>
            </div>
            <div>
              <label>Content: <input type="text" value={projectDescription} onChange={(e)=>setProjectDescriptiont(e.target.value)} required/> </label>
            </div>
            <div>
              <label>Files: <input type="img" value={projectFiles} onChange={(e)=>setProjectFiles(e.target.value)}/> </label>
            </div>
            <div>
              <label>Contributor: <input type="text" value={projectContributors} onChange={(e)=>setProjectContributors(e.target.value)}/> </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  )
}

export default NewProject