import React, { Component } from "react";
import Navbar from "../header/headercontrol";
import CreateTopicComponent from "../../components/topic/createTopicComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      topicName: ""
    };
  }

  handleChange = value => {
    this.setState({ text: value });
  };

  handleName = value => {
    this.setState({ topicName: value });
  };

  handleSubmit = async () => {
    await axios.post("/api/creatplace", {
      topicName: this.state.topicName,
      content: this.state.text,
      creator:Cookies.get("user")
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <CreateTopicComponent
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleName={this.handleName}
        />
      </div>
    );
  }
}

export default CreateTopic;
