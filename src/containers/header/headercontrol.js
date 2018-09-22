import React, { Component } from "react";
import { Image, Menu, Input, Icon, Sidebar } from "semantic-ui-react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "../../static/Header.css";
import Login from "../../containers/users/login/login";
import Navbar from "../../components/header/header";
import { Link } from "react-router-dom";
// import Home from '../Home'
class HeaderControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      visible: false
    };
  }

  handleButtonClick = () => {
    this.setState({ visible: !this.state.visible });
  };

  componentWillMount = () => {
    this.setState({ components: Login });
  };

  handleSidebarHide = () => this.setState({ visible: false });

  linkMenuBar = () => {
    return (
      <Menu.Menu position="left">
        <Link to="/">
          <Menu.Item className="navBarMenu">สถานที่</Menu.Item>
        </Link>

        <Link to="/">
          <Menu.Item className="navBarMenu">อีเว้นท์</Menu.Item>
        </Link>
        <Link to="/meeting">
          <Menu.Item className="navBarMenu">มีตติ้ง</Menu.Item>
        </Link>
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
        <Input transparent inverted icon="search" placeholder="Search..." />
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

  sidebarMenu = () => {
    let tmp = "";
    if (Cookies.get("user") === undefined) {
      tmp = (
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.visible}
          width="thin"
          onClick={this.handleSidebarHide}
        >
          <Menu.Item as="a" onClick={e => this.props.getComponent("home")}>
            <p className="sideMenuMobile">หน้าแรก</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("place")}>
            <p className="sideMenuMobile">สถานที่</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("event")}>
            <p className="sideMenuMobile">อีเว้นท์</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("meeting")}>
            <p className="sideMenuMobile">มีตติ้ง</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("login")}>
            <p className="sideMenuMobile">เข้าสู่ระบบ</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("register")}>
            <p className="sideMenuMobile">สมัครสมาชิก</p>
          </Menu.Item>
        </Sidebar>
      );
    } else {
      tmp = (
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.visible}
          width="thin"
          onClick={this.handleSidebarHide}
        >
          <Menu.Item as="a" onClick={e => this.props.getComponent("home")}>
            <p className="sideMenuMobile">หน้าแรก</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("place")}>
            <p className="sideMenuMobile">สถานที่</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("event")}>
            <p className="sideMenuMobile">อีเว้นท์</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("meeting")}>
            <p className="sideMenuMobile">มีตติ้ง</p>
          </Menu.Item>
          <Menu.Item as="a" onClick={e => this.props.getComponent("register")}>
            <p className="sideMenuMobile">
              ยินดีต้อนรับคุณ {Cookies.get("user")}
            </p>
          </Menu.Item>
          <Menu.Item as="a" onClick={this.logout}>
            <p className="sideMenuMobile">ลงชื่อออก</p>
          </Menu.Item>
        </Sidebar>
      );
    }

    return tmp;
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
            <p className="rightMenuBar" onClick={this.logout}>
              ลงชื่อออก
            </p>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      tmp = (
        <Menu.Menu position="right">
        <Link to="/login">
          <Menu.Item>
            <p
              className="rightMenuBar"
            >
              ลงชื่อเข้าใช้
            </p>
          </Menu.Item>
          </Link>
          <Link to="/register">
          <Menu.Item>
            <p
              className="rightMenuBar"
            >
              สมัครสมาชิก
            </p>
          </Menu.Item>
          </Link>
        </Menu.Menu>
      );
    }
    return tmp;
  };

  logout = () => {
    Cookies.remove("user");
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    if (redirect && Cookies.get("user") === undefined) {
      console.log("logout");
      return  <Redirect
      from={window.location.href}
      to={{ pathname: "/main" }}
    />
    }
    return (
      <Navbar
        linkMenuBar={this.linkMenuBar}
        searchMunuBar={this.searchMunuBar}
        loginTab={this.loginTab}
        hamburgerMenu={this.hamburgerMenu}
        searchMenuBarMobile={this.searchMenuBarMobile}
        visible={this.state.visible}
        sidebarMenu={this.sidebarMenu}
      />
    );
  }
}
export default HeaderControl;
