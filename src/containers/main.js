import React, { Component } from "react";
import "../static/Header.css";
import { Menu, Responsive } from "semantic-ui-react";
import { Image, Input, Icon, Sidebar } from "semantic-ui-react";
import Routing from "./routes";
import Cookies from "js-cookie";
import {NavLink } from "react-router-dom";
class Main extends Component {
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

  handleSidebarHide = () => this.setState({ visible: false });

  NavLinkMenuBar = () => {
    return (
      <Menu.Menu position="left">
        <NavLink to="/main">
          <Menu.Item className="navBarMenu">สถานที่</Menu.Item>
        </NavLink>

        <NavLink to="/main">
          <Menu.Item className="navBarMenu">อีเว้นท์</Menu.Item>
        </NavLink>
        <NavLink to="/meeting">
          <Menu.Item className="navBarMenu">มีตติ้ง</Menu.Item>
        </NavLink>
      </Menu.Menu>
    );
  };

  searchMenuBar = () => {
    return (
      <Menu.Menu position="left">
        <Menu.Item>
          <Input inverted transparent icon="search" placeholder="ค้นหา..." />
        </Menu.Item>
      </Menu.Menu>
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
        <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">หน้าแรก</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">สถานที่</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">อีเว้นท์</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/meeting">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">มีตติ้ง</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/login">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">เข้าสู่ระบบ</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/register">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">เข้าสู่ระบบ</p>
          </Menu.Item>
          </NavLink>
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
        <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">หน้าแรก</p>
          </Menu.Item>
          </NavLink>

          <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">สถานที่</p>
          </Menu.Item>
          </NavLink>

          <NavLink to="/main">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">อีเว้นท์</p>
          </Menu.Item>
          </NavLink>
          <NavLink to="/meeting">
          <Menu.Item as="a" >
            <p className="sideMenuMobile">มีตติ้ง</p>
          </Menu.Item>
          </NavLink>
          <Menu.Item as="a" >
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
        <Menu.Menu position="right" className="navBarMenuRight">
        {this.searchMenuBar()}
          <Menu.Item >
            ยินดีต้อนรับคุณ {Cookies.get("user")} &nbsp;&nbsp;&nbsp;&nbsp;
            <Image src={Cookies.get("userAvatar")} avatar />
          </Menu.Item>
          <Menu.Item >
            <p className="rightMenuBar" onClick={this.logout}>
              ลงชื่อออก
            </p>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      tmp = (
        <Menu.Menu position="right">
            {this.searchMenuBar()}
          <NavLink to="/login">
            <Menu.Item>
              <p className="rightMenuBar">ลงชื่อเข้าใช้</p>
            </Menu.Item>
          </NavLink>
          <NavLink to="/register">
            <Menu.Item>
              <p className="rightMenuBar">สมัครสมาชิก</p>
            </Menu.Item>
          </NavLink>
        </Menu.Menu>
      );
    }
    return tmp;
  };

  logout = () => {
    Cookies.remove("user");
    this.setState({ redirect: true });
  };
  componentDidUpdate() {
    console.log('tet')
  }
  render() {
    let {redirect} = this.state
    if(redirect&&Cookies.get("user")=== undefined){
      window.location.replace("/");
    }
    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Menu inverted secondary>
            <Menu.Item header className="logoText">
              PICMEUP
            </Menu.Item>
            {this.NavLinkMenuBar()}
            {this.loginTab()}
          </Menu>
        </Responsive>
        
        <Responsive {...Responsive.onlyMobile}>
          <Menu secondary>
            {this.hamburgerMenu()}
            {this.searchMenuBarMobile()}
          </Menu>
          {this.sidebarMenu()}
        </Responsive>
        <Routing />
      </div>
    );
  }
}

export default Main;
