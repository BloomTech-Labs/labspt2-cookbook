import React, { Component } from "react";
import NavBar from "./NavBar";
import  '../css/Settings.css';

class Settings extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <form>
                        <label htmlFor="email">Email Address: </label>
                        <input type="text" name="email" placeholder="someone@website.com"></input>

                        <label htmlFor="phone">Phone Number: </label>
                        <input type="tel" name="phone" placeholder="555-123-5678"></input>

                        <label htmlFor="notificationsEmail">Email Notifications? </label>
                        <input type="checkbox" name="notificationsEmail"></input>

                        <label htmlFor="notificationsText">Text Notifications? </label>
                        <input type="checkbox" name="notificationsText"></input>

                        <label htmlFor="passOld">Old Password: </label>
                        <input type="password" name="passOld"></input>
                        
                        <label htmlFor="passNew">New Password: </label>
                        <input type="password" name="passNew"></input>

                        <input type="submit" name="save" value="Save"></input>
                    </form>
                </div>
            </div>
        );
    }
};

export default Settings;