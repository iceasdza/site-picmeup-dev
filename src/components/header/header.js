import React, { Component } from "react";
import {
  Dropdown,
  Menu,
  Button,
  Input,
  Image,
  Responsive,
  Icon,
  List,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/Header.css";
import logo from "../../static/logo-white-test1.png";

class Header_picmeup extends Component {
  state = {
    sidebar: "hidden",
    visible: true
  };

  handleSideBar = () => {
    this.setState({ visible: !this.state.visible });
    if (this.state.visible === true) {
      this.setState({ sidebar: "show" });
    } else if (this.state.visible === false) {
      this.setState({ sidebar: "hidden" });
    }
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  render() {
    return (
      <div>
        <div className="Header-background">
          <Responsive {...Responsive.onlyComputer}>
            <Menu secondary inverted>
              <Menu.Menu>
                <Link to={{ pathname: "/" }}>
                  <Image className="Img" src={logo} height="50" width="150" />
                </Link>
              </Menu.Menu>
              <Menu.Item link name="สถานที่ที่น่าสนใจ" />
              <Menu.Item link name="อีเว้นท์ที่กำลังมาแรง" />
              <Menu.Item link name="สนทนา" />
              <Dropdown item text="จัดการ">
                <Dropdown.Menu>
                  <Dropdown.Item>สร้างสถานที่</Dropdown.Item>
                  <Dropdown.Item>สร้างอีเว้นท์</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input icon="search" placeholder="ค้นหา..." />
                </Menu.Item>
                <Menu.Item>
                  <Link to={{ pathname: "/login" }}>
                    <Button inverted>ลงชื่อเข้าใช้</Button>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={{ pathname: "/register" }}>
                    <Button inverted>สมัครสมาชิก</Button>
                  </Link>
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Responsive>
        </div>

        <Responsive {...Responsive.onlyMobile}>
          <Menu secondary inverted>
            <Menu.Item position="left">
              <Icon name="sidebar" size="large" onClick={this.handleSideBar} />
            </Menu.Item>
            <Menu.Item position="right">
              <Input size="mini" icon="search" placeholder="ค้นหา..." />
            </Menu.Item>
          </Menu>
          <List relaxed className={this.state.sidebar + " sideBar"}>
          <List.Item>
              <Link to={{ pathname: "/" }}>หน้าแรก</Link>
            </List.Item>
            <List.Item>สถานที่น่าสนใจ</List.Item>
            <List.Item>อีเว้นท์ที่กำลังมาแรง</List.Item>
            <List.Item>สนทนา</List.Item>
            <Divider inverted />
            <List.Item>
              <Link to={{ pathname: "/login" }}>ลงชื่อเข้าใช้</Link>
            </List.Item>
            <List.Item>
              <Link to={{ pathname: "/register" }}>สมัครสมาชิก</Link>
            </List.Item>
          </List>
        </Responsive>
      </div>
    );
  }
}
export default Header_picmeup;
