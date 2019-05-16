import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.cancelSubscription = this.cancelSubscription.bind(this)
        this.state = {
            today : "",
            userId : this.props.userId,
            stripeId: this.props.stripeId,
            subscriptionId: this.props.subscriptionId
        }
        
    }
    componentDidMount(){
        this.newDate()
    }

    newDate = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        this.setState({
            today : today
        })
    }
    
    
    async submit(e) {
        e.preventDefault();
        if(this.props.subscriptionId){
            alert("You have a current subscription to Kookr Premium")
        } else {
            if(this.props.stripeId){
                axios
                .post("https://kookr.herokuapp.com/api/charge/", {customer: this.props.stripeId} )
                .then(response =>{
                    alert("Payment Success");
                })
                .catch(err =>{
                    console.error(err)
                })
                
            } else {
                let {token} = await this.props.stripe.createToken({name: this.props.name});
                axios
                    .post("https://kookr.herokuapp.com/api/charge/user", token)
                    .then(response => {
                        this.setState({
                            stripeId: response.data.id
                        })
                    })
                    .then(()=>{
                        axios.put(`https://kookr.herokuapp.com/api/user/${this.props.userId}`, {
                            auth_id:this.props.auth,
                            email: this.props.name,
                            billing_date: this.state.today,
                            type: 1,
                            stripe_id: this.state.stripeId
                        })
                        .then(response =>{
                        })
                        .catch(err=>{
                            console.error(err)
                        })
                    })
                    .then(()=>{
                        axios
                        .post("https://kookr.herokuapp.com/api/charge/", {customer: this.state.stripeId})
                        .then(response =>{
                            alert("Payment Success");
                        })
                        .catch(err =>{
                            console.error(err)
                        })
                    })
                    .catch(err => {
                        console.error("Payment Error: ", err);
                        alert("Payment Error");
                    });
            }
        }
        
    };

    cancelSubscription = () =>{
        axios
            .put("https://kookr.herokuapp.com/api/charge/unsubscribe/", {customer: this.props.subscriptionId} )
            .then(response =>{
                alert("Your subscription will cancel at the end of this period");
            })
            .catch(err =>{
                console.error(err)
            })
    } 
    render(){
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
                <p onClick = {this.cancelSubscription}>Cancel Subscription</p>
            </div>
        );
    }
};


export default injectStripe(CheckoutForm);