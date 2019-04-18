import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.state = {
            today : "",
            userId : props.userId,
            stripeId: props.stripeId,
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
        console.log(this.state.stripeId)
        if(this.state.stripeId === undefined){
            let {token} = await this.props.stripe.createToken({name: this.props.name});
            console.log("token", token)

            axios
                .post("http://localhost:1234/api/charge/user", token)
                .then(response => {
                    console.log(response);
                    this.setState({
                        stripeId: response.data.id
                    })
                    //alert("Payment Success");
                    
                })
                .then(()=>{
                    console.log("in next then", this.state.stripeId)
                    axios.put(`https://localhost:1234/api/user/${this.props.userId}`, {
                        auth_id:this.props.auth,
                        email: this.props.name,
                        billing_date: this.state.today,
                        type: 1,
                        stripe_id: this.state.stripeId
                    })
                    .then(response =>{
                        console.log("from put", response)
                    })
                    .catch(err=>{
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