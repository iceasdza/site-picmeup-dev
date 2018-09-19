import React from "react";
import { Button, Label } from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const RegisterForm = props => {
  return (
    <div className="container fluid">
    <Form>
      <Form.Input
        fluid
        name="userName"
        label={"ชื่อผู้ใช้"}
        placeholder="username"
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
        placeholder="Password"
        type="password"
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "โปรดระบุรหัสผ่าน"
        }}
        onChange={e => props.handleOnChange("password", e.target.value)}
      />
      <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
