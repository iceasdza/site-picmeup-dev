import React from "react";
import {  Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../static/welcome.css";
const welcomeComponent = () => {
  return (
    <div>
      {/* onlyComputer */}
      <Responsive {...Responsive.onlyComputer}>
        {/*Start Navbar */}
        {/* <Menu secondary className="NavbarMenu">
          <Menu.Item header className="logoText">
            PICMEUP
          </Menu.Item>
          <Menu.Item className="searchBar">
            <Input icon="search" placeholder="ค้นหา..." />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item className="menuRight">ลงชื่อเข้าใช้</Menu.Item>
            <Menu.Item className="menuRight">สมัครสมาชิก</Menu.Item>
          </Menu.Menu>
        </Menu> */}
        {/*End Navbar */}
        {/* Start Body */}
        <div className="welcomeContent">
          <p className="headerContent">ค้นหาและท่องเที่ยว</p>
          <p className="content">
            ค้นหาสถานที่สำหรับคุณและไปถ่ายรูป
            เพื่อค้นหาแรงบันดาลใจและตัวตนของคุณ
          </p>
          <p className="content">เพื่อไม่พลาดสถานที่และกิจกรรมที่เกิดขึ้น !</p>
          <div>
            <p className="buttonSignUp">เข้าร่วมกับเรา</p>
          </div>
          <Link to={{ pathname: "/main" }}>
            <p className="enterSite">เข้าสู่เว็ปไซต์</p>
          </Link>
        </div>
        {/* End Body */}
      </Responsive>

      
      {/* onlyMobile */}
      <Responsive {...Responsive.onlyMobile}>
        {/* <Menu secondary className="MenuMobile">
          <Menu.Item header className="logoTextMobile">
            PICMEUP
          </Menu.Item>
          <Menu.Item >
          <Input transparent inverted icon="search" placeholder="Search..." />
          </Menu.Item>    
        </Menu> */}
        {/* Start Body */}
        <div className="welcomeContent">
          <p className="headerContent">ค้นหาและท่องเที่ยว</p>
          <p className="content">
            ค้นหาสถานที่สำหรับคุณและไปถ่ายรูป
            เพื่อค้นหาแรงบันดาลใจและตัวตนของคุณ
          </p>
          <p className="content">เพื่อไม่พลาดสถานที่และกิจกรรมที่เกิดขึ้น !</p>
          <div>
            <p className="buttonSignUp">เข้าร่วมกับเรา</p>
          </div>
          <p className="enterSiteMobile">เข้าสู่เว็ปไซต์</p>
        </div>
        {/* End Body */}
      </Responsive>
    </div>
  );
};
export default welcomeComponent;
