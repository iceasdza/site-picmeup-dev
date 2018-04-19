import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>
                    <Header/>
                </h1>
            </div>
        )
    }
}

export default Home