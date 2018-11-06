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
import "../static/autocomplete.css";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
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
    value: "",
    activeContent:'',
    activityText:'',
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

  handleChageActivityContent = (e) =>{
    this.setState({ activeContent: e });
  }

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
        this.setState({ activeActivity: data.activityName,activityText:data.content });
      } else {
        arr.push({
          id: index,
          label: data.activityName
        });
      }
    });
    this.setState({ activitiesData: arr });
    return true;
  };

  removeData = async (field, id, name) => {
    if (field === "event") {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการจะลบ " + name + " หรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          axios.post("/api/deleteEventDataFromId/" + id);
          swal("ลบเรียบร้อย!");
          this.getData();
        }
      });
    }
    if (field === "place") {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการจะลบ " + name + " หรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          axios.post("/api/deletePlaceDataFromId/" + id);
          swal("ลบเรียบร้อย!");
          this.getData();
        }
      });
    }
    // return(
    //   swal({
    //     title: 'คุณแน่ใจหรือ ?',
    //     text: "คุณต้องการจะลบ "+name+" หรือไม่ ?",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes'
    //   }).then((result) => {
    //     if (result.value) {
    //       axios.post('/api/deleteAlbum/'+id)
    //       swal(
    //         'ลบเรียบร้อย!'
    //       )
    //       this.getData()
    //     }
    //   })
    // )
  };

  handleChage = e => {
    this.setState({ tagName: e });
  };
  handleChageActivetyValue = e => {
    this.setState({ activityName: e });
  };
  handleAddActivity = async () => {
    // await axios.post("/api/addActivity", {
    //   activityName: this.state.activityName
    // });
    // this.setState({ activityName: "" });
    const activity = this.state.activityName;
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการเพิ่มกิจกรรม" + activity + "ในระบบหรือไม่ ?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        axios.post("/api/addActivity", {
          activityName: activity
        });
        this.setState({ activityName: "" });
        swal("เพิ่มสำเร็จ!");
        this.getData();
      }
    })
  };

  handleAddTag = async () => {
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการเพิ่มแท็ก" + this.state.tagName + "ในระบบหรือไม่ ?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
    axios.post("/api/addTag", {
      tagName: this.state.tagName
    });
    this.setState({ tagName: "" });
        swal("เพิ่มสำเร็จ!");
        this.getData();
      }
    });
  };

  handleChageTagActive = async () => {
    const newActivity = this.state.newActivity;
    const activeActivity = this.state.activeActivity;
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text:
        "คุณต้องการจะเปลี่ยนกิจกรรม" +
        activeActivity +
        "เป็น" +
        newActivity +
        " หรือไม่ ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        axios.put("/api/updateActivity", {
          oldTag: this.state.activeActivity,
          newTag: this.state.newActivity,
          content:this.state.activeContent
        });
        // this.getActivityDetail();
        this.setState({ activeActivity: newActivity, newActivity: " " ,activeContent:""});
        this.getData();
      }
    });
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
                      onChange={e =>
                        this.handleChageActivetyValue(e.target.value)
                      }
                    />
                    <br />
                    <Form.Button content="Submit" />
                  </Form.Field>
                </Form>

                <Form onSubmit={this.handleChageTagActive}>
                  <h1>Active tag : {this.state.activeActivity}</h1>
                  <br/>
                  <Input
                    fluid
                      require="true"
                      placeholder="คำอธิบายแท็ก"
                      value={this.state.activeContent}
                      onChange={e =>
                        this.handleChageActivityContent(e.target.value)
                      }
                    />
                  <Autocomplete
                    items={this.state.activitiesData}
                    shouldItemRender={(item, value) =>
                      item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    getItemValue={item => item.label}
                    renderItem={(item, isHighlighted) => (
                      <div
                        key={item.id}
                        className="itemSearch"
                        style={{
                          background: isHighlighted ? "lightgray" : "white"
                        }}
                      >
                        {item.label}
                      </div>
                    )}
                    value={this.state.newActivity}
                    onChange={e =>
                      this.setState({ newActivity: e.target.value })
                    }
                    onSelect={newActivity => this.setState({ newActivity })}
                  />
                 
                  <br />
                
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
            removeData={this.removeData}
            activityText={this.state.activityText}
          />
        </div>
      </div>
    );
  }
}

export default Home;
