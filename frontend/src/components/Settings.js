import React, { Component } from "react";
import NavBar from "./NavBar";
import  '../css/Settings.css';
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
            formEmail:'',
            message: '',
            stripeId : ''
        }
    }    
async componentDidMount(){
    let localUserId = await localStorage.getItem('userId')
    await this.setState({
        userId : Number(localUserId)
    });
    await this.getCurrentUser();
    this.checkSubscription();
}

getCurrentUser = async() =>{
    await axios
        .get(`https://kookr.herokuapp.com/api/user/${this.state.userId}`)
            .then(res =>{
                this.setState({
                    authId : res.data.auth_id,
                    billingDate : res.data.billing_date,
                    email : res.data.email,
                    accountType : res.data.type,
                    formEmail : res.data.email,
                    stripeId : res.data.stripe_id,
                    subscriptionId : res.data.subscription_id
                })
            })
            .catch(err =>{
                console.error(err)
            })
}

inputHandler=(e) =>{
    this.setState({[e.target.name]: e.target.value})
}

checkSubscription=()=>{
    
    if(this.state.accountType === "0"){
        this.setState({
            message : "You do not have a subscription to Kookr. Subscribe below"})
    } else if (this.state.accountType === "1"){
        this.setState({
            message :'You are subscribed to Kookr Premium'})
    }
}

    render() {
        return (
            <div className="settings-page">
                <NavBar />
                <div className ='settings-main'>
                    <h1 className = 'settings-header'>Your Portal</h1>
                    <div className = 'settings-main-sub'>
                        <div className="settings-form-container">
                            <h2 className='settings-form-header'>Settings</h2>
                            <form className="settings-form">
                                <div className="settings-form-item">
                                    <label className='settings-form-label' htmlFor="email">Email Address: </label>
                                    <input className='email-input' type="text" name="formEmail" placeholder="someone@website.com" value={this.state.formEmail} onChange={this.inputHandler}></input>
                                </div>
                                <div className="settings-form-item">
                                    <label className='settings-form-label' htmlFor="notificationsEmail">Email Notifications? </label>
                                    <input className ='settings-input' type="checkbox" name="notificationsEmail"></input>
                                    <label  className='settings-form-label' htmlFor="notificationsText">Text Notifications? </label>
                                    <input className ='settings-input' type="checkbox" name="notificationsText"></input>
                                </div>

                                <input className = 'save-button' type="submit" name="save" value="Save"></input>
                            </form>
                        </div>

                        <div className="billing-main">
                            <h2 className="subscription-header">Subscription</h2>
                            <div className='subscription-message-container'>
                                <h2 className='your-subscription-header'>Your Subscription:</h2>
                                <p className = 'subscription-message'>{this.state.message}</p>
                            </div> 
                            <StripeProvider apiKey="pk_test_FnFtpYb3dVyUAFLHmDnjgP8g00XZuu408f">
                                <div className="billing-form-container">
                                    <h1 className='premium-header'>Premium Subscription</h1>
                                    <Elements>
                                        <CheckoutForm name={this.state.email} auth={this.state.authId} userId={this.state.userId} stripeId={this.state.stripeId} subscriptionId={this.state.subscriptionId} />
                                    </Elements>
                                </div>
                            </StripeProvider>
                        </div>
                   </div> 
                </div>
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
