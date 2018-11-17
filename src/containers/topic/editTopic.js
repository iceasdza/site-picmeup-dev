import React, { Component } from "react";
import EditTopicComponent from "../../components/topic/editTopicComponent";
import axios from "../../lib/axios";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Redirect } from "react-router-dom";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label } from "semantic-ui-react";
import "../../static/topic.css";
class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      placesName: [],
      placeId: "",
      redirect: false,
      content: null,
      topicName: "",
      create_at: null,
      creator: "",
      comments: [],
      placeName:'',
      placeImage:'',
      _id:'',
      topicPlace:[],
      date:null,
      time:null
    };
  }

  handleChange = value => {
    this.setState({ content: value });
  };

  handleTime = value => {
    this.setState({ time: value });
  };

  handleDate = value => {
    this.setState({ date: value });
  };

  handleName = value => {
    this.setState({ topicName: value });
  };

  PlaceSelected = (field, value) => {
    console.log(value)
    this.setState({ placeId: value.id,topicPlace:value.name });
  };

  getData = async () => {
    let id = this.props.location.state.id;
    const resp = await axios.get("/api/getTopicFromId/" + id);
    const data = resp.data[0];
    this.setState({
      _id: data._id,
      content: data.content,
      topicName: data.topicName,
      create_at: data.create_date,
      comments: data.comments,
      creator: data.creator,
      placeId: data.placeId
    });

    const placesName = [];
    const resp2 = await axios.get("/api/getPlaceInfo");
    resp2.data.map((data, index) =>
      placesName.push({ key: index + 1, text: data.placeName, value:{id:data._id,name:data.placeName} })
    );
    this.setState({ placesName: placesName });
  };

  renderPlaceList = () => {
    return (
      <Dropdown
        selection
        placeholder="สถานที่จัดงาน"
        require="true"
        options={this.state.placesName}
        name="place_select"
        onChange={(e, { value }) => this.PlaceSelected("PlaceId", value)}
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
    if (this.state.placeId === "") {
      return;
    } else {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการจะบันทึกการแก้ไข้มมีตติ้ง " + this.state.topicName + " หรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
        axios.put("/api/updateTopic/"+this.state._id, {
        topicName: this.state.topicName,
        content: this.state.content,
        placeId: this.state.placeId,
        topicPlace:this.state.topicPlace,
        date:this.state.date,
        time:this.state.time
      }).then(value=>{
        if(value.status === 200){
          this.setState({ redirect: true }) 
        }
      })
        }
      });
    }
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/meeting" }} />;
    }
    return (
      <div>
        <Form>
          <EditTopicComponent
            renderPlaceList={this.renderPlaceList}
            text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleName={this.handleName}
            topicName={this.state.topicName}
            content={this.state.content}
            handleDate={this.handleDate}
            handleTime={this.handleTime}
            date={this.state.date}
            time={this.state.time}
          />
        </Form>
      </div>
    );
  }
}

export default CreateTopic;
