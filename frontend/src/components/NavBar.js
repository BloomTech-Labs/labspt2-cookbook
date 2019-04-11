import React from "react";
import { Link } from "react-router-dom";
import '../css/NavBar.css'

class NavBar extends React.Component{
    constructor(){
        super()
        this.state ={
            mobileMenu :false
        }
    }
    mobileMenuOpen = () =>{
        this.setState({
            mobileMenu : true
        })
    }
    render(){
        return(
            <div className='NavBar'>
            <div className = 'nav-container'>
                 <div className='nav-overlay'>
                     <div className='nav-bar-logo'>Kookr Logo</div>
                     <div className='nav-link-container'>
                         <Link className='nav-link' to='/create'>Create</Link>
                         <Link className='nav-link' to="/recipes">Recipes</Link>
                         <Link className='nav-link' to="/grocery-list">Grocery List</Link>
                         <Link className='nav-link' to='/calendar'>Calendar</Link>
                         <Link className='nav-link' to="/settings">Settings</Link>
                     </div>
                 </div>
                 <div className='nav-break-800'>
                     <div className='nav-hamburger'>
                         <i class="fas fa-bars" id='nav-icon' onClick = {this.mobileMenuOpen}></i>
                     </div>
                     <div className='nav-break-logo'>Kookr Logo</div>
                     <div className= { this.state.mobileMenu ? 'nav-800-open' : 'nav-800-closed'}>
                        <div className='nav-800-sub'>
                             <div className='nav-bar-logo'>Kookr Logo</div>   
                            <Link className='nav-800' to='/create'>Create</Link>
                            <Link className='nav-800' to="/recipes">Recipes</Link>
                            <Link className='nav-800' to="/grocery-list">Grocery List</Link>
                            <Link className='nav-800' to='/calendar'>Calendar</Link>
                            <Link className='nav-800' to="/settings">Settings</Link>
                        </div>     
                     </div>
                 </div>    
             </div>        
         </div>
        )
    }
}


export default NavBar;