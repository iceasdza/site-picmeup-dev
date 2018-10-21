import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import "../static/home.css";
import "../static/showdata.css";
import MainInfo from "../components/main/mainInfo";
import Cookies from "js-cookie";

const user = Cookies.get("user");

class Home extends Component {
  state = {
    placesData: [],
    eventData: [],
    open: false,
    targetId: "",
    FileName: []
  };

  getData = async () => {
    const places = await axios.get("/api/getPlaceInfo");
    const events = await axios.get("/api/GetEventInfo");
    this.setState({ placesData: places.data, eventData: events.data });
  };

  componentDidMount = async () => {
    this.getData();
  };

  deletePlace = async event => {
    const index = event.target.value;
    const data = this.state.placesData[index];
    const id = data._id;
    await axios.post("/api/deletePlaceDataFromId/" + id, {
      FileName: data.FileName
    });

    this.getData();
  };

  deleteEvent = async event => {
    const index = event.target.value;
    const data = this.state.eventData[index];
    const id = data._id;
    await axios.post("/api/deleteEventDataFromId/" + id, {
      FileName: data.FileName
    });
    this.getData();
  };

  superUltimateConsolePlanel = () => {
    if (user === undefined || user !=='admin') {
      return;
    } else {
      return (
        <div className="container fluid">
          <br />
          <h1>THIS IS A SUPER ULTIMATE CONTOL PANEL</h1>
          <br />
          <Link to={{ pathname: "/addplace" }}>
            <Button primary content="Add place" />
          </Link>
          <Link to={{ pathname: "/addevent" }}>
            <Button primary content="Add event" />
          </Link>
          <Link to={{ pathname: "/createalbum" }}>
            <Button primary content="Create album" />
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.superUltimateConsolePlanel()}
        <div>
          <MainInfo
            eventData={this.state.eventData}
            placesData={this.state.placesData}
            deletePlace={this.deletePlace}
            deleteEvent={this.deleteEvent}
          />
        </div>
      </div>
    );
  }
}

export default Home;
