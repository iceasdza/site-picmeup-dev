import React from "react";
import { Image, Button ,Label} from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const options = [
  { key: "m", text: "ชาย", value: "male" },
  { key: "f", text: "หญิง", value: "female" }
];
const RegisterForm = props => {
  return (
    <div className="container fluid registerForm">
    <center>
    <p>สมัครสมาชิก</p>
    </center>
    <Form.Group widths="equal">
      <Form.Input
        fluid
        name="fistName"
        label="ชื่อ"
        placeholder="ชื่อ"
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
          placeholder="นามสกุล"
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
          placeholder="เพศ"
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
          placeholder="อีเมล"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "โปรดระบุอีเมล"
          }}
          onChange={e => props.handleOnChange("email", e.target.value)}
        />
        <Button onClick={props.checkEmail} className="submitBtn">ตรวจสอบอีเมล</Button>
      <br />
      <br />
      <label
        className="uploadBtn"
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
      <Image src={props.files} circular className="avatar-uploaded imageSize" />
      <Label pointing color="red" className={props.avatarLabel} >กรุณาเลือกรูปภาพ</Label>

      <Label pointing="below" color={props.userNameLabelColor} className={props.userNameLabel}>{props.usernameMsg}</Label>
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
        <div className="btnWrapper">
                  <Button onClick={props.checkUsername} className="submitBtn">ตรวจสอบชื่อผู้ใช้</Button>
        </div>

        <Form.Input
          fluid
          name="password"
          label="พาสเวิร์ด"
          placeholder="พาสเวิร์ด"
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
          placeholder="ยืนยันพาสเวิร์ด"
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
          placeholder="เบอร์โทร"
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "กรุณาใส่เบอร์โทร"
          }}
          onChange={e => props.handleOnChange("tel", e.target.value)}
        />      
        <center>
          
      <Button className="submitBtn">สมัครสมาชิก</Button> 
        </center>
        <br/>
    </div>
  );
};

export default RegisterForm;
