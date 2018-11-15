import React, { Component } from "react";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Form } from "formsy-semantic-ui-react";
import { Button, Label, Image ,Icon} from "semantic-ui-react";
import '../../../static/profile.css'
import { Redirect } from "react-router-dom";
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
      tempAvatar:"",
      isRedirect:false
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
      <div className="editAvatar">
        <Image
          src={this.state.avatar}
          circular
          className="avatar-uploaded imageSize"
        />
        <div className="avatarBtn">
        <label className="uploadAvatar">
          <p className="uploadcontent">เลือกรูปภาพ<Icon disabled name='camera' /></p>
          <input
            name="img"
            id="img"
            type="file"
            style={{ display: "none" }}
            onChange={e => this.handleSelectImage(e)}
          />
        </label>
        <span className="cancleAvatar" onClick={this.handleCancle}>ยกเลิก</span>
        </div>
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
          Cookies.set('userAvatar',resp.data)
      }
      this.setState({isRedirect:true})
      
  };

  handleOnChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    if(this.state.isRedirect){
      return <Redirect to={{ pathname: "/profile" }} />
    }
    return (
      <div className="container fluid formEdit">
      <center>
      {this.rederUpload()}
      </center>
        <Form onSubmit={this.handleSubmit} className="formEditProfile">
        <Form.Group>
        <Form.Input
            className="editProfile"
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
            onChange={this.handleOnChange("firstName")}
          />

          <Form.Input
            className="editProfile"
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
        </Form.Group>
        <Form.Group>
        <Form.Input
          className="editProfile"
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
          className="editProfile"
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
        </Form.Group>
          
          <center>
          <Button className="submitBtn">แก้ไข &nbsp; <Icon name='edit' /></Button>
          </center>
        </Form>
      </div>
    );
  }
}

export default EditProfile;
