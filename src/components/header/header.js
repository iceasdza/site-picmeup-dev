import React, { Component } from "react";
import {
  Dropdown,
  Menu,
  Button,
  Input,
  Image,
  Responsive,
  Icon,
  List
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/Header.css";
import logo from "../../static/logo-white-test1.png";

class Header_picmeup extends Component {

    state={
        sidebar:"hidden",
        visible:true
    }

    handleSideBar = () => {
        this.setState({ visible: !this.state.visible })
        console.log(this.state.visible)
        if(this.state.visible===true){
            this.setState({sidebar:"show"})
        }else if(this.state.visible===false){
            this.setState({sidebar:"hidden"})
        }
}


  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  render() 
  {

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
                <div className="Login">
                  <Button primary>สมัครสมาชิก</Button>
                  <Button secondary>เข้าสู่ระบบ</Button>
                </div>
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

  <List divided relaxed className={this.state.sidebar+" sideBar"}>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>Updated 10 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
        <List.Description as='a'>Updated 22 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
        <List.Description as='a'>Updated 34 mins ago</List.Description>
      </List.Content>
    </List.Item>
  </List>

        </Responsive>
      </div>
    );
  }
}
export default Header_picmeup;
