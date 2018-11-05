import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../users/login/login";
import Register from "../users/register/register";
import Welcome from "../welcome";
import CreateAlbum from '../users/album/createAlbum'
import Events from '../events/eventPage'
import Places from '../places/placePage'
import MeetingList from '../topic/topicList'
import MeeingInfo from '../topic/topicInfo'
import CreateMeeting from '../topic/createTopic'
import EditMeeting from '../topic/editTopic'

import Gallery from '../gallery/gallery'
import AlbumInfo from '../gallery/albumInfo'

import AddPlace from '../admin/places/addPlace'
import updatePlace from '../admin/places/upDatePlace'
import PlaceInfo from '../places/placeInfo'

import AddEvent from '../admin/events/addEvent'
import UpdateEvent from '../admin/events/updateEvent'
import EventInfo from '../events/eventInfo'

import Profile from '../users/profile/profile'
import EditProfile from '../users/profile/editprofile'

import FindByNear from '../users/findByNear/findByNearPage'
import EditAlbum from '../users/album/editAlbum'
import Activity from '../activity/activity'
export default () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    
    <Route exact path="/main" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/editprofile" component={EditProfile} />
    <Route exact path="/createalbum" component={CreateAlbum} />

    <Route exact path="/meeting" component={MeetingList} />
    <Route exact path="/topic" component={MeeingInfo} />
    <Route exact path="/createtopic" component={CreateMeeting} />
    <Route exact path="/editTopic" component={EditMeeting} />
    

    <Route exact path="/addPlace" component={AddPlace} />
    <Route exact path="/updatePlace" component={updatePlace} />
    <Route exact path="/placeInfo" component={PlaceInfo} />
    <Route exact path="/gallery" component={Gallery} />
    <Route exact path="/gallery/albumInfo/*" component={AlbumInfo} />

    <Route exact path="/addevent" component={AddEvent} />
    <Route exact path="/updateEvent" component={UpdateEvent} />
    <Route exact path="/eventInfo" component={EventInfo} />
    <Route exact path="/activity" component={Activity} />


    <Route exact path="/findbynear" component={FindByNear} />
    <Route exact path="/editalbum" component={EditAlbum}/>

    <Route exact path="/events" component={Events}/>
    <Route exact path="/places" component={Places}/>
  </Switch>
);
