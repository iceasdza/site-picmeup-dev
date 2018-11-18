import React from "react";
import { Button, Label } from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const RegisterForm = props => {
  return (
    <div className="container fluid ">
      <Form.Input
        fluid
        name="userName"
        label={"ชื่อผู้ใช้"}
        placeholder="ชื่อผู้ใช้"
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "โปรดระบุชื่อผู้ใช้"
        }}
        onChange={e => props.handleOnChange("userName", e.target.value)}
      />
      <Form.Input
        fluid
        name="password"
        label="รหัสผ่าน"
        placeholder="รหัสผ่าน"
        type="password"
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "โปรดระบุรหัสผ่าน"
        }}
        onChange={e => props.handleOnChange("password", e.target.value)}
      />
      <center>
      <Button className="submitBtn">เข้าสู่ระบบ</Button>
      </center>
    </div>
  );
};

export default RegisterForm;
