import React, { Component } from "react";
import CreateTopicComponent from "../../components/topic/createTopicComponent";
import axios from "../../lib/axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label } from "semantic-ui-react";
import '../../static/topic.css'
// const renderLabel = label => ({
//   color: "blue",
//   content: `${label.text}`,
//   icon: "check"
// });

class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",      
      topicName: '',
      placesName: [],
      placeId: '',
      redirect: false,
      topicPlace: '',
      date: '',
      time: '',
      dateCheck: '',
      timeCheck: '',
      textCheck: ''
    };
  }

  handleChange = value => {
    this.setState({ text: value , textCheck:'' });    
  };

  handleDate = value => {
    this.setState({ date: value , dateCheck:'' });
  };

  handleTime = value => {
    this.setState({ time: value , timeCheck:'' });
  };

  handleName = value => {
    this.setState({ topicName: value });
  };

  PlaceSelected = (field, value) => {
    this.setState({ placeId: value.id, topicPlace: value.name });
  };

  getData = async () => {
    const placesName = [];
    const resp = await axios.get("/api/getPlaceInfo");
    resp.data.map((data, index) =>
      placesName.push({ key: index + 1, text: data.placeName, value: { id: data._id, name: data.placeName } })
    );
    this.setState({ placesName: placesName });
  };

  renderPlaceList = () => {
    return (
      <Dropdown
        selection
        options={this.state.placesName}
        placeholder="สถานที่จัดงาน"
        require="true"
        name="place_select"
        onChange={(e, { value }, ) => this.PlaceSelected("PlaceId", value)}
        errorLabel={<Label color="red" pointing />}
        validations={{
          customValidation: (values, value) => !(!value || value.length < 1)
        }}
        validationErrors={{ customValidation: "กรุณาเลือกสถานที่" }}
      />
    );
  };

  componentDidMount = () => {
    this.getData();
  };

  handleSubmit = async () => {
    if (this.state.placeId === '' || this.state.topicName === '' || this.state.text === '' || this.state.date === '' || this.state.time === ''){
      if(this.state.text === ""){
      this.setState({textCheck:'โปรดใส่รายละเอียดการนัดหมาย'})}else{this.setState({textCheck:''})}
      if(!this.state.time){ 
      this.setState({timeCheck:'โปรดใส่รายเวลาที่นัดหมาย'})}else{this.setState({timeCheck:''})}
      if(!this.state.date){
      this.setState({dateCheck:'โปรดใส่รายวันที่นัดหมาย'})}else{this.setState({dateCheck:''})} 
      return
    } else {
      await axios.post("/api/createTopic", {
        topicName: this.state.topicName,
        content: this.state.text,
        creator: Cookies.get("user"),
        placeId: this.state.placeId,
        topicPlace: this.state.topicPlace,
        date: this.state.date,
        time: this.state.time
      });
      this.setState({ redirect: true })
    }

  };

  render() {
    const { redirect } = this.state
    if (redirect) {
      return (
        <Redirect
          to={{ pathname: "/meeting" }}
        />
      )
    }
    return (
      <div>
        <Form>
          <CreateTopicComponent
            renderPlaceList={this.renderPlaceList}
            text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleName={this.handleName}
            handleDate={this.handleDate}
            handleTime={this.handleTime}
            date={this.state.date}
            time={this.state.time}
            dateCheck={this.state.dateCheck}
            timeCheck={this.state.timeCheck}
            textCheck={this.state.textCheck}
          />
        </Form>
      </div>
    );
  }
}

export default CreateTopic;
