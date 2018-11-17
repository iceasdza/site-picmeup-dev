import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Divider, Form, Comment,Button } from "semantic-ui-react";
import Cookies from "js-cookie";
import EventDetail from "../../components/events/eventInfo";
import axios from "../../lib/axios";
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { Link } from "react-router-dom";
import '../../static/image.css'
import LoadingScreen from '../screen/loading'
class EventInfo extends Component {
  state = {
    eventName: "",
    eventDes: "",
    content: "",
    openTime: "",
    closeTime: "",
    fee: "no",
    feePrice:0,
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
    open: true,
    index: null,
    comments: [],
    text:''
  };

  modalImage = (src) =>{
    return(
      swal({
        imageUrl: src,
        width:'100%',
        imageWidth:100,
        // animation: true
      })
    )
  }

  getData = async () => {
    let _id = this.props.location.search.slice(1);
    const resp = await axios.get("/api/getEventInfoFromId/" + _id);
    if(resp.status ===200){
      const data = resp.data[0];
      this.setState({
        eventName: data.eventName,
        eventDes: data.eventDes,
        content: data.content,
        openTime: data.openTime,
        closeTime: data.closeTime,
        fee: data.fee,
        feePrice: data.feePrice,
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
      if(place.status ===200){
        const placeData = place.data[0];
        this.setState({
          placeName: placeData.placeName,
          placeImage: placeData.images[0],
          open:false
        });
    
      }

    }


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
        commentator: Cookies.get("user"),
        avatar:Cookies.get("userAvatar")
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
          <LoadingScreen
          open={this.state.open}
          />
        <Divider horizontal>ความคิดเห็น</Divider>
        <Form onSubmit={this.handleSubmitComment}>
          <Form.TextArea
            label="เขียนควาคิดเห็น"
            placeholder="แสดงความคิดเห็น"
            value={this.state.text}
            onChange={e => this.handleOnchage(e.target.value)}
            required
          />
           <Button className="commentBtn">ตกลง</Button>
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
                  แสดงความคิดเห็นโดยคุณ {" "}
                  <Link
                    to={{
                      pathname: "/user/",
                      search: data.commentator
                    }}
                  >
                    <span className="creator">{data.commentator}</span>
                  </Link>
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
        modalImage={this.modalImage}
          eventName={this.state.eventName}
          eventDes={this.state.eventDes}
          content={this.state.content}
          openTime={this.state.openTime}
          closeTime={this.state.closeTime}
          fee={this.state.fee}
          feePrice={this.state.feePrice}
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
