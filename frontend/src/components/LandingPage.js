import React from 'react';

import  '../css/LandingPage.css';

class LandingPage extends React.Component{
    //Verifying user login?
    render(){
        return(
            <div className = 'landing-page-container'>
                <div className = 'landing-page-nav-bar'>
                    <div className = 'landing-page-nav-bar-sub-container'>   
                        <div  className = 'logo-and-header-container'>
                            <p>icon</p>     
                            <h1 className = '?'>Header</h1>
                        </div>
                        <div className = 'login-container'>
                            <p>Login</p>
                            <p>Register</p>
                        </div>
                    </div>    
                </div>   
                <div className = 'main-content'>
                    

                    
                </div>
            
            </div>
        )
    }
}
export default LandingPage;