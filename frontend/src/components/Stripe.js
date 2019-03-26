import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.state={  
            publishableKey : "pk_test_FnFtpYb3dVyUAFLHmDnjgP8g00XZuu408f"
        }
    }
    
    onToken = token => {
        const body = {
        amount: 1000,
        token: token
    };
    axios
        .post("http://localhost:1234/api/charge/", body)
        .then(response => {
            console.log(response);
            alert("Payment Success");
        })
        .catch(error => {
            console.log("Payment Error: ", error);
            alert("Payment Error");
        });
    };
    render(){
        return (
            <StripeCheckout
            label="Go Premium" //Component button text
            name="Kookr" //Modal Header
            description="Upgrade to a premium account today."
            panelLabel="Go Premium" //Submit button in modal
            amount={1000} //Amount in cents $9.99
            token={this.onToken}
            stripeKey={this.state.publishableKey}
            billingAddress={false}
            />
        );
    }
};


export default CheckoutForm;