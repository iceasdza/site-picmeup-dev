import React, { Component } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import {
  Header,
  Image,
  Table,
  Menu,
  Card,
  Label,
  Icon,
  Button
} from "semantic-ui-react";
import Cookies from "js-cookie";
import swal from "sweetalert2";
import Slider from "react-slick";
const user = Cookies.get("user");
const avatar = Cookies.get('userAvatar')
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
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      topics: [],
      user: [],
      open: true
    };
  }

  getData = async () => {
    const user = this.props.location.search.replace("?", "");
    const data = await axios.get("/api/profile/" + user);
    const album = await axios.get("/api/getAlbumFromName/" + user);
    const topic = await axios.get("api/getTopicFromName/" + user);
    if (topic.status === 200 && data.status === 200 && album.status === 200) {
      this.setState({
        user: data.data,
        albums: album.data,
        topics: topic.data
      });
    }
  };

  modalInbox = async (reciver, avatar) => {
    return swal({
      title: "Send message to " + reciver,
      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const message = document.getElementById("swal-input1").value;
        axios.post("/api/sendMessage", {
          content: message,
          sender: user,
          reciver: this.state.user.userName,
          avatar: avatar
        }).then(result=>{
          console.log(result)
        });
      }
    });
  };

  renderTopicList = () => {
    const data = this.state.topics;
    return data.map((data, index) => (
      <Card fluid key={index}>
        <Link
          to={{
            pathname: "/topic/",
            search: data._id
          }}
        >
          <Card.Content header={data.topicName} />
        </Link>
        <Card.Content>{data.creator + " : " + data.create_date}</Card.Content>
      </Card>
    )
    );
  };

  renderGalleryList = () => {
    return (
      <div className="userAlbumWraper">
      <h1>อัลบั้มของคุณ {this.state.user.userName}</h1>
      <Slider {...settings}>
        {this.state.albums.map((data, index) => (
          <Card key={index} className="albumCard">
            <Image src={data.images[0]} className="userAlbums" />
            <Link
                  to={{
                    pathname: "/gallery/albumInfo/",
                    search: data._id
                  }}
                >
            <div class="text-block">
                    <h3 className="showhotname">{data.albumName}</h3>
                    <p className="description">{data.albumDes}</p>
                  </div>
                  </Link>
          </Card>
        ))}
      </Slider>
    </div>
    );
  };

  renderProfile = () => {
    return (
      <div>
        <center>
          <Image
            src={this.state.user.avatar}
            circular
            className="avatar-uploaded imageSize"
          />
          <h1>{this.state.user.userName}</h1>
          {user!==this.state.user.userName && user!==undefined ? (
            <span className="sendMsg">ส่งข้อความ
                          <Icon
                            color="black"
                            name="mail"
                            onClick={e =>
                              this.modalInbox(user,avatar)
                            }
                          />
                          </span>
                        ) : (
                          <span></span>
                        )}
        </center>
      </div>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="container fluid">
      <br/>
        {this.renderProfile()}
        {this.renderGalleryList()}
        <h1>มีตติ้งของคุณ {this.state.user.userName}</h1>
        {this.renderTopicList()}
        <br/>
      </div>
    );
  }
}
export default UserDetail;
