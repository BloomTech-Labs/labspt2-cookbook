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

    inputHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        axios
            .post(`localhost:1234/api/user/`, {
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
    responseGoogle = (response) => {
        console.log(response);
        this.setState({
            email: response.profileObj.email,
            id: response.googleId
        })
      }
    render(){
        
        return (
            <div className={`modal display-${this.props.show ? "block" : "none"}`}>
                <div className="modal-main">
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                        <input type="email" name="email" value={this.state.email} placeholder="JohnDoe@email.com" onChange={this.inputHandler}/>
                        <input type="submit"/>
                    </form>
                    <div className = 'google-facebook-container'>
                        <GoogleLogin
                            clientId="682401182106-dj5u5r18qhs0hu730pkl7brs330gkt3l.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default RegisterModal;