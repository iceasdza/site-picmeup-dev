import React, { Component } from "react";
import ProfileForm from "../../../components/users/profile/profileForm";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Header, Image, Table, Menu, Card, Icon ,Button} from "semantic-ui-react";
import { Link } from "react-router-dom";
// import AdminMain from "../../admin/adminMain";
import LoadingScreen from '../../screen/loading'
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
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
      activeItem: "profile",
      albums: [],
      topics:[],
      commentedTopics:[],
      open:true
    };
  }

  modalRemoveAlbum = async(id,albumName)=>{
      return(
        swal({
          title: 'คุณแน่ใจหรือ ?',
          text: "คุณต้องการจะลบอัลบั้ม "+albumName+" หรือไม่ ?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.value) {
            axios.post('/api/deleteAlbum/'+id)
            swal(
              'ลบเรียบร้อย!'
            )
            this.getData()
          }
        })
      )
  }

  modalRemoveTopic = async(id,albumName)=>{
    return(
      swal({
        title: 'คุณแน่ใจหรือ ?',
        text: "คุณต้องการจะลบมีตติ้ง "+albumName+" หรือไม่ ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const data = axios.post('/api/deleteTopic/'+id)
          swal(
            'ลบเรียบร้อย!'
          )
          this.getData()
        }
      })
    )
}

  modalInbox = async (reciver, avatar, message,status,id) => {
    if(status){
      axios.put('/api/changeMessageState/'+id)
    }
    this.getData()
    return swal({
      title: reciver + " says : <br/>" + message,
      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const message = document.getElementById("swal-input1").value;
        const data = message.replace(/ /g,'')
        if(data===""){
          return
        }else{
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
            <Table.HeaderCell>Sender</Table.HeaderCell>
            <Table.HeaderCell>ตอบกลับ</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.messages.map((data, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image src={data.avatar} rounded size="mini" />
                  <Header.Content>
                    {data.sender}
                    <Header.Subheader>
                      {data.sendDate.replace(
                        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\D07:00)/,"ส่งเมื่อ$3/$2/$1" + " เวลา $4:$5 น."
                      )}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {data.status ?                 <Icon.Group
                  size="big"
                  color="black"
                  name="mail"
                  onClick={e =>
                    this.modalInbox(data.sender, data.avatar, data.content,data.status,data._id)
                  }
                >
                  <Icon name="mail" />
                  <Icon corner name="asterisk" color="red" />
                </Icon.Group>:
                                <Icon.Group
                                size="big"
                                color="black"
                                name="mail"
                                onClick={e =>
                                  this.modalInbox(data.sender, data.avatar, data.content,data.status,data._id)
                                }
                              >
                                <Icon name="mail" />
                              </Icon.Group>
                }
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
    const topic = await axios.get('api/getTopicFromName/'+user)
    const topicInteract = await axios.get('api/getInteractTopic/'+user)
    if(topicInteract.status===200){
      const messageData = message.data;
      this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        userName: data.userName,
        email: data.email,
        tel: data.tel,
        value: data.status,
        messages: messageData,
        albums: album.data,
        topics:topic.data,
        commentedTopics:topicInteract.data,
        open:false
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
        <Card.Content >{data.creator + " : " + data.create_date} <Button color='red' onClick={e=>this.modalRemoveTopic(data._id,data.topicName)}>Delete</Button>
        </Card.Content>
           
      </Card>
    ));
  };


  renderInteractTopicList = () => {
    const data = this.state.commentedTopics;
    return data.map((data, index) => (
      <Card fluid key={index}>
        <Link
          to={{
            pathname: "/topic/",
            search: data.id
          }}
        >
          <Card.Content header={data.name} />
        </Link>
        {/* <Card.Content description={data.creator + " : " + data.create_date} /> */}
      </Card>
    ));
  };

  renderGalleryList = () => {
    return (
      
      <Card.Group itemsPerRow={4}>
        {this.state.albums.map((data, index) => (
          <Card key={index}>
            <Image src={data.images[0]} />
            <Card.Content>
              <Card.Header>
                <Link
                  to={{
                    pathname: "/gallery/albumInfo/",
                    search: data._id
                  }}
                >
                  <h3 className="">{data.albumName}</h3>
                </Link>
              </Card.Header>
              <Card.Description>{data.albumDes}</Card.Description>
              <Card.Description>{data.albumOwner}</Card.Description>
              <Card.Meta>
                <span className="date">{data.createDate}</span>
              </Card.Meta>
              <Button color='red' onClick={e=>this.modalRemoveAlbum(data._id,data.albumName)}>Delete</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };

  handleChangeContent = () => {
    const item = this.state.activeItem;
    switch (item) {
      case "profile":
        return (
          <ProfileForm
            renderMessage={this.renderMessage}
            handleChange={this.handleChange}
            status={this.state.status}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            gender={this.state.gender}
            userName={this.state.userName}
            email={this.state.email}
            tel={this.state.tel}
            onlineStatus={this.state.onlineStatus}
          />
        );
      case "photos":
        return this.renderGalleryList();
      case "message":
        return this.renderMessage();
        case "topic":
        return this.renderTopicList();
        case "กระทู้ที่แสดงความคิดเห็น":
        return this.renderInteractTopicList()
      default:
        return (
          <ProfileForm
            renderMessage={this.renderMessage}
            handleChange={this.handleChange}
            status={this.state.status}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            gender={this.state.gender}
            userName={this.state.userName}
            email={this.state.email}
            tel={this.state.tel}
            onlineStatus={this.state.onlineStatus}
          />
        );
    }
  };
  render() {
    const { activeItem } = this.state;
    return (
      <div className="container fluid">
                <LoadingScreen
          open={this.state.open}
          />
        <Menu tabular>
          <Menu.Item
            className="menuName"
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="menuName"
            name="photos"
            active={activeItem === "photos"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            className="menuName"
            name="message"
            active={activeItem === "message"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
          className="menuName"
          name="topic"
          active={activeItem === "topic"}
          onClick={this.handleItemClick}
        />
                  <Menu.Item
          className="menuName"
          name="กระทู้ที่แสดงความคิดเห็น"
          active={activeItem === "กระทู้ที่แสดงความคิดเห็น"}
          onClick={this.handleItemClick}
        />
        
        </Menu>
        {this.handleChangeContent()}
      </div>
    );
  }
}

export default Profile;
