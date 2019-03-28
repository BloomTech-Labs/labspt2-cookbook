import React from 'react';
import GoogleLogin from 'react-google-login';
import  '../css/LandingPage.css';
import { connect } from 'react-redux';
import axios from 'axios';


class LandingPage extends React.Component{
    state={ 
        show: false,
        email: "",
        id: '',
    };

    openModal = () =>{
        this.setState({show: true});
    };

    closeModal = (e) =>{
        e.preventDefault();
        this.setState({show: false});

    };
    submitHandler = (googleObj) =>{
        this.setState({
            email: googleObj.profileObj.email,
            id: googleObj.googleId
        });
        //console.log(this.state);
        this.props.idClickHandler(this.state.id);
       
        axios
            .post('https://kookr.herokuapp.com/api/user', {
                auth_id: this.state.id, 
                email: this.state.email,
                type: 0,
                billing_date: null
            })
            .then(response => {
                console.log(response);
            })
            .catch( err =>{
                console.log(err);
            })

        this.setState({
            email: "",
            
        })
    }
    responseGoogleSuccess = (response) => {
        console.log(response)
        this.submitHandler(response);
        this.props.history.push('/create');
      }
    
    
      responseGoogleFailure = (response) => {
        console.log(response);
        alert('Failure logging in. Please try again');
    } 
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
            <div className={`modal display-${this.state.show ? "block" : "none"}`} >
                <div className="modal-main">
                    <div className='x-box'> 
                        <div onClick ={this.closeModal} className='close-registration-x'>x</div>
                    </div>       
                    <form className='register-form' onSubmit={this.submitHandler}>
                        <div className = 'google-facebook-container'>
                            <h3 className='login-header'>Login with Google or Facebook</h3>
                            <GoogleLogin
                                clientId="682401182106-dj5u5r18qhs0hu730pkl7brs330gkt3l.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.responseGoogleSuccess}
                                onFailure={this.responseGoogleFailure}
                                className='google-login'
                            />
                            <div className='facebook-login'>I am a facebook button</div>
                        </div>
                    </form>
                </div>
            </div>
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