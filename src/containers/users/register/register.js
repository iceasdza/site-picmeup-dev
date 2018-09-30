import React, { Component } from "react";
import RegisterForm from "../../../components/users/register/registerForm";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../../lib/axios";
import { Form } from "formsy-semantic-ui-react";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "uploadButton",
      files: [],
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      imageAvatar: "",
      startDate: moment(),
      userName: "",
      password: "",
      rePassword: "",
      tel: "",
      status: [],

      usernameMsg: "",
      userNameLabel: "hidden",
      userNameLabelColor: "red",

      emailMsg: "",
      emailLabel: "hidden",
      emailLabelColor: "red",

      rePasswordLabel: "hidden",
      open: false,
      avatarLabel: "hidden"
    };
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
    this.setState({ avatarLabel: "hidden" });
    const files = event.target.files;
    const arr = [];
    for (var x = 0; x < files.length; x++) {
      arr.push(URL.createObjectURL(files[x]));
    }
    this.setState({
      files: arr
    });
  };

  DeletePhotoUploaded = index => {
    let arr = [];
    arr = this.state.files;
    arr.splice(index, 1);
    this.setState({ files: arr });
  };

  checkUsername = async e => {
    e.preventDefault();
    if (this.state.userName === "") {
      this.setState({ usernameMsg: "กรุณาใส่ชื่อผู้ใช้", userNameLabel: "" });
      return;
    } else {
      this.setState({ usernameMsg: "", userNameLabel: "hidden" });
      const resp = await axios.get("/api/findUserName/" + this.state.userName);
      const data = resp.data;
      if (data !== null) {
        this.setState({
          usernameMsg: "มีชื่อผู้ใช้นี้อยู่แล้ว",
          userNameLabel: "",
          userNameLabelColor: "red"
        });
      } else {
        this.setState({
          usernameMsg: "สามารถใช้ชื่อผู้ใช้นี้ได้",
          userNameLabel: "",
          userNameLabelColor: "green"
        });
      }
    }
  };

  checkEmail = async e => {
    e.preventDefault();
    if (this.state.email === "") {
      this.setState({ emailMsg: "กรุณาใส่อีเมล", emailLabel: "" });
      return;
    } else {
      this.setState({ emailMsg: "", emailLabel: "hidden" });
      const resp = await axios.get("/api/findEmail/" + this.state.email);
      const data = resp.data;
      if (data !== null) {
        this.setState({
          emailMsg: "มีอีเมลนี้อยู่แล้ว",
          emailLabel: "",
          emailLabelColor: "red"
        });
      } else {
        this.setState({
          emailMsg: "สามารถใช้อีเมลนี้ได้",
          emailLabel: "",
          emailLabelColor: "green"
        });
      }
    }
  };

  checkDuplicate = async () => {
    const respMail = await axios.get("/api/findEmail/" + this.state.email);
    const respEmail = respMail.data;
    if (respEmail !== null) {
      this.setState({
        emailMsg: "มีอีเมลนี้อยู่แล้ว",
        emailLabel: "",
        emailLabelColor: "red"
      });
      return false;
    }

    const resp = await axios.get("/api/findUserName/" + this.state.userName);
    const respUsername = resp.data;
    if (respUsername !== null) {
      this.setState({
        usernameMsg: "มีชื่อผู้ใช้นี้อยู่แล้ว",
        userNameLabel: "",
        userNameLabelColor: "red"
      });
      return false;
    }
  };

  handleSubmit = async () => {
    if ((await this.checkDuplicate()) === false) return;

    if (this.state.password !== this.state.rePassword) {
      this.setState({ rePasswordLabel: "" });
      return;
    }
    if (this.state.files.length === 0) {
      this.setState({ avatarLabel: "" });
      return;
    }
    this.setState({ rePasswordLabel: "hidden" });
    var data = new FormData();
    const dataFile = document.getElementById("img").files[0];
    data.append("img", dataFile);
    const resp = await axios.post("/api/upLoadAvatar", data);
    await axios.post("/api/addRegisterInfo", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      avatar: resp.data,
      tel: this.state.tel,
      userName: this.state.userName
    });
    this.setState({open:true})
  };
  render() {
    let {open} = this.state
    if(open === true){
        window.location.replace("/login");
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <RegisterForm
            userNameLabelColor={this.state.userNameLabelColor}
            userNameLabel={this.state.userNameLabel}
            handleOver={this.handleOver}
            handleOut={this.handleOut}
            handleSelectImage={this.handleSelectImage}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            isActive={this.state.active}
            usernameMsg={this.state.usernameMsg}
            files={this.state.files}
            handleOnChange={this.handleOnChange}
            startDate={this.state.startDate}
            checkUsername={this.checkUsername}
            rePasswordLabel={this.state.rePasswordLabel}
            checkEmail={this.checkEmail}
            emailLabel={this.state.emailLabel}
            emailMsg={this.state.emailMsg}
            emailLabelColor={this.state.emailLabelColor}
            avatarLabel={this.state.avatarLabel}
          />
        </Form>
      </div>
    );
  }
}

export default Register;
