import React from 'react';

import  '../css/LandingPage.css';
import { connect } from 'react-redux';


class LandingPage extends React.Component{
    //Verifying user login?
    render(){
        return(
            <div className='Landing-Page'>
                <div className='landing-page-nav-bar'>
                    <div className='logo-container'>
                        <div className='icon-border'>
                            <img className='icon' src='https://image.flaticon.com/icons/svg/1530/1530649.svg' alt = 'logo icon'/>
                        </div>    
                        <h1 className='landing-header'>kookr
                        </h1>
                    </div>    
                    <div className='landing-page-nav-buttons'>
                        <h3 className='login-button'>Login</h3>
                        <h3 className='registration-button'>Register</h3>
                    </div>
                </div>
                <div className='landing-page-sub-container'>
                    <div className='blurb-outline'>
                        <div className='landing-page-blurb-container'>
                            <div className='blurb'>
                                <div className='blurb-p'>
                                    Bringing fun and focus back to meal planning.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}


const mapStateToProps = function(state) {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(LandingPage)


//export default LandingPage;