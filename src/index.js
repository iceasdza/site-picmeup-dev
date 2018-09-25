import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Home
// import WelcomePage from "./containers/welcome";
// import Home from "./containers/Home";

//Admin place manage
// import PlaceForm from "./containers/admin/places/addPlace";
// import UpdatePlace from "./containers/admin/places/upDatePlace";

//Admin event manage
// import AddEvent from "./containers//admin/events/addEvent";
// import UpdateEvent from "./containers/admin/events/updateEvent"

//User page;
// import placeInfo from "./containers/places/placeInfo";
// import Register from "./containers/users/register/register";
// import eventInfo from "./containers/events/eventInfo";
// import Login from "./containers/users/login/login";
// import Chat from "./containers/chat/chatList";
//Topic
// import CreateTopic from "./containers/topic/createTopic";
// import TopicList from "./containers/topic/topicList";
// import Topic from "./containers/topic/topicInfo";
// import Navbar from "./containers/header/headercontrol";
//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./dataflow/reducers/index";
import { BrowserRouter } from 'react-router-dom'
import "semantic-ui-css/semantic.min.css";
import Main from "./containers/main";
import registerServiceWorker from './registerServiceWorker'

const App = () => (
  <BrowserRouter>
   <Provider store={createStore(rootReducer)}>
    <Main/>
    </Provider>
  </BrowserRouter>
  // <Provider store={createStore(rootReducer)}>
  //   <Router>
  //     <div>
  //       <Navbar />
  //       <Switch>
  //         <Route path="/" exact component={WelcomePage} />
  //         <Route path="/main" exact component={Home} />
  //         <Route path="/addplace" exact component={PlaceForm} />
  //         <Route path="/placeInfo" exact component={placeInfo} />
  //         <Route path="/updatePlace" exact component={UpdatePlace} />
  //         <Route path="/addevent" exact component={AddEvent} />
  //         <Route path="/eventInfo" exact component={eventInfo} />
  //         <Route path="/updateEvent" exact component={UpdateEvent} />
  //         <Route path="/register" exact component={Register} />
  //         <Route path="/login" exact component={Login} />
  //         <Route path="/chat" exact component={Chat} />
  //         <Route path="/createtopic" exact component={CreateTopic} />
  //         <Route path="/meeting" exact component={TopicList} />
  //         <Route path="/topic" exact component={Topic} />
  //       </Switch>
  //     </div>
  //   </Router>
  // </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker()