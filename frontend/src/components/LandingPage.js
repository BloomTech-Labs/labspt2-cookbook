import React from 'react';

import  '../css/LandingPage.css';

class LandingPage extends React.Component{
    //Verifying user login?
    render(){
        return(
            <div className='Landing-Page'>
                <div className='landing-page-nav-bar'>
                    <div className = 'nav-bar-overlay'>
                        <div className='logo-container'>
                            <div className='icon-container'>
                                <img className='icon' src='https://image.flaticon.com/icons/svg/1460/1460085.svg' alt = 'logo icon'/>
                            </div>    
                            <h1 className='landing-header'>Kookr
                            </h1>
                        </div>    
                        <div className='landing-page-nav-buttons'>
                            <h3 className='login-button'>Login</h3>
                            <h3 className='registration-button'>Register</h3>
                        </div>
                    </div>    
                </div>
                <div className='landing-page-img-container'>
                    
                    <div className='landing-page-sub-container'>
                       
                    </div>  
                </div>     
            </div>
        )
    }cd 
}
export default LandingPage;