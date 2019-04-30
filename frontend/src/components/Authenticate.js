import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LandingPage from './LandingPage';
import ReturnToLanding from './ReturnToLanding';
import CreateRecipe from './CreateRecipe';

const Authenticate = (PassedComponent) =>{
    return class extends React.Component{
        constructor(){
            super()
            this.state ={
                loggedIn : false
            }
        }
        async componentDidMount(){
            console.log('Line 14',localStorage.getItem('userId'));
            if(!localStorage.getItem('userId')){
                await this.setState({
                    loggedIn: false
                })
            }else{
                this.setState({
                    loggedIn:true
                })
            }
        }

        render(){
            if(this.state.loggedIn){
                return <PassedComponent />
            }else{
                return(
                    
                    <Router>
                        {!this.state.loggedIn && <Route exact path='/' render = {(props) => < LandingPage {...props}/>} /> }
                        {/* <Redirect exact to = '/' /> */}
                        {/* {!this.state.loggedIn && <Route exact path='/create' render = {(props) => <ReturnToLanding {...props}  />}/>} */}
                        {/* {!this.state.loggedIn && <Route exact path='/calendar' render = {(props) => <ReturnToLanding {...props}  />}/>} */}
                    </Router>
                )  
            }
        }
    }    
}
export default Authenticate;