import React from "react";
import {  Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../static/welcome.css";
// import bg1 from '../static/welcome/1.jpg'
import bg from '../static/welcome/26115.jpg'
// import bg2 from '../static/welcome/5.jpg'
// import bg3 from '../static/welcome/9.jpg'
const welcomeComponent = () => {
  return (
    <div>
      {/* onlyComputer */}
      <Responsive {...Responsive.onlyComputer}>
        <div className="welcomeContent" style={{backgroundImage:"url("+bg+")"}}>
          <p className="headerContent">ค้นหาและท่องเที่ยว</p>
          <p className="content">
            ค้นหาสถานที่สำหรับคุณและไปถ่ายรูป
            เพื่อค้นหาแรงบันดาลใจและตัวตนของคุณ
          </p>
          <p className="content">เพื่อไม่พลาดสถานที่และกิจกรรมที่เกิดขึ้น !</p>
          <div>
          <Link to={{ pathname: "/register" }}>
            <p className="enterSite">เข้าร่วมกับเรา</p>
          </Link>
          </div>
          <Link to={{ pathname: "/main" }}>
            <p className="enterSite">เข้าสู่เว็ปไซต์</p>
          </Link>
        </div>
        {/* End Body */}
      </Responsive>

      
      {/* onlyMobile */}
      <Responsive {...Responsive.onlyMobile}>
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
