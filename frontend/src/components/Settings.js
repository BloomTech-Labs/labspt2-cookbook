import React, { Component } from "react";
import NavBar from "./NavBar";
import  '../css/Settings.css';
import { connect } from 'react-redux';

class Settings extends Component {
    render() {
        return (
            <div className="settings-page">
                <NavBar />
                <div className="settings-main">
                <div>SETTINGS</div>
                    <div className="settings-form-container">
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
