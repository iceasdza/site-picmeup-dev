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
import { Label, Input } from "semantic-ui-react";
import LoadingScreen from "../containers/screen/loading";

const user = Cookies.get("user");
class Home extends Component {
  state = {
    placesData: [],
    eventData: [],
    open: true,
    targetId: "",
    FileName: [],
    tagName: "",
    tagsData: [],
    activeTag: "",
    newTag:''
  };

  getData = async () => {
    const places = await axios.get("/api/getPlaceInfo");
    const events = await axios.get("/api/GetEventInfo");
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
    this.getTagDetail();
  };
  getTagDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/getAllTags");
    resp.data.map((data, index) => {
      if (data.tagStatus === true) {
        this.setState({ activeTag: data.tagName });
      } else {
        arr.push({ key: index + 1, text: data.tagName, value: data.tagName });
      }
    });
    this.setState({ tagsData: arr });
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

  handleChage = e => {
    this.setState({ tagName: e });
  };

  handleAddTag = async () => {
    await axios.post("/api/addTag", {
      tagName: this.state.tagName
    });
    this.setState({ tagName: "" });
  };

  handleChageTagActive= async() =>{
    const newActive = this.state.newTag
    const resp = await axios.put('/api/updateActiveTag',{
      oldTag : this.state.activeTag,
      newTag : this.state.newTag
    })
    if(resp.status ===200){
      this.getTagDetail()
      this.setState({activeTag:newActive,newTag:' '})
    }
  }
  TagSelected = (field, value) => {
    this.setState({ newTag: value });
  };

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
                <Input
                  require="true"
                  placeholder="TAGNAME"
                  value={this.state.tagName}
                  onChange={e => this.handleChage(e.target.value)}
                />
                <br />
                <Form.Button content="Submit" />
              </Form.Field>
            </Form>

            <Form onSubmit={this.handleChageTagActive}>
            <h1> {this.state.activeTag}</h1>
              <Dropdown
                selection
                options={this.state.tagsData}
                placeholder="แท็ก"
                require="true"
                name="place_open"
                errorLabel={<Label color="red" pointing />}
                value={this.state.newTag}
                validations={{
                  customValidation: (values, value) =>
                    !(!value || value.length < 1)
                }}
                validationErrors={{ customValidation: "เลือกแท็ก" }}
                onChange={(e, { value }) => this.TagSelected("newTag", value)}
              />
              <Form.Button content='Submit' />
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
