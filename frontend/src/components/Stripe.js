import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.state = {
            today : ""
        }
        
    }
    componentDidMount(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.write(today);
    this.setState({
        today : today
    })
    }
    
    
    async submit(e) {
        e.preventDefault();
        let {token} = await this.props.stripe.createToken({name: this.props.name});
        console.log(token.id, this.props.name)
        
        await axios
        .post("https://kookr.herokuapp.com/api/charge/", token)
        .then(response => {
            console.log(response);
            alert("Payment Success");
        })
        .then(()=>{
            axios.put(`https://kookr.herokuapp.com/api/user/${this.props.userId}`, {
                auth_id:this.props.auth,
                email: this.props.name,
                billing_date: this.state.today,
                type: 1
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