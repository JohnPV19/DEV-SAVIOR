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
                    <h2>Logo</h2>
                </div>
                <div id="nav-links">
                    <div id="left-links">
                        <div><Link to="/"> Home </Link></div>
                        {isAuthenticated ? (
                            <>
                                <div><Link to="/newpost"> New Post </Link></div>
                                <div><Link to="/api/projects/upload"> New Projects </Link></div>
                            </>
                        ) : (
                            <>
                                <div><Link to="/login"> New Post </Link></div>
                                <div><Link to="/login"> New Projects </Link></div>
                            </>
                        )}
                    
                    
                        {isAuthenticated ? (
                            <>
                                <div><Link to="/projects"> Projects </Link></div>
                                <div><Link to={`/profile/${_id}`}> Profile </Link></div>
                                <div><Link onClick={handleLogOut} to="/"> Log Out </Link></div>
                            </>
                        ) : (
                            <>
                                <div><Link to="/login"> Projects </Link></div>
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
