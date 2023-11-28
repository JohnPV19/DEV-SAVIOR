import '/src/Components/Navbar/index.css'
import { Link } from "react-router-dom";

export default function Navbar(){

    return (
        <nav>
            <div id="inner-nav">
                <div id="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/newpost">New Post</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signuppage">SignUp</Link>
                </div>
            </div>
        </nav>
    )
}