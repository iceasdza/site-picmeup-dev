import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header_Picmeup from '../UI/Header_Picmeup';
import Place_Form from '../UI/Place_Form';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>
                    <Header_Picmeup/>
                    <Place_Form/>
                </h1>
            </div>
        )
    }
}

export default Home