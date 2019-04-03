import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        
    }
    
    
    async submit(e) {
        e.preventDefault();
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token.id)
        
        await axios
        .post("http://localhost:1234/api/charge/", token)
        .then(response => {
            console.log(response);
            alert("Payment Success");
        })
        .catch(err => {
            console.log("Payment Error: ", err);
            alert("Payment Error");
        });
    };
    render(){
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
};


export default injectStripe(CheckoutForm);