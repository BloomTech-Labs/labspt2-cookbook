import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import "../css/RegisterModal.css"

class RegisterModal extends Component{
    constructor(props){
        super(props)
        this.state={  
            email: "",
            id: '',
            closeProp: false,

        }
    }

    submitHandler = (googleObj) =>{
        this.setState({
            email: googleObj.profileObj.email,
            id: googleObj.googleId
        });
        //console.log(this.state);
        this.props.idClickHandler(this.state.id);
       
        axios
            .post('https://kookr.herokuapp.com/api/user/', {
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
            closeProp: true
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
        
        return (
            <div className={`modal display-${this.props.show ? "block" : "none"}`}>
                <div className="modal-main">
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
        )
    }

}

export default RegisterModal;