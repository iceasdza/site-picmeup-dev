import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../users/login/login";
import Register from "../users/register/register";
import Welcome from "../welcome";

import MeetingList from '../topic/topicList'
import MeeingInfo from '../topic/topicInfo'

import AddPlace from '../admin/places/addPlace'
import updatePlace from '../admin/places/upDatePlace'
import PlaceInfo from '../places/placeInfo'

import AddEvent from '../admin/events/addEvent'
import UpdateEvent from '../admin/events/updateEvent'
import EventInfo from '../events/eventInfo'

export default () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/main" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/meeting" component={MeetingList} />
    <Route exact path="/topic" component={MeeingInfo} />
    <Route exact path="/addPlace" component={AddPlace} />
    <Route exact path="/updatePlace" component={updatePlace} />
    <Route exact path="/placeInfo" component={PlaceInfo} />

    <Route exact path="/addevent" component={AddEvent} />
    <Route exact path="/updateEvent" component={UpdateEvent} />
    <Route exact path="/eventInfo" component={EventInfo} />
  </Switch>
);
