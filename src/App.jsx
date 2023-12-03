import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Homepage'

import Navbar from './Components/NavBar'
import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login';
import NewPost from './Pages/CreatePost'
import ViewPost from './Pages/ViewPost'
import EditPost from './Pages/EditPostPage'
import NewProject from './Pages/ProjectPages/UploadProject'
import ProjectView from './Pages/ProjectPages/ProjecView'
import Projects from './Pages/ProjectPages/ViewProject'
import ProfilePage from './Pages/ProfilePage'

function App() {

  return ( 
     
       <div> 
        <Navbar/>
          <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/signup" element= {<SignUpPage/>}/>
           <Route path="/login" element= {<LoginPage/>}/>
           <Route path="/newpost" element= {<NewPost/>}/> 
           <Route path="/projects" element={<Projects/>}/>
           <Route path="/profile/:_id" element={<ProfilePage/>}/>
           <Route path="/api/projects/upload" element= {<NewProject/>}/>
           <Route path="/api/posts/:_id" element= {<ViewPost/>}/> 
           <Route path="/api/posts/edit/:_id" element= {<EditPost/>}/> 
           <Route path="/api/project/:fileId" element= {<ProjectView/>}/> 
           
        
          </Routes>
       </div>
  )
}

export default App
