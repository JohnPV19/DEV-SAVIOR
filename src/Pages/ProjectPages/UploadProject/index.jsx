import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../Context/auth.context';

const API_URL = "http://localhost:5005";


function NewProject() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext); 

  const handleFileUpload = async (acceptedFiles) => {
    const username = authContext.user.username
    console.log(`Creating project of "${username}"...`)  // DEBUGGER
    console.log('Accepted Files:', acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
  
      // Read file content (this is just an example, you may need to adjust based on file type)
      const content = await file.text();
  
      // Send relevant information to the server
      const response = await axios.post(`${API_URL}/api/projects/upload`, {
        fileName: file.name,
        content,
        username: username,
      });

      const savedProject = response.data;

    // Now you can navigate or perform other actions
    navigate(`/api/project/${savedProject._id}`);
  }
};


  return (
    <div>
        <h1>New Project</h1>
        <div>
        <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' Drop some files here</p>
            </div>
          </section>
        )}
      </Dropzone>
        </div>
    </div>
  )
}

export default NewProject