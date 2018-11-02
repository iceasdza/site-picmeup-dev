import React, { Component } from "react";
import ProfileForm from "../../../components/users/profile/profileForm";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Header, Image, Table, Menu,Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AdminMain from "../../admin/adminMain";
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
      albums:[]
    };
  }

  renderMessage = () => {
    return (
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sender</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
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
                        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\D07:00)/,
                        "ส่งเมื่อ$3/$2/$1" + " เวลา $4:$5 น."
                      )}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{data.content}</Table.Cell>
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
    const album = await axios.get('/api/getAlbumFromName/'+user)
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
      albums:album.data
    });

  };
  componentDidMount() {
    this.getData();
  }


  handleItemClick = (e, { name }) =>{
    this.setState({ activeItem: name })
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
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };

  handleChangeContent = () =>{
    const item = this.state.activeItem
    switch (item){
      case 'profile':return(
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
      )
      break
      case 'photos':return(this.renderGalleryList())
      break
      case 'message':return(
        this.renderMessage()
      )
    }
  }
  render() {
    const { activeItem } = this.state;

    if (user === "admin") {
      return <AdminMain />;
    }
    return (
      <div className="container fluid">
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
        </Menu>
        {this.handleChangeContent()}

      </div>
    );
  }
}

export default Profile;
