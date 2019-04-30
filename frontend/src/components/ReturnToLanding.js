import React from  'react'
import {Link} from 'react-router-dom';

class ReturnToLanding extends React.Component{
    render(){
        return(
            <div className= 'ReturnToLanding'>
                <h3>You are not logged in. Please redirect to the landing page and login to view this page.</h3>
                <Link exact to ='/'>
                    <div className ='link-to-home-button'>
                        <p>Landing Page</p>
                    </div>
                </Link>
            </div>
        )
    }
}
export default ReturnToLanding;