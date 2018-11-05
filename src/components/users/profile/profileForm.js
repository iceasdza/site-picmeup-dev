import React from "react";
import { Message } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";

const ProfileForm = props => {
  return (
    <div>
      <Message>
        <Message.Header>ชื่อ</Message.Header>
        <p>{props.firstName}</p>
        <Message.Header>นามสกุล</Message.Header>
        <p>{props.lastName}</p>
        <Message.Header>เพศ</Message.Header>
        <p>{props.gender}</p>
        <Message.Header>E-Mail</Message.Header>
        <p>{props.email}</p>
        <Message.Header>ชื่อผู้ใช้</Message.Header>
        <p>{props.userName}</p>
        <Message.Header>เบอร์โทรศัพท์</Message.Header>
        <p>{props.tel}</p>
        <NavLink to="/editprofile">
          <Button color="blue">แก้ไขโปรไฟล์</Button>
        </NavLink>
      </Message>
    </div>
  );
};

export default ProfileForm;
