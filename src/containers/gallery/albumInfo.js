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
import Slider from "react-slick";
import { Redirect } from "react-router-dom";
const user = Cookies.get("user");
let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
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
      id:'',
      isRedirect:false
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
    try{
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
  }catch(err){
    this.setState({isRedirect:true})
  }
  };

  componentDidMount() {
    this.getData();
  }

  handleSubmitComment = async () => {
    const id = this.props.location.search.replace("?", "");
    const comments = this.state.comments;
    if (Cookies.get("user") === undefined) {
      comments.push({ comment: this.state.text, commentator: "Guest",avatar:'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg' });
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
      <Slider {...settings}>
        {this.state.images.map((data, index) => (
          <Card
            raised
            className="albumsImage"
            image={data}
            key={index}
            onClick={() => this.modalImage(data)}
          />
        ))}
      </Slider>
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
            แก้ไขอัลบั้ม
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
        <Divider horizontal>ควาคิดเห็น</Divider>
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
              <Comment.Avatar as="avatar" src={data.avatar} className="avatarProfile"/>
              <Comment.Content>
              {data.commentator !== 'Guest' ? (
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
              ):(
                <Comment.Author>
                แสดงความคิดเห็นโดยคุณ {" "}
                  <span className="creator">{data.commentator}</span>
              </Comment.Author>
              )}
                <Comment.Text>{data.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    );
  };
  render() {
    if(this.state.isRedirect){
      this.setState({open:false})
      return <Redirect to={{ pathname: "/*" }} />;
    }
    return (
      <div className="container fluid">
        <LoadingScreen open={this.state.open} />
        <AlbumInfoComponent
        albumName={this.state.albumName}
        albumOwner={this.state.albumOwner}
          renderEditButton={this.renderEditButton}
           albumDes={this.state.albumDes}
          renderImages={this.renderImages}
          renderComment={this.renderComment}
        />
      </div>
    );
  }
}
