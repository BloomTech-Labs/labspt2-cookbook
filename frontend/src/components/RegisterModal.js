import React, { Component } from 'react';
import axios from 'axios';
import "../css/RegisterModal.css"

class RegisterModal extends Component{
    constructor(props){
        super(props)
        this.state={  
            email: ""

        }
    }

    inputHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.email)
    }

    submitHandler = (e) =>{
        e.preventDefault();
        console.log("it ran")
        axios
            .post(`localhost:1234/api/user/`, {
                auth_id: "defg456", 
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
            email: ""
        })
    }

    render(){
        return (
            <div className={this.props.show ? "modal display-block" : "modal display-none"}>
                <div className="modal-main">
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                        <input type="email" name="email" value={this.state.email} placeholder="JohnDoe@email.com" onChange={this.inputHandler}/>
                        <input type="submit"/>
                    </form>
                </div>
    
            </div>
        )
    }

}

export default RegisterModal;