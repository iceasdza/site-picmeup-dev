import React, { Component } from "react";
import { Button, Image, Menu, Input, Icon,Responsive, Sidebar, Segment } from "semantic-ui-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "../../static/Header.css";
import Login from '../../containers/users/login/login'

// import Home from '../Home'
class HeaderControl extends Component {
  state = {
    redirect: false,
    visible: false,
    components:null
  };

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
        <Menu.Item className="navBarMenu">สถานที่</Menu.Item>
        <Menu.Item className="navBarMenu">อีเว้นท์</Menu.Item>
        <Menu.Item className="navBarMenu">มีตติ้ง</Menu.Item>
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
            ยินดีต้อนรับคุณ {Cookies.get("user")}{" "}
            <Image src={Cookies.get("userAvatar")} avatar />
          </Menu.Item>
          <Menu.Item>
            <Button inverted onClick={this.logout}>
              ลงชื่อออก
            </Button>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      tmp = (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to={{ pathname: "/login" }}>
              <p className="rightMenuBar">ลงชื่อเข้าใช้</p>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={{ pathname: "/register" }}>
              <p className="rightMenuBar">สมัครสมาชิก</p>
            </Link>
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
      return <Redirect to="/login" />;
    }
    return (
<div>
      <Responsive {...Responsive.onlyComputer}>
        <Menu secondary>
          <Menu.Item header className="logoText">
            PICMEUP
          </Menu.Item>
          {this.linkMenuBar()}
          {this.searchMunuBar()}
          {this.loginTab()}
        </Menu>
          <Login/>
      </Responsive>

      {/* ================================================================================================================= */}

      {/* moblie version */}
      <Responsive {...Responsive.onlyMobile}>
        <Menu secondary className="MenuMobile">
          {this.hamburgerMenu()}
          {this.searchMenuBarMobile()}
        </Menu>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onClick={this.handleSidebarHide}
            vertical
            visible={this.visible}
            width="thin"
          >
            <Menu.Item as="a">
              <p className="sideMenuMobile">สถานที่</p>
            </Menu.Item>
            <Menu.Item as="a">
              <p className="sideMenuMobile">อีเว้นท์</p>
            </Menu.Item>
            <Menu.Item as="a">
              <p className="sideMenuMobile">มีตติ้ง</p>
            </Menu.Item>
            <Menu.Item as="a">
              <p className="sideMenuMobile">เข้าสู่ระบบ</p>
            </Menu.Item>
            <Menu.Item as="a">
              <p className="sideMenuMobile">สมัครสมาชิก</p>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={this.visible}>
            <Segment basic >
            <Login/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    </div>
    );
  }
}
export default HeaderControl;
