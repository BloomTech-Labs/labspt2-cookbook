import React, { Component } from "react";
import NavBar from "./NavBar";

class Billing extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <div>
                        Payment Info
                        <form>
                            <input type="number" name="cardNum" placeholder="CC#"></input>
                            <input type="number" name="expDate" placeholder="EXP"></input>
                            <input type="number" name="cvv" placeholder="CVV"></input>
                            <input type="submit" value="Buy Now" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default Billing;
