import React, { Component } from "react";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import {
  Header,
  Image,
  Table,
  Menu,
  Card,
  Icon,
  Button,
  Feed,
  Label
} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import LoadingScreen from "../../screen/loading";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import "../../../static/profile.css";
const user = Cookies.get("user");
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      userName: "",
      email: "",
      tel: "",
      messages: [],
      activeItem: "อัลบั้ม",
      albums: [],
      topics: [],
      commentedTopics: [],
      open: true,
      avatar: "",
      unreadMsg:0
    };
  }

  modalRemoveAlbum = async (id, albumName) => {
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการจะลบอัลบั้ม " + albumName + " หรือไม่ ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        axios.post("/api/deleteAlbum/" + id);
        swal("ลบเรียบร้อย!");
        this.getData();
      }
    });
  };

  modalRemoveTopic = async (id, albumName) => {
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการจะลบมีตติ้ง " + albumName + " หรือไม่ ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        axios.post("/api/deleteTopic/" + id);
        swal("ลบเรียบร้อย!");
        this.getData();
      }
    });
  };

  modalInbox = async (reciver, avatar, message, status, id) => {
    if (status) {
      axios.put("/api/changeMessageState/" + id);
    }
    if(this.state.unreadMsg===0){
    }else{
      this.setState({unreadMsg:this.state.unreadMsg-1})
    }
    this.getData();
    return swal({
      title: reciver + " กล่าวว่า : <br/>" + message,
      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const message = document.getElementById("swal-input1").value;
        const data = message.replace(/ /g, "");
        if (data === "") {
          return;
        } else {
          axios.post("/api/sendMessage", {
            content: message,
            sender: user,
            reciver: reciver,
            avatar: avatar
          });
        }
      }
    });
  };

  renderMessage = () => {
    return (
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="tableMessage">ผู้ส่ง</Table.HeaderCell>
            <Table.HeaderCell className="tableMessage">ตอบกลับ</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.messages.map((data, index) => (
            <Table.Row key={index} >
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={data.avatar} rounded size="mini" className="avatarProfile" />
                  <Header.Content className="messageOwner">
                    {data.sender}
                    <Header.Subheader>
                      {data.sendDate.replace(
                        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\D07:00)/,
                        "ส่งเมื่อ$3/$2/$1" + " เวลา $4:$5 น."
                      )}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {data.status ? (
                  <Icon.Group
                    size="big"
                    color="black"
                    name="mail"
                    onClick={e =>
                      this.modalInbox(
                        data.sender,
                        data.avatar,
                        data.content,
                        data.status,
                        data._id
                      )
                    }
                  >
                    <Icon name="mail" />
                    <Icon corner name="asterisk" color="red" />
                  </Icon.Group>
                ) : (
                  <Icon.Group
                    size="big"
                    color="black"
                    name="mail"
                    onClick={e =>
                      this.modalInbox(
                        data.sender,
                        data.avatar,
                        data.content,
                        data.status,
                        data._id
                      )
                    }
                  >
                    <Icon name="mail" />
                  </Icon.Group>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  getData = async () => {
    const resp = await axios.get("/api/profile/" + user);
    const data = resp.data;
    const message = await axios.get("/api/getMessageFromName/" + user);
    const album = await axios.get("/api/getAlbumFromName/" + user);
    const topic = await axios.get("api/getTopicFromName/" + user);
    const topicInteract = await axios.get("api/getInteractTopic/" + user);
    
    let unreadMsg = 0;
    message.data.forEach(element => {
      if(element.status===true){
        unreadMsg++
      }
    });
    if (topicInteract.status === 200) {
      const messageData = message.data;
      this.setState({
        unreadMsg:unreadMsg,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        userName: data.userName,
        email: data.email,
        tel: data.tel,
        avatar: data.avatar,
        value: data.status,
        messages: messageData,
        albums: album.data,
        topics: topic.data,
        commentedTopics: topicInteract.data,
        open: false
      });
    }
  };
  componentDidMount() {
    this.getData();
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
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
        <Card.Content>
          <span className="topicPlace">สถานที่ {data.topicPlace}
          <span className="topicDelete" onClick={e => this.modalRemoveTopic(data._id, data.topicName)}>ลบมีตติ้งนี้ &nbsp; <Icon name="trash"/></span>
          </span>
        </Card.Content>
      </Card>
    ));
  };

  renderInteractTopicList = () => {
    const data = this.state.commentedTopics;
    return data.map((data, index) => (
      <Card fluid key={index} className="interactedTopic">
        <Link
          to={{
            pathname: "/topic/",
            search: data.id
          }}
        >
          <Card.Content>
          <Feed>
          <Feed.Event>
          <Feed.Content>
            {/* <Feed.Date content={'กระทู้ของคุณ : '+data.creator} /> */}
            <Feed.Summary>
              กระทู้ : {data.name}
            </Feed.Summary>
            <Feed.Summary>
             <span className="comment">"{data.comment}"</span>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
          </Feed>
          </Card.Content>
          {/* <Card.Content header={"แสดงความคิดเห็นว่า : " + data.comment} /> */}
        </Link>
        <span>
          <Link
            to={{
              pathname: "/user/",
              search:data.creator
            }}
          >
            โดยคุณ : {data.creator}
          </Link>
        </span>
      </Card>
    ));
  };

  renderGalleryList = () => {
    return (
      <Card.Group itemsPerRow={4}>
        {this.state.albums.map((data, index) => (
          <Card key={index} className="showhotcard">
            <Button
              color="red"
              onClick={e => this.modalRemoveAlbum(data._id, data.albumName)}
              className="delAulbumBtn"
            >
              ลบอัลบั้มนี้{" "}
              <Icon name="trash"/>
            </Button>
            <Link
              to={{
                pathname: "/gallery/albumInfo/",
                search: data._id
              }}
            >
              <Image src={data.images[0]} className="showhotimage" />
              <div class="text-block">
              <div className="dataWrap">
              <h3 className="showhotname">โดยคุณ : {data.albumOwner}</h3>
                <h3 className="showhotname">อัลบั้ม : {data.albumName}</h3>
                <p className="description">{data.albumDes}</p>
              </div>
              </div>
            </Link>
          </Card>
        ))}
      </Card.Group>
    );
  };

  renderProfile = () => {
    return (
      <div>
        <center>
          <Image
            src={this.state.avatar}
            circular
            className="avatar-uploaded imageSize"
          />
          <p className="profileData">
            {this.state.firstName} {this.state.lastName}
          </p>
          <p className="profileData2">
            {this.state.userName} | {this.state.email}
          </p>
          <NavLink to="/editprofile">
            <span className="editProfile">แก้ไขโปรไฟล์</span>
          </NavLink>
        </center>
      </div>
    );
  };

  handleChangeContent = () => {
    const item = this.state.activeItem;
    switch (item) {
      case "อัลบั้ม":
        return this.renderGalleryList();
      case "ข้อความ":
        return this.renderMessage();
      case "มีตติ้ง":
        return this.renderTopicList();
      case "มีตติ้งที่แสดงความคิดเห็น":
        return this.renderInteractTopicList();
      default:
        this.renderProfile();
    }
  };
  render() {
    const { activeItem } = this.state;
    return (
      <div className="container fluid">
        <LoadingScreen open={this.state.open} />
        <div className="profileName">
        {this.renderProfile()}
        </div>
        <Menu tabular>
          <Menu.Item
            className="menuName"
            name="อัลบั้ม"
            active={activeItem === "อัลบั้ม"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="menuName"
            name="ข้อความ"
            active={activeItem === "ข้อความ"}
            onClick={this.handleItemClick}
          >ข้อความ{this.state.unreadMsg!==0? (<Label color='red'>{this.state.unreadMsg}</Label>):(<span/>)}
          </Menu.Item>
          <Menu.Item
            className="menuName"
            name="มีตติ้ง"
            active={activeItem === "มีตติ้ง"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="menuName"
            name="มีตติ้งที่แสดงความคิดเห็น"
            active={activeItem === "มีตติ้งที่แสดงความคิดเห็น"}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.handleChangeContent()}
      </div>
    );
  }
}

export default Profile;
