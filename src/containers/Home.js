import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import "../static/home.css";
import "../static/showdata.css";
import MainInfo from "../components/main/mainInfo";
import Cookies from "js-cookie";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label,Input } from "semantic-ui-react";
import LoadingScreen from "../containers/screen/loading";

const user = Cookies.get("user");
class Home extends Component {
  state = {
    placesData: [],
    eventData: [],
    open: true,
    targetId: "",
    FileName: [],
    tagName:''
  };

  getData = async () => {
    const places = await axios.get("/api/getPlaceInfo");
    const events = await axios.get("/api/GetEventInfo");

    console.log(places.data);
    if (places.status === 200 && events.status === 200) {
      this.setState({
        placesData: places.data,
        eventData: events.data,
        open: false
      });
    }
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

  handleChage = (e) =>{
     this.setState({tagName:e})
  }

  handleAddTag = async () =>{
    // e.preventDefault()
    // console.log(this.state.tagName)
    await axios.post('/api/addTag',{
      tagName : this.state.tagName
    })
    this.setState({tagName:''})
  }

  superUltimateConsolePlanel = () => {
    if (user === undefined || user !== "admin") {
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
          <div>
            <br />
            <Form onSubmit={this.handleAddTag}>
              <Form.Field required>
                <label>add tag</label>
                <Input required={true} placeholder="TAGNAME" value={this.state.tagName} onChange={e=>this.handleChage(e.target.value)} />
                <Form.Button content='Submit' />
              </Form.Field>
            </Form>
            <Form>
              {/* <Dropdown                    
          selection
          options={optionsTime}
          placeholder="แท็ก"
          // renderLabel={renderLabel}
          require="true"
          name="place_open"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "จำเป็นต้องใส่เวลาเปิด" }}
        /> */}
            </Form>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <LoadingScreen open={this.state.open} />
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
