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
      _id:''
    };
  }

  handleChange = value => {
    this.setState({ content: value });
  };

  handleName = value => {
    this.setState({ topicName: value });
  };

  PlaceSelected = (field, value) => {
    this.setState({ placeId: value });
  };

  getData = async () => {
    const id = this.props.location.search.replace("?", "");
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
      placesName.push({ key: index + 1, text: data.placeName, value: data._id })
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
        value={this.state.placeId}
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
        placeId: this.state.placeId
      }).then(value=>{
        if(value.status === 200){
          this.setState({ redirect: true }) 
        }
      })
        }
      });
      // await axios.put("/api/updateTopic/"+this.state._id, {
      //   topicName: this.state.topicName,
      //   content: this.state.content,
      //   placeId: this.state.placeId
      // });
      // this.setState({ redirect: true });
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
            {console.log(this.state.content)}
          <EditTopicComponent
            renderPlaceList={this.renderPlaceList}
            text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleName={this.handleName}
            topicName={this.state.topicName}
            content={this.state.content}
          />
        </Form>
      </div>
    );
  }
}

export default CreateTopic;
