import React from "react";
import { Menu, Responsive, Sidebar, Segment } from "semantic-ui-react";
import "../../static/Header.css";
const Navbar = props => {
  return (
    <div>
      <Responsive {...Responsive.onlyComputer}>
        <Menu secondary>
          <Menu.Item header className="logoText">
            PICMEUP
          </Menu.Item>
          {props.linkMenuBar()}
          {props.searchMunuBar()}
          {props.loginTab()}
        </Menu>
        <Segment basic >
          {props.components}
          {console.log(props.components)}
        </Segment>
      </Responsive>

      {/* ================================================================================================================= */}

      {/* moblie version */}
      <Responsive {...Responsive.onlyMobile}>
        <Menu secondary className="MenuMobile">
          {props.hamburgerMenu()}
          {props.searchMenuBarMobile()}
        </Menu>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onClick={props.handleSidebarHide}
            vertical
            visible={props.visible}
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

          <Sidebar.Pusher dimmed={props.visible}>
            <Segment basic >
            {props.components}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    </div>
  );
};
export default Navbar;
