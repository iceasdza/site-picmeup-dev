import React from "react";
import { Form, Image, Button} from "semantic-ui-react";
import "../../../static/Form.css";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const RegisterForm = props => {
  return (
    <div className="container fluid">
      <Form.Group widths="equal">
        <Form.Input fluid label="First name" placeholder="First name" onChange={e=>props.handleOnChange('firstName',e.target.value)}/>
        <Form.Input fluid label="Last name" placeholder="Last name" onChange={e=>props.handleOnChange('lastName',e.target.value)}/>
        <Form.Select
          fluid
          label="Gender"
          options={options}
          placeholder="Gender"
          onChange={(e,{ value }) => props.handleOnChange('gender', {value}.value)}
        />
        <Form.Input fluid label="email" placeholder="email" onChange={e=>props.handleOnChange('email',e.target.value)}/>
      </Form.Group>
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
      <Form.Group widths="equal">
        <Form.Input fluid label="Username" placeholder="username" onChange={e=>props.handleOnChange('username',e.target.value)}/>
        <Form.Input fluid label="Password" placeholder="Password" type='password' onChange={e=>props.handleOnChange('password',e.target.value)}/>
        <Form.Input fluid label="Re-Password" placeholder="Re-Password" type='password' onChange={e=>props.handleOnChange('rePassword',e.target.value)}/>
        <Form.Input fluid label="tel" placeholder="tel" onChange={e=>props.handleOnChange('tel',e.target.value)} />
      </Form.Group>
      <br/>
      <br/>
      <br/>
      <Button>Submit</Button>
    </div>
  );
};

export default RegisterForm;
