import React, { Component } from "react";
import {Image, Menu, Input, Icon} from "semantic-ui-react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "../../static/Header.css";
import Login from '../../containers/users/login/login'
import Navbar from '../../components/header/header'

// import Home from '../Home'
class HeaderControl extends Component {
constructor(props){
  super(props)
  this.state={
      redirect: false,
      visible: false,
  }
}

  handleButtonClick = () => {
    this.setState({ visible: !this.state.visible });
  };

  componentWillMount = () =>{
    this.setState({components:Login})
  }

  handleSidebarHide = () => this.setState({ visible: false });

  linkMenuBar = () => {
    return (
      <Menu.Menu position="left">
        <Menu.Item className="navBarMenu" onClick={e=>this.props.getComponent('place')}>สถานที่</Menu.Item>
        <Menu.Item className="navBarMenu" onClick={e=>this.props.getComponent('event')}>อีเว้นท์</Menu.Item>
        <Menu.Item className="navBarMenu" onClick={e=>this.props.getComponent('meeting')}>มีตติ้ง</Menu.Item>
      </Menu.Menu>
    );
  };

  searchMunuBar = () => {
    return (
      <Menu.Item className="searchBar">
        <Input icon="search" placeholder="ค้นหา..." />
      </Menu.Item>
    );
  };
  searchMenuBarMobile = () => {
    return (
      <Menu.Item className="searchBarMobile">
        <Input transparent inverted icon="search" placeholder="Search..." />;
      </Menu.Item>
    );
  };
  hamburgerMenu = () => {
    return (
      <Menu.Item onClick={this.handleButtonClick}>
        <Icon
          inverted
          name="sidebar"
          size="large"
          onClick={this.handleSideBar}
        />
      </Menu.Item>
    );
  };

  

  loginTab = () => {
    let tmp = "";
    if (Cookies.get("user") !== undefined) {
      tmp = (
        <Menu.Menu position="right">
          <Menu.Item>
            ยินดีต้อนรับคุณ {Cookies.get("user")} &nbsp;&nbsp;&nbsp;&nbsp;
            <Image src={Cookies.get("userAvatar")} avatar />
          </Menu.Item>
          <Menu.Item>
          <p className="rightMenuBar" onClick={this.logout}>ลงชื่อออก</p>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      tmp = (
        <Menu.Menu position="right">
          <Menu.Item>
              <p className="rightMenuBar" onClick={e=>this.props.getComponent('login')}>ลงชื่อเข้าใช้</p>
          </Menu.Item>
          <Menu.Item>
              <p className="rightMenuBar" onClick={e=>this.props.getComponent('register')}>สมัครสมาชิก</p>
          </Menu.Item>
        </Menu.Menu>
      );
    }
    return tmp;
  };

  logout = () => {
    Cookies.remove("user");
    this.setState({ redirect: true });
    console.log(Cookies.get("user"));
  };

  render() {
    const { redirect } = this.state;
    if (redirect && Cookies.get("user") === undefined) {
      console.log("logout");
      return <Redirect to="/" />;
    }
    return (
        <Navbar
        linkMenuBar={this.linkMenuBar}
        searchMunuBar={this.searchMunuBar}
        loginTab={this.loginTab}
        hamburgerMenu={this.hamburgerMenu}
        searchMenuBarMobile={this.searchMenuBarMobile}
        visible={this.state.visible}
        />
    );
  }
}
export default HeaderControl;
