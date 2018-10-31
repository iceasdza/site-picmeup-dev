import React, { Component } from "react";
import ProfileForm from "../../../components/users/profile/profileForm";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Form } from "semantic-ui-react";
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
      onlineStatus: "",
      value: "avalible"
    };
  }

  handleChange = async (e, { value }) => {
    const resp =await axios.put('/api/updateStatus',{
        user : user,
        status: value
    })
    if(resp.status === 200 ){
        this.setState({ value })
    }
  }

  renderStatus = () => {
    return (
      <Form>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label="ว่าง"
            value="avlible"
            checked={this.state.value === "avlible"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="ไม่ว่าง"
            value="busy"
            checked={this.state.value === "busy"}
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  };

  getData = async () => {
    const resp = await axios.get("/api/profile/" + user);
    const data = resp.data;
    console.log(data);
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      userName: data.userName,
      email: data.email,
      tel: data.tel,
      value:data.status
      //   state:data.state,
      //   onlineStatus:data.onlineStatus
    });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
      
    return (
      <div>
        <ProfileForm
        renderStatus={this.renderStatus}
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
      </div>
    );
  }
}

export default Profile;
