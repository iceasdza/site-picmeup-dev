import React, { Component } from "react";
import ProfileForm from "../../../components/users/profile/profileForm";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Header, Image, Table } from 'semantic-ui-react'
import AdminMain from '../../admin/adminMain'
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
      messages:[]
    };
  }

  renderMessage = () =>{
    return(
      <Table basic='very' celled collapsing>
          <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sender</Table.HeaderCell>
        <Table.HeaderCell>Message</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {this.state.messages.map((data,index)=>(
              <Table.Row key={index}>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={data.avatar} rounded size='mini' />
                  <Header.Content>
                    {data.sender}
                    <Header.Subheader>{data.sendDate.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\D07:00)/,'ส่งเมื่อ$3/$2/$1'+' เวลา $4:$5 น.')}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{data.content}</Table.Cell>
            </Table.Row>
      ))}
    </Table.Body>
      </Table>
    )
  }


  getData = async () => {
    const resp = await axios.get("/api/profile/" + user);
    const data = resp.data;
    const message = await axios.get('/api/getMessageFromName/'+user);
    const messageData  = message.data
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      userName: data.userName,
      email: data.email,
      tel: data.tel,
      value:data.status,
      messages:messageData
    });

    this.state
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    if (user==='admin') {
      return (
        <AdminMain/>
      )
    }
    return (
      <div>
        
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
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default Profile;
