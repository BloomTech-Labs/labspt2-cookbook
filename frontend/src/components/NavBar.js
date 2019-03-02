import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => (
    <div>
        <span>
            <Link to="/settings">Settings</Link>
        </span>
        <span>
            <Link to="/billing">Billing</Link>
        </span>
    </div>
);

export default NavBar;