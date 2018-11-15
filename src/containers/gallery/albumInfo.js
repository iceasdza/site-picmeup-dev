import React, { Component } from "react";
import AlbumInfoComponent from "../../components/gallery/albumInfoComponent";
import { Card, Comment, Form, Divider, Button } from "semantic-ui-react";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import LoadingScreen from "../screen/loading";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "../../static/image.css";
const user = Cookies.get("user");
export default class AlbumInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumOwner: "",
      albumName: "",
      albumDes: "",
      comments: [],
      createDate: "",
      images: [],
      text: "",
      open: true,
      id:''
    };
  }

  handleOnchage = e => {
    this.setState({ text: e });
  };

  modalImage = src => {
    return swal({
      imageUrl: src,
      width: "100%",
      imageWidth: 100
      // animation: true
    });
  };

  getData = async () => {
    let _id = this.props.location.search.slice(1);
    const resp = await axios.get("/api/getAlbumFromId/" + _id);
    if (resp.status === 200) {
      this.setState({
        id:resp.data[0]._id,
        albumOwner: resp.data[0].albumOwner,
        albumName: resp.data[0].albumName,
        albumDes: resp.data[0].albumDes,
        comments: resp.data[0].comments,
        createDate: resp.data[0].createDate,
        images: resp.data[0].images,
        open: false
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

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
    await axios.put("/api/addAlbumComment/" + id, {
      comments: this.state.comments
    });
    this.getData();
  };

  renderImages = () => {
    return (
      <Card.Group itemsPerRow={3} className="imageWrap">
        {this.state.images.map((data, index) => (
          <Card
            raised
            image={data}
            key={index}
            onClick={() => this.modalImage(data)}
          />
        ))}
      </Card.Group>
    );
  };

  renderEditButton = () => {
    if (this.state.albumOwner === user) {
      return (
        <div>
          <Link
            className="editAlbum"
            to={{
              pathname: "/editalbum",
              state: { id: this.state.id }
            }}
          >
            แก้ไขกระทู้
          </Link>
        </div>
      );
    } else {
      return <div />;
    }
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
              <Comment.Avatar as="avatar" src={data.avatar} className="avatarProfile"/>
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
    );
  };
  render() {
    return (
      <div className="container fluid">
        <LoadingScreen open={this.state.open} />
        {/* {this.renderEditButton()} */}
        <AlbumInfoComponent
          renderEditButton={this.renderEditButton}
           albumDes={this.state.albumDes}
          renderImages={this.renderImages}
          renderComment={this.renderComment}
        />
      </div>
    );
  }
}
