import '/src/Components/Navbar/index.css'
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar';


export default function Navbar(){
    const handleSearch = (searchTerm) => {
        // Handle the search logic in the Navbar component
        console.log('Search term in Navbar:', searchTerm);
        // You can perform other actions with the search term here
      };

    return (
        <nav>
            <div id="inner-nav">
                <div id="nav-links">
                    <Link to="/"> Home </Link>
                    <Link to="/newpost"> New Post </Link>
                    <Link to="/api/projects/upload"> NewProjects </Link>
                    <Link to="/projects"> Projects </Link>
                    <Link to="/login"> Login </Link>
                    <Link to="/signup"> SignUp </Link>
                    <Link to="/projects"> Projects </Link>
                    <Link to="/profile/:_id"> Profile </Link>
                    <SearchBar onSearch={handleSearch}/>
                </div>
            </div>
        </nav>
    )
}