import React, { Component } from "react";
import CreateTopicComponent from "../../components/topic/createTopicComponent";
import axios from "../../lib/axios";
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
      topicName: "",
      placesName: [],
      placeId:''
    };
  }

  handleChange = value => {
    this.setState({ text: value });
  };

  handleName = value => {
    this.setState({ topicName: value });
  };

  PlaceSelected = (field, value) => {
    this.setState({ placeId: value });
  };

  getData = async () => {
    const placesName = [];
    const resp = await axios.get("/api/getPlaceInfo");
    resp.data.map((data, index) =>
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
        // renderLabel={renderLabel}
        require="true"
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
    await axios.post("/api/creatplace", {
      topicName: this.state.topicName,
      content: this.state.text,
      creator: Cookies.get("user"),
      placeId:this.state.placeId
    });
  };
  render() {
    return (
      <div>
        <Form>
          <CreateTopicComponent
            renderPlaceList={this.renderPlaceList}
            text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleName={this.handleName}
          />
        </Form>
      </div>
    );
  }
}

export default CreateTopic;
