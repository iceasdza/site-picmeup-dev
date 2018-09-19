import React, { Component } from "react";
import HeaderControl from "../../header/headercontrol";
import LoginForm from "../../../components/users/login/loginForm";
import axios from '../../../lib/axios';
import { Form } from "formsy-semantic-ui-react";
import {Grid, Segment, Portal } from 'semantic-ui-react'
import{getNameUser}from '../../../dataflow/actions/getdatauser'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      open: false,
      redirect: false,
      testName:'Patipat'
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
      const data = await axios.get('api/findUserName/'+this.state.userName)
      Cookies.set('userAvatar',data.data.avatar)
      Cookies.set('user',this.state.userName)
      this.setState({redirect:true})
    }else{
      this.setState({ open: !this.state.open })
    }

  }

  handleClick = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })
  render() {
    const { open,redirect } = this.state
    // if(redirect && Cookies.get('user') !== undefined){
    // return  <Redirect
    //   from={window.location.href}
    //   to={{ pathname: "/" }}
    // />
    // }
    return (
      <div>
        <HeaderControl />
        <Grid columns={2}>
        <Grid.Column>
          <Portal onClose={()=>this.handleClose()} open={open}>
            <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
              <p>ผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</p>
            </Segment>
          </Portal>
        </Grid.Column>
      </Grid>
        <Form onSubmit={this.handleSubmit}>
          <LoginForm 
          handleOnChange = {this.handleOnChange}
          />
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {    
  return {    
    setNameUser: name => {
      dispatch(getNameUser(name))
    }
  }
}

export default connect(mapDispatchToProps)(Login);
