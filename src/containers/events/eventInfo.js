import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Divider, Form, Comment } from "semantic-ui-react";
import Cookies from "js-cookie";
import EventDetail from "../../components/events/eventInfo";
import axios from "../../lib/axios";

class EventInfo extends Component {
  state = {
    eventName: "",
    eventDes: "",
    tel: "",
    openTime: "",
    closeTime: "",
    fee: "no",
    carParking: "yes",
    days: [],
    tags: [],
    map: {
      latitude: 0,
      longtitude: 0
    },
    images: [],
    id: "",
    placeId: "",
    placeImage: "",
    placeName: "",
    open: false,
    index: null,
    comments: [],
    text:''
  };

  getData = async () => {
    let _id = this.props.location.search.slice(1);
    const resp = await axios.get("/api/getEventInfoFromId/" + _id);
    const data = resp.data[0];
    this.setState({
      eventName: data.eventName,
      eventDes: data.eventDes,
      tel: data.tel,
      openTime: data.openTime,
      closeTime: data.closeTime,
      fee: data.fee,
      carParking: data.carParking,
      days: data.days,
      tags: data.tags,
      FileList: data.FileList,
      placeId: data.PlaceId,
      images: data.images,
      comments: data.comments,
    });
    const place = await axios.get(
      "/api/getPlaceInfoFromId/" + this.state.placeId
    );
    const placeData = place.data[0];
    this.setState({
      placeName: placeData.placeName,
      placeImage: placeData.images[0]
    });

  };

  componentDidMount = () => {
    this.getData();
  };

  onOpenModal = value => {
    this.setState({ open: true, index: value });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleOnchage = e => {
    this.setState({ text: e });
  };

  handleSubmitComment = async () => {
    const id = this.props.location.search.replace("?", "");
    const comments = this.state.comments;
    if (Cookies.get("user") === undefined) {
      comments.push({ comment: this.state.text, commentator: "Guest" });
    } else {
      comments.push({
        comment: this.state.text,
        commentator: Cookies.get("user")
      });
    }
    this.setState({ comments: comments, text: "" });
    await axios.put("/api/addEventComment/" + id, {
      comments: this.state.comments
    });
    this.getData();
  };

  renderComment = () =>{
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
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
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

  render = () => {
    return (
      <div>
        <EventDetail
          eventName={this.state.eventName}
          eventDes={this.state.eventDes}
          tel={this.state.tel}
          openTime={this.state.openTime}
          closeTime={this.state.closeTime}
          fee={this.state.fee}
          carParking={this.state.carParking}
          days={this.state.days}
          tags={this.state.tags}
          images={this.state.images}
          placeId={this.state.placeId}
          placeImage={this.state.placeImage}
          placeName={this.state.placeName}
          index={this.state.index}
          onCloseModal={this.onCloseModal}
          onOpenModal={this.onOpenModal}
          open={this.state.open}
          renderComment={this.renderComment}
        />
      </div>
    );
  };
}

export default EventInfo;
