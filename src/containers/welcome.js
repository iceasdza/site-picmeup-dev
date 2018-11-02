import React, { Component } from "react";
import WelcomeComponent from '../components/welcomeComponent'
import '../static/welcome.css'
class Welcome extends Component{
    render(){
        return(
            <div className="backgroundImage">
            <WelcomeComponent/>
            </div>
        )
    }
}

export default Welcome