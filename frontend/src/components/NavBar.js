import React from "react";
import { Link } from "react-router-dom";
import '../css/NavBar.css'

const NavBar = props => (
    <div className='NavBar'>
       <div className = 'nav-container'>
            <div className='nav-bar-logo'>Kookr Logo</div>
            <div className='nav-link-container'>
                <Link className='nav-link' to='/create'>Create</Link>
                <Link className='nav-link' to="/recipes">Recipes</Link>
                <Link className='nav-link' to="/grocery-list">Grocery List</Link>
                <Link className='nav-link' to='/calendar'>Calendar</Link>
                <Link className='nav-link' to="/settings">Settings</Link>
                <Link className='nav-link' to="/billing">Billing</Link>
            </div>
        </div>        
    </div>
);

export default NavBar;