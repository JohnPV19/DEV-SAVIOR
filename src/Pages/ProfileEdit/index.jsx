import React, { useContext } from 'react';
import axios from 'axios'
<<<<<<< HEAD
import { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useDropzone } from 'react-dropzone';

const API_URL = "http://localhost:5005";

function ProfileEdit() {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext); 
    const {_id} = useParams();

    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [projectsName, setProjectsName] = useState([]);

    const [tags, setTags] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [file, setFile] = useState([]);


    useEffect(()=>{
      axios
      .get(`${API_URL}/api/profile/${_id}/user`)
      .then((response) => {
        setUserData(response.data);
        setEmail(response.data.email || '');
        setFirstName(response.data.firstName || '');
        setLastName(response.data.lastName || '');
        setAvatar(response.data.avatar || '');
        setDataLoaded(true);
            console.log("TESTE:" , response.data)
            if (response.data.skills) {
              const initialSelectedSkills = response.data.skills.map((skill) => {
                  return options.find((option) => option.label === skill);
              });
              setSelectedSkills(initialSelectedSkills);
          } else {
              setSelectedSkills([]); // Initialize as an empty array if there are no skills
          }
          if (response.data.interests) {
              setTags(response.data.interests);
          } else {
              setTags([]);
          }
          setDataLoaded(true);
            })
        .catch((error)=>console.log(error))
    }, [_id])


        // Edit Button
    const handleFormSubmit = () => {

      const formData = new FormData();
        if (file || file.length > 0) {
          formData.append('avatar', file[0].file);
        } else {
          formData.append('avatar', avatar || ''); // Add the existing avatar if no new file is selected
        }
        console.log("formData:", formData)

        const updatedUserData = {
            avatar: formData,
            email: email || userData.email,
            firstName: firstName || userData.firstName,
            lastName: lastName || userData.lastName,
            interests: tags || userData.interests,
            skills: selectedSkills.map((skill) => skill.label) || userData.skills,
        };
        console.log("updatedUserData:", updatedUserData);
        
      
        axios
        .put(`${API_URL}/api/profile/${_id}/edit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            console.log("Profile successfully updated", response.data);
            navigate(`/profile/${_id}`);
          })
          .catch((error) => console.log(error));
      };


        // react-tagsinput   
    const handleChange = newTags => {
        setTags(newTags);
        setInterests(newTags.map((tag) => tag.toLowerCase()))
};
            
        // react-select
const options = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Mongoose', label: 'Mongoose' },
  { value: 'Node.Js', label: 'Node.Js' },
  { value: 'React', label: 'React' },
  { value: 'React.native', label: 'React.native' },
  { value: 'Express.js', label: 'Express.js' },
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'HTML5', label: 'HTML5' },
  { value: 'CSS3', label: 'CSS3' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Git', label: 'Git' },] 

 const handleSelectChange = (selectedValues) => {
    setSelectedSkills(selectedValues);
  };


    // Dropzone
    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the accepted files
      console.log(acceptedFiles);
  
      const previewImageFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
  
      setFile(previewImageFiles); // Store files in the state
      setPreviewImages(previewImageFiles);
    }, []);
    
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
      onDrop,
      multiple: true, // Allow multiple file selection
    });

    const isInvalidType = isDragReject || previewImages.some((image) => !['image/jpeg', 'image/png'].includes(image.file.type));
  


  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} ${isInvalidType ? 'invalid' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {isInvalidType && <p>Only image files are allowed!</p>}
      {previewImages.length > 0 && (
        <div>
          <h4>Accepted Files</h4>
          <ul>
            {previewImages.map((image, index) => (
              <li key={index}>
                <img src={image.preview} alt={`preview ${index}`} style={{ width: '100px', height: 'auto' }} />
              </li>
            ))}
          </ul>
        </div>
      )}
        <div> 
            <h4>E-mail:</h4> 
            <form>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={`${userData.email}`} required /> 
=======
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';
const API_URL = "http://localhost:5005";
function ProfileEdit() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {_id} = useParams();
    const [userData, setUserData] = useState([]);
    useEffect(()=>{
        axios
        .get(`${API_URL}/api/profile/${_id}/user`)
        .then((response)=> {
            setUserData(response.data)
            console.log("TESTE:" , response.data)
            })
        .catch((error)=>console.log(error))
    }, [])
  return (
    <div>
        <div> <img src="" alt="" />
            {!userData.avatar &&
            <p>Show us your face</p>}
            {userData.avatar &&
            <img src={userData.avatar} alt="user_avatar" />
            }
        </div>
        <div>
            <h4>Username:</h4>
            <form>
            <input type="img" value={userData.firstName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${userData.username}`}  />
            </form>
        </div>
        <div>
            <h4>E-mail:</h4>
            <form>
            <input type="img" value={userData.email} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${userData.email}`}  />
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
            </form>
        </div>
        <div>
            <h4>First Name:</h4>
            <form>
<<<<<<< HEAD
            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder={userData.firstName ? userData.firstName : "First Name"}  /> 
=======
            <input type="img" value={userData.firstName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.firstName ? userData.firstName : "First Name"}  />
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
            </form>
        </div>
        <div>
            <h4>Last Name:</h4>
            <form>
<<<<<<< HEAD
            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder={userData.lastName ? userData.lastName : "Last Name"}  /> 
            </form>
        </div>
        
        <div>
            <h4>Skills:</h4>
            {userData.skills && (
          <div>
            <Select
              options={options}
              isMulti
              value={selectedSkills}
              onChange={handleSelectChange}
            />
            <div>
              <p>Selected Skills:</p>
              <ul>
                {selectedSkills.map((skill) => (
                  <li key={skill.value}>{skill.label}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
            <div> 
            <h4>Interests:</h4>
                <TagsInput
                    value={tags}
                    onChange={handleChange}
                    inputProps={{ placeholder: 'Interested in...' }}/>
            </div>
         <div>
                    <p>Selected Tags:</p>
                    <ul>
                        {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                ))}
                </ul>
            </div>
        </div>
        <div>
            <button onClick={handleFormSubmit} disabled={!dataLoaded}>Edit Profile</button>
=======
            <input type="img" value={userData.lastName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.lastName ? userData.lastName : "Last Name"}  />
            </form>
        </div>
        <div>
            <h4>Projects:</h4>
            {!userData.createdProjects &&
            <p>Show us your work</p>}
            {userData.createdProjects &&
            userData.createdProjects.map((project, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={project.fileName} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${project.fileName}`}  />
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Skills:</h4>
            {userData.skills == [] &&
            <p>Add some skills</p>}
            {userData.skills &&
            userData.skills.map((skills, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={skills.skills} onChange={(e)=>setReplyImg(e.target.value)} placeholder={`${skills.skills}`}  />
                    </div>
                )
            })}
            {userData.skills.map((skill, index)=>{
                return(
                    <div key={index}>
                    <input type="text" value={skill.skill} onChange={(e)=>setReplyImg(e.target.value)} placeholder={userData.skill ? userData.skill : "Add some skills"}  />
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Interests:</h4>
            {userData.interests &&
            <p>What are you into?</p>}
            {!userData.interests === "" &&
            userData.interests.map((interest, index)=>{
                return(
                    <div key={index}>
                    <p>{interest}</p>
                    </div>
                )
            })}
        </div>
        <div>
            <h4>Your Posts:</h4>
            {!userData.createdPosts &&
            <p>You haven't created any posts</p>}
            {userData.createdPosts &&
            userData.createdPosts.map((post, index)=>{
                console.log("test" , post.title)
                return(
                    <div key={index}>
                    <Link to={`/api/posts/${post._id}`}><p>{post.title}</p></Link>
                    </div>
                )
            })}
        </div>
        <div>
            <button to="/">Edit Profile</button>
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
        </div>
    </div>
  )
}
<<<<<<< HEAD

=======
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
export default ProfileEdit