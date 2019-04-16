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
                 <div className = 'nav-logo-container'>
                    <img className = 'nav-logo'src= '../images/logo-white.png'/>
                 </div>
                
                     <div className='nav-link-container'>
                         <Link className='nav-link' to='/create'>Add Recipes</Link>
                         <Link className='nav-link' to="/recipes">Your Recipes</Link>
                         <Link className='nav-link' to="/grocery-list">Grocery List</Link>
                         <Link className='nav-link' to='/calendar'>Calendar</Link>
                         <Link className='nav-link settings-link' to="/settings">User Portal</Link>
                     </div>
                 </div>
                 <div className='nav-break-800'>
                     <div className='nav-hamburger'>
                         <i class="fas fa-bars" id='nav-icon' onClick = {this.mobileMenuOpen}></i>
                     </div>
                     <div className='nav-break-logo-container'>
                        <img className = 'nav-break-logo'src= '../images/logo.png'/>
                     </div>
        
                     <div className= { this.state.mobileMenu ? 'nav-800-open' : 'nav-800-closed'}>
                        <div className='nav-800-sub'>
                             <div className='nav-logo-container'>
                                <img className = 'nav-logo'src= '../images/logo-white.png'/>   
                             </div>   
                            <Link className='nav-800' to='/create'>Add Recipes</Link>
                            <Link className='nav-800' to="/recipes">Your Recipes</Link>
                            <Link className='nav-800' to="/grocery-list">Grocery List</Link>
                            <Link className='nav-800' to='/calendar'>Calendar</Link>
                            <Link className='nav-800 settings-link-800' to="/settings">User Portal</Link>
                        </div>     
                     </div>
                 </div>    
             </div>        
         </div>
        )
    }
}


export default NavBar;