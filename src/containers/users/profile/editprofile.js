import React, { Component } from "react";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Form } from "formsy-semantic-ui-react";
import { Button, Label, Image } from "semantic-ui-react";
const user = Cookies.get("user");
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "uploadButton",
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      avatar: "",
      tempAvatar:""
    };
  }
  getData = async () => {
    const resp = await axios.get("/api/profile/" + user);
    const data = resp.data;
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar,
      tempAvatar:data.avatar,
      tel: data.tel
    });
  };
  componentDidMount() {
    this.getData();
  }

  handleOnChange = (field, e) => {
    this.setState({ [field]: e });
  };

  handleOver = () => {
    this.setState({ active: "uploadButton-active" });
  };

  handleOut = () => {
    this.setState({ active: "uploadButton" });
  };

  handleSelectImage = event => {
    const files = event.target.files;
    const image = URL.createObjectURL(files[0])
    this.setState({
      avatar: image
    });
  };

  handleCancle=()=>{
      this.setState({avatar:this.state.tempAvatar})
  }

  rederUpload = () => {
    return (
      <div>
        <Image
          src={this.state.avatar}
          circular
          className="avatar-uploaded imageSize"
        />
        <label className="uploadAvatar">
          <p className="Color">เลือกรูปภาพ</p>
          <input
            name="img"
            id="img"
            type="file"
            style={{ display: "none" }}
            onChange={e => this.handleSelectImage(e)}
          />
        </label>
        <Button danger onClick={this.handleCancle}>cancle</Button>
      </div>
    );
  };

  handleSubmit = async () => {
      const {avatar,tempAvatar} = this.state
      if(avatar===tempAvatar){
            await axios.put("/api/updateProfile/" + user, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            tel: this.state.tel,
            avatar:this.state.avatar
          });
      }else{
        var data = new FormData();
        const dataFile = document.getElementById("img").files[0];
        data.append("img", dataFile);
        const resp = await axios.post("/api/upLoadAvatar", data);   
        await axios.put("/api/updateProfile/" + user, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            tel: this.state.tel,
            avatar: resp.data,
          });
          Cookies.set('userAvatar',this.state.avatar)
      }
  };

  handleOnChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    return (
      <div className="container fluid">
        {this.rederUpload()}

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="ชื่อ"
            name="first_name"
            placeholder={this.state.firstName}
            width={8}
            value={this.state.firstName}
            required
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "ต้องใส่ชื่อ"
            }}
            // onChange={e=>this.handleOnChange('firstName',e.target.value)}
            onChange={this.handleOnChange("firstName")}
          />

          <Form.Input
            label="นามสกุล"
            name="last_name"
            placeholder={this.state.lastName}
            width={8}
            value={this.state.lastName}
            required
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "ต้องใส่นามสกุล"
            }}
            onChange={this.handleOnChange("lastName")}
          />
          <Form.Input
            label="email"
            name="email"
            placeholder={this.state.email}
            width={8}
            value={this.state.email}
            required
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "โปรดระบุอีเมล"
            }}
            onChange={this.handleOnChange("email")}
          />
          <Form.Input
            label="เบอร์โทรศัพท์"
            name="tel"
            placeholder={this.state.tel}
            width={8}
            value={this.state.tel}
            required
            errorLabel={<Label color="red" pointing />}
            validationErrors={{
              isDefaultRequiredValue: "กรุณาใส่เบอร์โทร"
            }}
            onChange={this.handleOnChange("tel")}
          />
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default EditProfile;
