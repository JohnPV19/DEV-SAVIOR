import React from 'react'
import axios from 'axios'
import { useEffect, useState, navigate } from 'react'
import { Link, useParams } from "react-router-dom"


const API_URL = "http://localhost:5005";


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
    <div>
        <h1>Projects</h1>
        <h2>All Projects</h2>
        <div> <div></div>
          {projectsList &&
            <div>
              {projectsList.map((projects, index)=>{
                return(
                    <div key={index}>
                        <div>
                            <Link to={`/api/projects/${projects._id}`}>{projects.projectName}</Link>
                        </div>
                        <div>
                            <p>Description: <br />{projects.description}</p>
                        </div>
                        <div>
                            <Link to={`/api/projects/${projects._id}`}>{projects.contributors}</Link>
                        </div>
                    </div>
                )
              })}
            </div>}
        </div>
    </div>
  )
}

export default Projects