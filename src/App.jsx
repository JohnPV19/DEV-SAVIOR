import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Homepage'
import Navbar from './Components/NavBar'
import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login';
import NewPost from './Pages/CreatePost'
import ViewPost from './Pages/ViewPost'



function App() {


  return ( 
     
       <div> 
        <Navbar/>
          <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/signup" element= {<SignUpPage/>}/>
           <Route path="/login" element= {<LoginPage/>}/> 
           <Route path="/newpost" element= {<NewPost/>}/> 
           <Route path="/api/posts/:_id" element= {<ViewPost/>}/> 
          </Routes>
       </div>
  )
}

export default App
