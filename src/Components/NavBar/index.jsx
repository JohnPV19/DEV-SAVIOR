import './index.css'
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../../Context/auth.context';
import React, {useContext} from 'react';
import SearchBar from '../SearchBar';
export default function Navbar(){
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isLoggedIn;
    const { _id } = authContext.user || {};
    const handleLogOut = () => {
        authContext.logOut();
      };
    const handleSearch = (searchTerm) => {
        // Handle the search logic in the Navbar component
        console.log('Search term in Navbar:', searchTerm);
        // You can perform other actions with the search term here
      };
      return (
        <nav id="main-nav">
            <ul>
            <div id="inner-nav">
                <div id="logo">
                    <Link to="/">
                    <img src="/images/Snips_logo.png" alt="Snips" width="50px" height="50px" /></Link>
                </div>
                <div id="nav-links">
                    <div id="left-links">
                    
                        {isAuthenticated ? (
                            <>
                                <div><Link to="/newpost"> New Post </Link></div>
                                <div><Link to="/api/projects/upload"> New Snippet </Link></div>
                            </>
                        ) : (
                            <>
                                <div><Link to="/login"> New Post </Link></div>
                                <div><Link to="/login"> New Snippet </Link></div>
                            </>
                        )}
                    
                    
                        {isAuthenticated ? (
                            <>
                                <div><Link to="/projects"> Snippets </Link></div>
                                <div><Link to={`/profile/${_id}`}> Profile </Link></div>
                                <div><Link onClick={handleLogOut} to="/"> Log Out </Link></div>
                            </>
                        ) : (
                            <>
                                <div><Link to="/login"> Snippets </Link></div>
                                <div><Link to="/login"> Profile </Link></div>
                                <div><Link to="/login"> Login </Link></div>
                                <div><Link to="/signup"> SignUp </Link></div>
                            </>
                        )}
                    </div>
                </div>
                <div id="nav-search">
                    <div>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>
            </ul>
        </nav>
    )
}