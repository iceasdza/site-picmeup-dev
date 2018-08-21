import React, { Component } from "react";
import RegisterForm from "../../../components/users/register/registerForm";
import Header from "../../../components/header/header";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../../lib/axios';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "uploadButton",
      files: [],
      firstName:"",
      lastName:"",
      gender:"",
      email:"",
      imageAvatar:"",
      startDate: moment(),
      userName:"",
      password:"",
      tel:"",
      status:[]

    };
  }

  handleOnChange=(field,e)=>{
    this.setState({[field]:e})
  }
  

  handleOver = () => {
    this.setState({ active: "uploadButton-active" });
  };

  handleOut = () => {
    this.setState({ active: "uploadButton" });
  };

  handleSelectImage = event => {
    const files = event.target.files;
    const arr = [];
    for (var x = 0; x < files.length; x++) {
      arr.push(URL.createObjectURL(files[x]));
    }
    this.setState({
      files: arr
    });
  };

  DeletePhotoUploaded = (field, index) => {
    let arr = [];
    arr = this.state.files;
    arr.splice(index, 1);
    this.setState({ files: arr });
  };

  handleSubmit= async (e) =>{
    e.preventDefault()
    var data = new FormData();
    const dataFile = document.getElementById('img').files[0]
    data.append('img', dataFile)
    await axios.post('/api/upLoadAvatar', data)
    await axios.post('/api/addRegisterInfo',{
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        gender:this.state.gender,
        email:this.state.email,
        password:this.state.password,
        files:this.state.files,
        tel:this.state.tel
    })
    
  }
  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <RegisterForm
            handleOver={this.handleOver}
            handleOut={this.handleOut}
            handleSelectImage={this.handleSelectImage}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            isActive={this.state.active}
            files={this.state.files}
            handleOnChange={this.handleOnChange}
            startDate={this.state.startDate}
          />
        </form>
      </div>
    );
  }
}

export default Register;
