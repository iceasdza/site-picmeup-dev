import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom'
// Home
import WelcomePage from './containers/welcome'
import Home from './containers/header/headercontrol'

//Admin place manage
import PlaceForm from './containers/admin/places/addPlace';
import UpdatePlace from './containers/admin/places/upDatePlace'

//Admin event manage
import AddEvent from './containers//admin/events/addEvent'
import UpdateEvent from './containers/admin/events/updateEvent'

//User page 
import placeInfo from './containers/places/placeInfo'
import Register from './containers/users/register/register'
import eventInfo from './containers/events/eventInfo'
import Login from './containers/users/login/login'
import Chat from './containers/chat/chatList'
//Topic
import CreateTopic from './containers/topic/createTopic'
import TopicList from './containers/topic/topicList'
import Topic from './containers/topic/topicInfo'
//Redux
import{createStore} from 'redux'
import{Provider}from 'react-redux'
import{rootReducer}from './dataflow/reducers/index'



import 'semantic-ui-css/semantic.min.css';
const App = () => (
<Provider store={createStore(rootReducer)}>
<Router>
    <div>
        <Route path="/" exact component={WelcomePage}/>
        <Route path="/home"  component={Home} />
        <Route path="/addplace" component={PlaceForm} />
        <Route path="/placeInfo" component={placeInfo}/>
        <Route path="/updatePlace" component={UpdatePlace}/>
        <Route path="/addevent" component={AddEvent}/>
        <Route path="/eventInfo" component={eventInfo}/>
        <Route path="/updateEvent" component={UpdateEvent}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/createtopic" component={CreateTopic}/>
        <Route path="/topiclist" component={TopicList}/>
        <Route path="/topic" component={Topic}/>
        </div>
</Router>
</Provider>
)

ReactDOM.render(
<App />
    , document.getElementById('root'));
