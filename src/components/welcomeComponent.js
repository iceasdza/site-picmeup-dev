import React from "react";
import { Responsive, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../static/welcome.css";
// import bg1 from '../static/welcome/1.jpg'
// import bg from "../static/welcome/26115.jpg";
// import bg2 from '../static/welcome/5.jpg'
// import bg3 from '../static/welcome/9.jpg'
const welcomeComponent = () => {
  return (
    <Segment.Group
    >
      {/* full hd screen */}
      <Responsive as={Segment} minWidth={1570}>
      <div
          className="welcomeContentFullHd"
          
        >
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
      </Responsive>
      {/* HD screen */}
      <Responsive as={Segment} minWidth={1025} maxWidth={1569}>
        <div
          className="welcomeContent"
        >
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
      </Responsive>

      {/* iPad */}
      <Responsive as={Segment} minWidth={768} maxWidth={1024}>
      <div
          className="welcomeContentIpad"
        >
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
      </Responsive>

      {/* mobile */}
      <Responsive as={Segment} minWidth={0} maxWidth={767}>
      <div
          className="welcomeContentMobile"
        >
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
      </Responsive>
    </Segment.Group>
   
  );
};
export default welcomeComponent;
