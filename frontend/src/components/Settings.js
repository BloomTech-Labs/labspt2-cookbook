import React, { Component } from "react";
import NavBar from "./NavBar";
import  '../css/Settings.css';
import  '../css/Billing.css';
import CheckoutForm from './Stripe';
import { connect } from 'react-redux';

class Settings extends Component {
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

                            <div className="settings-form-item">
                                <label htmlFor="passOld">Old Password: </label>
                                <input type="password" name="passOld"></input>
                            </div>
                            
                            <div className="settings-form-item">
                                <label htmlFor="passNew">New Password: </label>
                                <input type="password" name="passNew"></input>
                            </div>

                            <input type="submit" name="save" value="Save"></input>
                        </form>
                    </div>

                    <div className="billing-main">
                        <div>SUBSCRIPTION</div>
                        <div className="billing-form-container">
                            <h1>Premium Subscription</h1>
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        user: state.UserReducer
    }
}


export default connect(mapStateToProps)(Settings)
