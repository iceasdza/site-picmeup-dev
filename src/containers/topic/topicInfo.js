import React, { Component } from "react";
import Navbar from "../../components/header/header";
import TopicComponent from "../../components/topic/topicComponent";
import axios from "../../lib/axios";
class TopicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      topicName: "",
      create_at: null,
      creator: "",
      comments: [],
      text:''
    };
  }

  getData = async () => {
    const id = this.props.location.search.replace("?", "");
    const resp = await axios.get("/api/getTopicFromId/" + id);
    const data = resp.data[0];
    this.setState({
      content: data.content,
      topicName: data.topicName,
      create_at: data.create_date,
      comments: data.comments
    });
  };

  handleOnchage = e => {
      this.setState({text:e})
  };

  handleSubmitComment = async () => {
    const id = this.props.location.search.replace("?", "");
    const comments = this.state.comments
    comments.push(this.state.text)
    this.setState({comments:comments,text:''})
    await axios.put("/api/addTopicComment/" + id, {
      comments: this.state.comments
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Navbar />
        <TopicComponent
          topicName={this.state.topicName}
          content={this.state.content}
          comments={this.state.comments}
          creator={this.state.creator}
          handleOnchage={this.handleOnchage}
          text={this.state.text}
          handleSubmitComment={this.handleSubmitComment}
        />
      </div>
    );
  }
}

export default TopicInfo;
