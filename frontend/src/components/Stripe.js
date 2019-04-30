import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.state = {
            today : "",
            userId : this.props.userId,
            stripeId: this.props.stripeId,
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
        if(this.props.stripeId){

            console.log("right before axios post ", {customer: this.props.stripeId })
            console.log(this.props.stripeId)
            axios
            .post("http://localhost:4321/api/charge/", {customer: this.props.stripeId} )
            .then(response =>{
                console.log("posting after user exists", response)
                alert("Payment Success");
            })
            .catch(err =>{
                console.log(err)
            })
            
        } else {
            let {token} = await this.props.stripe.createToken({name: this.props.name});
            axios
                .post("http://kookr.herokuapp.com/api/charge/user", token)
                .then(response => {
                    console.log(response);
                    this.setState({
                        stripeId: response.data.id
                    })
                    //
                    
                })
                .then(()=>{
                    console.log("in next then", this.state.stripeId)
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
                        console.log(err)
                    })
                })
                .then(()=>{
                    console.log("right before axios post after creating new user", {customer: this.state.stripeId})
                    axios
                    .post("https://kookr.herokuapp.com/api/charge/", {customer: this.state.stripeId})
                    .then(response =>{
                        console.log("posting after user created", response)
                        alert("Payment Success");
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log("Payment Error: ", err);
                    alert("Payment Error");
                });
        }
        
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