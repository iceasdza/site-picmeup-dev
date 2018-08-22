import React from "react";
import { Image, Button ,Label} from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const RegisterForm = props => {
  return (
    <div className="container fluid">
    <Form.Group widths="equal">
      <Form.Input
        fluid
        name="fistName"
        label="ชื่อ"
        placeholder="First name"
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "ต้องใส่ชื่อ"
        }}
        onChange={e => props.handleOnChange("firstName", e.target.value)}
      />
      <Form.Input
          fluid
          name="lastName"
          label="นามสกุล"
          placeholder="Last name"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "ต้องใส่นามสกุล"
          }}
          onChange={e => props.handleOnChange("lastName", e.target.value)}
        />
        </Form.Group>
        <Form.Select
          fluid
          name="fistGender"
          label="เพศ"
          options={options}
          placeholder="Gender"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "โปรดระบุเพศ"
          }}
          onChange={(e, { value }) =>
            props.handleOnChange("gender", { value }.value)
          }
        />
         <Label pointing="below" color={props.emailLabelColor} className={props.emailLabel}>{props.emailMsg}</Label>
        <Form.Input
          fluid
          name="email"
          label="อีเมล"
          placeholder="email"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "โปรดระบุอีเมล"
          }}
          onChange={e => props.handleOnChange("email", e.target.value)}
        />
        <Button onClick={props.checkEmail}>ตรวจสอบอีเมล</Button>
      <br />
      <br />
      <label
        className={props.isActive}
        onMouseEnter={props.handleOver}
        onMouseLeave={props.handleOut}
      >
        <p className="Color">เลือกรูปภาพ</p>
        <input
          name="img"
          id="img"
          type="file"
          style={{ display: "none" }}
          onChange={e => props.handleSelectImage(e)}
        />
      </label>
      <Image src={props.files} circular className="avatar-uploaded" />
      <Label pointing color="red" className={props.avatarLabel} >กรุณาเลือกรูปภาพ</Label>

      <Label pointing="below" color={props.userNameLabelColor} className={props.userNameLabel}>{props.usernameMsg}</Label>
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
        <Button onClick={props.checkUsername}>ตรวจสอบชื่อผู้ใช้</Button>

        <Form.Input
          fluid
          name="password"
          label="พาสเวิร์ด"
          placeholder="Password"
          type="password"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "กรุณาตั้งพาสเวิร์ด"
          }}
          onChange={e => props.handleOnChange("password", e.target.value)}
        />
        <Label pointing="below" color="red" className={props.rePasswordLabel} >กรุณาตั้งพาสเวิร์ดให้ตรงกัน</Label>
        <Form.Input
          fluid
          name="rePassword"
          label="ยืนยันพาสเวิร์ด(ใส่พาสเวิร์ดเหมือนกับครั้งแรก)"
          placeholder="Re-Password"
          type="password"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "กรุณายินยันพาสเวิร์ด"
          }}
          onChange={e => props.handleOnChange("rePassword", e.target.value)}
        />
        <Form.Input
          fluid
          name="tel"
          label="เบอร์โทร"
          placeholder="tel"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "กรุณาใส่เบอร์โทร"
          }}
          onChange={e => props.handleOnChange("tel", e.target.value)}
        />
      
      <br />
      <br />
      <br />
      <Button>Submit</Button>
    </div>
  );
};

export default RegisterForm;
