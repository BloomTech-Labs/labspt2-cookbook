import React, { Component } from "react";
import NavBar from "./NavBar";
import  '../css/Settings.css';
import  '../css/Billing.css';
import CheckoutForm from './Stripe';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { connect } from 'react-redux';
import axios from 'axios';

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId : '',
            authId : '',
            billingDate : '',
            email: '',
            accountType: '',

        }
    }    
async componentDidMount(){
    //this.getUserToShowChrisThatWeCan();
    let localUserId = await localStorage.getItem('userId')
    await this.setState({
        userId : localUserId
    });
    this.getCurrentUser();
}

getCurrentUser = async() =>{
    await axios
        .get(`https://kookr.herokuapp.com/api/user/${this.state.userId}`)
            .then(res =>{
                console.log(res)
                this.setState({
                    authId : res.data.auth_id,
                    billingDate : res.data.billing_date,
                    email : res.data.email,
                    accountType : res.data.type
                })
            })
            .catch(err =>{
                console.log(err)
            })
            console.log("after get current user", this.state)
}

getUserToShowChrisThatWeCan = async() =>{
    await axios
        .get('https://kookr.herokuapp.com/api/user/1')
            .then(res =>{
                console.log(res)
                this.setState({
                    userId : res.data.user_id,
                    billingDate : res.data.billing_date,
                    email : res.data.email,
                    accountType : res.data.type
                })
            })
            .catch(err =>{
                console.log('This did not work out well', err)
            })
            console.log(this.state);
}
    render() {
        return (
            <div className="settings-page">
                <NavBar />
                <div className="settings-main">
                    <div className="settings-form-container">
                        <div>SETTINGS</div>
                        <form className="settings-form">
                            <div className="settings-form-item">
                                <label htmlFor="email">Email Address: </label>
                                <input type="text" name="email" placeholder="someone@website.com"></input>
                            </div>

                            <div className="settings-form-item">
                                <label htmlFor="phone">Phone Number: </label>
                                <input type="tel" name="phone" placeholder="555-123-5678"></input>
                            </div>

                            <div className="settings-form-item">
                                <label htmlFor="notificationsEmail">Email Notifications? </label>
                                <input type="checkbox" name="notificationsEmail"></input>

                                <label htmlFor="notificationsText">Text Notifications? </label>
                                <input type="checkbox" name="notificationsText"></input>
                            </div>


                            <input type="submit" name="save" value="Save"></input>
                        </form>
                    </div>

                    <div className="billing-main">
                        <div>SUBSCRIPTION</div>
                        <StripeProvider apiKey="pk_test_FnFtpYb3dVyUAFLHmDnjgP8g00XZuu408f">
                            <div className="billing-form-container">
                                <h1>Premium Subscription</h1>
                                <Elements>
                                    <CheckoutForm name={this.state.email} auth={this.state.authId} userId={this.state.userId} />
                                </Elements>
                            </div>
                        </StripeProvider>
                    </div>
                </div>
                {/* <div className = 'display-for-chris'>
                    <div>{this.state.userId}</div>
                    <div>{this.state.email}</div>
                    <div>{this.state.billingDate}</div>
                </div> */}
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps)(Settings)
