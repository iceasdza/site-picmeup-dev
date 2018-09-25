import React, { Component } from "react";
import TopicComponent from "../../components/topic/topicComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import { Button, Icon,Card,Image } from "semantic-ui-react";
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
      placeId:"",
      placeName:'',
      placeImage:''

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
      comments: data.comments,
      creator: data.creator,
      placeId:data.placeId
    });

    const place = await axios.get("/api/getPlaceInfoFromId/"+this.state.placeId)
    const placeData = place.data[0]
    this.setState({
        placeName:placeData.placeName,
        placeImage:placeData.images[0]
    })
  };
  renderPlace = () =>{
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
        <Button icon>
          แก้ไขกระทู้<Icon name="edit" />
        </Button>
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
      comments.push({ comment: this.state.text, commentator: "Guess" });
    } else {
      comments.push({
        comment: this.state.text,
        commentator: Cookies.get("user")
      });
    }
    this.setState({ comments: comments, text: "" });
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
        {console.log(this.state)}
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
        />
      </div>
    );
  }
}

export default TopicInfo;
