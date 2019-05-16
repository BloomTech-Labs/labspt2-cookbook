import React from 'react';
import GoogleLogin from 'react-google-login';
import  '../css/LandingPage.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {addUser} from '../actions/UserActions';
import { bindActionCreators } from 'redux';

class LandingPage extends React.Component{
    state={ 
        show: false,
        email: "",
        authId: "",
    };

    openModal = () =>{
        this.setState({show: true});
    };

    closeModal = (e) =>{
        e.preventDefault();
        this.setState({show: false});

    };
    submitHandler = async (googleObj) =>{
        this.setState({
            email: googleObj.profileObj.email,
            // email:"emailandstuff.com",
            authId: googleObj.googleId
            // authId: "779802nnjs02iup2je2dflsd"
        });
        
        await axios
            .get(`https://kookr.herokuapp.com/api/user/auth/${googleObj.googleId}`)
            .then(async response =>{
                if(response.data.length){
                     await localStorage.setItem('userId', response.data[0])
                    
                }else{
                    this.postNewUser();
                }
            })
            .catch(err =>{

                if(err.response.status === 404){
                    this.postNewUser();
                }
                
            })
    }
    postNewUser = async() =>{

        const authId = this.state.authId;
        const email = this.state.email;
        const newUserObj = {auth_id:authId, email:email}

        await axios
            .post('https://kookr.herokuapp.com/api/user', newUserObj)
            .then(response => {

                localStorage.setItem('userId', response.data[0]) //??  Test this bad boy Number(newUserId)
                //adds the user to the reducer
                this.props.addUser(response.data)

                //to reference the user within the application use
                //this.props.user[0].user_id

            })
            .catch( err =>{
                console.error(err.response);
            })
    }

    responseGoogleSuccess = async(response) => {
        await this.submitHandler(response);
        this.props.history.push('/create');
      }
    
    
      responseGoogleFailure = (response) => {
        alert('Failure logging in. Please try again');
    } 
    render(){
        return(
            <div className='Landing-Page'>
                <div className = 'landing-page-background'></div>
                <div className='landing-page-nav-bar'>
                    <div className='social-media-container'>
                        <i className="fab fa-google-plus-g" ></i>
                        <i className="fab fa-facebook-f" ></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-twitter" ></i>
                    </div> 
                    <div className = 'landing-logo-container'>
                        <img className = 'landing-logo'src= '../images/logo.png' alt='Kookr'/>
                        <h1 className='landing-header'>Kookr</h1>
                    </div>
                    <div className='landing-page-nav-buttons'>
                        <h3 className='registration-button' onClick={this.openModal}>Login / Register</h3>
                    </div>
                </div>
                <div className='landing-page-body'>
                    <div className='landing-blurb-container'>
                        <div className='landing-blurb-sub-container'>
                            <h2 className='landing-blurb-header'>Simplify Your Meals</h2>
                            <p className='landing-page-blurb'>At Kookr, our mission is to streamline the meal planning and shopping process- time we feel much better spent around the 
                                dinner table with family, or enjoying the bounty of social and physical 	experiences that food provides. The Kookr 
                                application allows the user to add and organize recipes, plan meals, and create custom shopping lists. By creating a simplified,
                                stress-free user experience we help our users make the most out of their day, and bring focus back to mealtimes.</p>
                            <div className='get-started-button' onClick={this.openModal}>Get Started For Free</div>    
                        </div>
                    </div>
                    <div className='how-it-works-section'>
                        <h2 className='how-it-works-header'>How Does Kookr Work?</h2>
                        <div className='how-it-works-sub-container'>
                            <div className='sub-blurb'>
                                <div className='mini-blurb-header-container'>
                                    <div className='sub-container'>
                                        <h4 className = 'mini-blurb-header'>Add Recipes to Your Profile</h4>
                                        <img className = 'mini-blurb-img' src = '../images/recipe.png' alt = 'recipe' />
                                    </div>       
                                </div>    
                                <p className = 'mini-blurb-p'>Find your favorite recipes from the internet and add them to your profile. Add meal designations to recipes.
                                </p>
                            </div>
                            <div className='sub-blurb'>
                                <div className='mini-blurb-header-container'>
                                    <div className='sub-container'> 
                                        <h4 className = 'mini-blurb-header'>Assign Recipes to Your Calendar</h4>
                                        <img className = 'mini-blurb-img'  src = '../images/calendar.png' alt ='calendar'/>
                                    </div>    
                                </div>    
                                <p className = 'mini-blurb-p'>Search through your recipes by meal or keyword, and add them to your custom calendar.
                                </p>
                            </div>
                            <div className='sub-blurb'>
                                <div className='mini-blurb-header-container'>
                                    <div className='sub-container'>
                                        <h4 className = 'mini-blurb-header'>Create a Shopping List </h4>
                                        <img className = 'mini-blurb-img' src = '../images/list.png' alt ='list' />
                                    </div>    
                                </div>    
                                <p className = 'mini-blurb-p'>Select date ranges and populate a shopping list for all of your scheduled meals.
                                </p>
                            </div>
                        </div>    
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
                <div className='mobile-login-portal'>
                    <div className ='mobile-login-sub-container'>
                        <h3 className='mobile-login-header'>Welcome to Kookr!</h3>
                        <GoogleLogin
                            clientId="682401182106-dj5u5r18qhs0hu730pkl7brs330gkt3l.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailure}
                            className='google-login'
                        />
                        <div className='facebook-login'>I am a facebook button</div>
                    </div>
                </div>     
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({addUser}, dispatch)


const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
// export default LandingPage;