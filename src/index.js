import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import PlaceForm from './containers/AddPlace';
import Home from './containers/Home'
import placeInfo from './containers/PlaceInfo'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
<Router>
    <div>
        <Route path="/" exact component={Home} />
        <Route path="/addplace" component={PlaceForm} />
        <Route path="/placeInfo" component={placeInfo}/>
        </div>
</Router>
    , document.getElementById('root'));
