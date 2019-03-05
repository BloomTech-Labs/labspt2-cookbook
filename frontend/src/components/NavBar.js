import React from "react";
import { Link } from "react-router-dom";
import '../css/NavBar.css'

const NavBar = props => (
    <div className='Nav-Bar'>
        <div className='nav-logo-container'>
            <div className='icon-border'>
                <img className='nav-icon' src='https://image.flaticon.com/icons/svg/1530/1530648.svg' alt = 'whisk icon'/>
            </div>  
            <h1 className='nav-logo'>k</h1>
        </div>
        <div className='nav-link-container'>
            <Link className='nav-link' to='/create'>Add Recipe</Link>
            <Link className='nav-link' to="/settings">Settings</Link>
            <Link className='nav-link' to="/billing">Billing</Link>
        </div>
    </div>
);

export default NavBar;