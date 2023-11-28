import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Homepage'
import Navbar from './Components/NavBar'
import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login';



function App() {


  return ( 
     
       <div> 
        <Navbar/>
          <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/signuppage" element= {<SignUpPage/>}/>
           <Route path="/login" element= {<LoginPage/>}/>  
          </Routes>
       </div>
  )
}

export default App
