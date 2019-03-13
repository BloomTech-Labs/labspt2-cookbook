import React from 'react';

import RegisterModal from  "./RegisterModal";
import  '../css/LandingPage.css';
import { connect } from 'react-redux';


class LandingPage extends React.Component{
    state={ show: false };

    openModal = () =>{
        this.setState({show: true});
    };

    closeModal = (e) =>{
        e.preventDefault();
        this.setState({show: false});

    };

    //Verifying user login?
    render(){
        return(
            <div className='Landing-Page'>
                <div className='landing-page-nav-bar'>
                    <div className='nav-bar-overlay'>
                        <div className='logo-container'>
                            <div className='icon-container'>
                                <img className='icon' src='https://image.flaticon.com/icons/svg/1460/1460085.svg' alt = 'logo icon'/>
                            </div>    
                            <h1 className='landing-header'>Kookr
                            </h1>
                        </div>  
                        <div className='landing-page-nav-buttons'>
                            <h3 className='login-button'>Login</h3>
                            <h3 className='registration-button' onClick={this.openModal}>Register</h3>
                        </div>
                    </div>    
                    <div className='landing-page-nav-buttons'>
                        <h3 className='login-button'>Login</h3>
                        <h3 className='registration-button'>Register</h3>
                    </div>
                </div>
                <div className='landing-page-img-container'>
                    <div className='landing-content-container'>
                        <div className='landing-blurb-container row-one'>
                            <div className='blurb' id='blurb-one'>
                                <div className='blurb-header'>
                                    <div className='blurb-header-overlay'>Header
                                    </div>
                                </div>    
                                <div className='blurb-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                            </div>
                            <div className='blurb' id='blurb-two'>
                                <div className='blurb-header'>
                                    <div className='blurb-header-overlay'>Header
                                    </div>
                                </div>    
                                <div className='blurb-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                            </div>
                    </div>
                </div>  
            </div> 
            <div className="landing-page-modal">
                    <RegisterModal show={this.state.show} closeHandle={this.closeModal} />
            </div>     
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(LandingPage)
