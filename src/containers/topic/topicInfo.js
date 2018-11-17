import React, { Component } from "react";
import TopicComponent from "../../components/topic/topicComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import { Button, Card, Image, Form, Divider, Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";
let user = Cookies.get("user");

class TopicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      topicName: "",
      create_at: null,
      creator: "",
      comments: [],
      text: "",
      placeId: "",
      placeName: '',
      placeImage: '',
      _id: '',
      date: null,
      time: null
    };
  }

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
      placeId: data.placeId,
      date: data.date.substring(0, 10),
      time: data.time.substring(11, 16)
      // date:data.date,
      // time:data.time
    });

    const place = await axios.get("/api/getPlaceInfoFromId/" + this.state.placeId)
    const placeData = place.data[0]
    this.setState({
      placeName: placeData.placeName,
      placeImage: placeData.images[0]
    })
  };
  renderPlace = () => {
    return (
      <Card>

        <Image src={this.state.placeImage} />
        {this.state.placeName}
        <Card.Content>
          <Link
            to={{
              pathname: "/placeInfo",
              search: this.state.placeId
            }}
          >
            <Button primary content="View" />
          </Link>
        </Card.Content>
      </Card>
    )
  }
  handleOnchage = e => {
    this.setState({ text: e });
  };

  editTopic = () => {
    let tag = "";
    if (user === this.state.creator) {
      tag = (
        <Link
          to={{
            pathname: "/editTopic/",
            state: { id: this.state._id }
          }}
        >
          <Button content="edit" />
        </Link>
      );
    } else {
      tag = ''
    }
    return tag
  };

  handleSubmitComment = async () => {
    const id = this.props.location.search.replace("?", "");
    const comments = this.state.comments;
    if (Cookies.get("user") === undefined) {
      comments.push({ comment: this.state.text, commentator: "Guest" });
    } else {
      comments.push({
        comment: this.state.text,
        commentator: Cookies.get("user"),
        avatar: Cookies.get("userAvatar")
      });
    }
    this.setState({ comments: comments, text: "" });
    await axios.put("/api/addTopicComment/" + id, {
      comments: this.state.comments
    });
    this.getData();
  };

  renderComment = () => {
    return (
      <div className="container fluid">
        <Divider horizontal>Comments</Divider>
        <Form onSubmit={this.handleSubmitComment}>
          <Form.TextArea
            label="เขียนควาคิดเห็น"
            placeholder="แสดงความคิดเห็น"
            value={this.state.text}
            onChange={e => this.handleOnchage(e.target.value)}
            required
          />
          <Form.Button>ตกลง</Form.Button>
        </Form>
        <Divider />
        <Comment.Group>
          {this.state.comments.map((data, index) => (
            <Comment key={index}>
              <Comment.Avatar
                as="avatar"
                src={data.avatar}
              />
              <Comment.Content>
                <Comment.Author>
                  แสดงความคิดเห็นโดยคุณ {data.commentator}
                </Comment.Author>
                <Comment.Text>{data.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    )
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <TopicComponent
          topicName={this.state.topicName}
          content={this.state.content}
          comments={this.state.comments}
          creator={this.state.creator}
          handleOnchage={this.handleOnchage}
          editTopic={this.editTopic}
          text={this.state.text}
          handleSubmitComment={this.handleSubmitComment}
          renderPlace={this.renderPlace}
          renderComment={this.renderComment}
          date={this.state.date}
          time={this.state.time}
        />
      </div>
    );
  }
}

export default TopicInfo;
