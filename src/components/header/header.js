import React from "react";
import { Menu, Responsive } from "semantic-ui-react";
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
      </Responsive>

      {/* ================================================================================================================= */}

      {/* moblie version */}
      <Responsive {...Responsive.onlyMobile}>
        <Menu secondary >
          {props.hamburgerMenu()}
          {props.searchMenuBarMobile()}
        </Menu>
          {props.sidebarMenu()}
      </Responsive>
    </div>
  );
};
export default Navbar;
