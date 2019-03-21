import React from 'react';
import {Route} from 'react-router-dom';
import RegisterModal from  "./RegisterModal";
import  '../css/LandingPage.css';
import { connect } from 'react-redux';
// import { domainToASCII } from 'url';


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
                    <div className='logo-container'>
                        <h1 className='landing-header'>Kookr
                        </h1>
                    </div>  
                    <div className='landing-page-nav-buttons'>
                        <h3 className='registration-button' onClick={this.openModal}>Login / Register</h3>
                    </div>
                </div>
                <div className='landing-page-body'>
                    <div className='landing-blurb-container'>
                        <h2 className='landing-blurb-header'>Simplify Your Meals</h2>
                        <p className='landing-page-blurb'>At Kookr, our mission is to streamline the meal planning and shopping process- time we feel much better spent around the 
                            dinner table with family, or enjoying the bounty of social and physical 	experiences that food provides. The Kookr 
                            application allows the user to add and organize recipes, plan meals, and create custom shopping lists. By creating a simplified,
                             stress-free user experience we help our users make the most out of their day, and bring focus back to mealtimes.</p>
                         <div className='get-started-button' onClick={this.openModal}>Get Started For Free</div>    
                    </div>
                </div>
            <div className="landing-page-modal">
                    <Route exact path = '/' render = {(props) => <RegisterModal show={this.state.show} closeHandle={this.closeModal} {...props}/>}/>
            </div>     
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps)(LandingPage)
