import React, { Component } from "react";
import Header from "../../../components/header/header";
import LoginForm from "../../../components/users/login/loginForm";
import axios from '../../../lib/axios';
import { Form } from "formsy-semantic-ui-react";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }
  handleOnChange = (field, e) => {
    this.setState({ [field]: e });
  };

  handleSubmit= async ()=>{
   const resp =  await axios.post('/api/login',{
        password:this.state.password,
        userName:this.state.userName
    })
    const isAuthen = resp.data.isAuthen
    if(isAuthen){
      alert('true')
    }else{
      alert('false')
    }

  }
  render() {
    return (
      <div>
        <Header />
        <Form onSubmit={this.handleSubmit}>
          <LoginForm 
          handleOnChange = {this.handleOnChange}
          />
        </Form>
      </div>
    );
  }
}

export default Login;
