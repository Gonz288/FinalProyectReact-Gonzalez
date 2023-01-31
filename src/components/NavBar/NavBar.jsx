import "./navbar.css";
import "./CartWidget";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Search from "../Search/Search";
import { userContext } from "../../storage/userContext";
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function NavBar(){
    const context = useContext(userContext);
    
    function logOutSession(){
        context.setUserSession(null);
        context.setLogedinSession(false);
        Toast.fire({
            icon: 'success',
            title: `Session Closed, see you later!`
        });
    }
    function logInSession(){
        let usernameInput = document.getElementById("user").value;
        let username = usernameInput.trim();
        if(username){
            context.setUserSession(username);
            context.setLogedinSession(true);
            Toast.fire({
                icon: 'success',
                title: `Welcome ${username} to E-commerce`
            });
        }else{
            Toast.fire({
                icon: 'error',
                title: `Please, Enter a valid Name.`
            });
        }
    }   

    return (
        <header className="header-menu">
            <div className="container-lg">
                <nav className="navbar navbar-expand-lg navbar-dark p-0">
                    <ul className="nav nav-list">
                        <li className="nav-item">
                            <Link to="/home" className="navbar-brand"><img src="/img/cart-logo.png" height="50px" alt="Logo" /> <h4 className="fst-italic logo">E-commerce</h4></Link>
                        </li>
                        <div className="input-group mx-auto">
                            <span className="input-group-text lupe"><i className="bi bi-search"></i></span>
                            <input className="form-control" type="search" autoComplete="off" placeholder="Search" aria-label="Search" id="input-search" data-bs-toggle="dropdown" aria-expanded="false"/>
                            <button className="btn rounded btn-search text-black">Search</button>
                            
                            <div className="box-search dropdown-menu" id="box-search">
                                <Search></Search>
                            </div>
                        </div>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-black"><CartWidget/></Link>
                        </li>
                    </ul>
                </nav>
                <nav className="nav justify-content-center">
                    <li className="nav-item dropdown">
                        <button className="btn dropdown-toggle dropdown-categories text-dark fw-semibold" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><Link to="/category/clothing" className="dropdown-item fw-semibold">Clothing</Link></li>
                            <li><Link to="/category/technology" className="dropdown-item fw-semibold">Technology</Link></li>
                            <li><Link to="/category/supermarket" className="dropdown-item fw-semibold">SuperMarket</Link></li>
                        </ul>
                    </li>
                    <Link to="/category/clothing" className="nav-link text-dark category-link fw-semibold">Clothing</Link>
                    <Link to="/category/technology" className="nav-link text-black category-link fw-semibold">Technology</Link>
                    <Link to="/category/supermarket" className="nav-link text-black category-link fw-semibold">SuperMarket</Link>
                    {context.logedin ? (
                        <>
                            <li className="nav-link text-black"><b>User: {context.user} </b></li>
                            <button type="button" className="btn btn-logout text-black" onClick={logOutSession}>Logout</button>
                        </>
                        ):(
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> <i className="bi bi-person-circle"></i> Log In</button>
                        )
                    }
                </nav>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog text-black">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Log In</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="user" className="col-form-label">Username:</label>
                            <input type="text" className="form-control" id="user" name="user"/>
                        </div>
                    </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={logInSession} data-bs-dismiss="modal">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;