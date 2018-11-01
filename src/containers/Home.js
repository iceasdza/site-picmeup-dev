import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import "../static/home.css";
import "../static/showdata.css";
import MainInfo from "../components/main/mainInfo";
import Cookies from "js-cookie";
import { Form } from "formsy-semantic-ui-react";
import { Input } from "semantic-ui-react";
import LoadingScreen from "../containers/screen/loading";
import { Accordion, Icon } from "semantic-ui-react";
import Autocomplete from "react-autocomplete";
import '../static/autocomplete.css'
const user = Cookies.get("user");
class Home extends Component {
  state = {
    placesData: [],
    eventData: [],
    open: true,
    targetId: "",
    FileName: [],
    tagName: "",
    activitiesData: [],
    activeActivity: "",
    newActivity: "",
    recomendPlace: [],
    activityName: "",
    activeIndex: 0,
    value:''
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
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
    const resp = await this.getActivityDetail();
    if (resp) {
      this.getPlaceFromActivity();
    }
  };

  getPlaceFromActivity = async () => {
    const resp = await axios.get(
      "/api/getPlaceFromActivity/" + this.state.activeActivity
    );
    console.log(resp.data);
    if (resp.status === 200) {
      this.setState({
        recomendPlace: resp.data,
        open: false
      });
    }
  };

  getActivityDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/getAllActivity");
    resp.data.map((data, index) => {
      if (data.status === true) {
        this.setState({ activeActivity: data.activityName });
      } else {
        arr.push({
          id:index,
          label:data.activityName
        });
      }
    });
    this.setState({ activitiesData: arr });
    return true;
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
  handleChageActivetyValue = e => {
    this.setState({ activityName: e });
  };
  handleAddActivity = async () => {
    await axios.post("/api/addActivity", {
      activityName: this.state.activityName
    });
    this.setState({ activityName: "" });
  };

  handleAddTag = async () => {
    await axios.post("/api/addTag", {
      tagName: this.state.tagName
    });
    this.setState({ tagName: "" });
  };

  handleChageTagActive = async () => {
    const newActivity = this.state.newActivity;
    const activeActivity = this.state.activeActivity;
    console.log(newActivity, activeActivity);
    const resp = await axios.put("/api/updateActivity", {
      oldTag: this.state.activeActivity,
      newTag: this.state.newActivity
    });
    if (resp.status === 200) {
      this.getActivityDetail();
      this.setState({ activeActivity: newActivity, newActivity: " " });
    }
  };
  TagSelected = (field, value) => {
    this.setState({ newActivity: value });
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
          <Accordion>
            <Accordion.Title
              active={this.state.activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              create content
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
            <Link to={{ pathname: "/addplace" }}>
            <Button primary content="Add place" />
          </Link>
          <Link to={{ pathname: "/addevent" }}>
            <Button primary content="Add event" />
          </Link>
          <Link to={{ pathname: "/createalbum" }}>
            <Button primary content="Create album" />
          </Link>
            </Accordion.Content>

            <Accordion.Title
              active={this.state.activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Tag Manage
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <p>
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
                <br />
                <Form.Button content="Submit" />
              </Form.Field>
            </Form>
              </p>
            </Accordion.Content>

            <Accordion.Title
              active={this.state.activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Activity Mange
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 2}>
            <div>


<br />
<Form onSubmit={this.handleAddActivity}>
  <Form.Field required>
    <label>add activity</label>
    <Input
      require="true"
      placeholder="Activity name"
      value={this.state.activityName}
      onChange={e => this.handleChageActivetyValue(e.target.value)}
    />
    <br />
    <br />
    <Form.Button content="Submit" />
  </Form.Field>
</Form>

<Form onSubmit={this.handleChageTagActive}>
  <br />
  <h1>Active tag : {this.state.activeActivity}</h1>
      <Autocomplete
      items={this.state.activitiesData}
      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.label}
      renderItem={(item,isHighlighted) => (
        <div key={item.id} className="itemSearch"  style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item.label}
        </div>
      )}
      value={this.state.newActivity}
      onChange={e => this.setState({ newActivity: e.target.value })}
      onSelect={newActivity => this.setState({ newActivity })}
    />
  {/* <Dropdown
    selection
    options={this.state.activitiesData}
    placeholder="แท็ก"
    require="true"
    name="place_open"
    errorLabel={<Label color="red" pointing />}
    value={this.state.newActivity}
    validations={{
      customValidation: (values, value) =>
        !(!value || value.length < 1)
    }}
    validationErrors={{ customValidation: "เลือกแท็ก" }}
    onChange={(e, { value }) => this.TagSelected("newTag", value)}
  /> */}
  <br/>
  <br/>
  <Form.Button content="Submit" />
</Form>
</div>
            </Accordion.Content>
          </Accordion>
        
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
            recomendPlace={this.state.recomendPlace}
            eventData={this.state.eventData}
            placesData={this.state.placesData}
            deletePlace={this.deletePlace}
            deleteEvent={this.deleteEvent}
            activeActivity={this.state.activeActivity}
          />
        </div>
      </div>
    );
  }
}

export default Home;
