import React from "react";
import { Form, Image, Button } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
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
          onChange={({ value }) => props.handleOnChange('gender', value)}
        />
        <Form.Input fluid label="email" placeholder="email" />
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
      <DatePicker
        selected={props.startDate}
        onChange={e=>props.handleOnChange("dateOfBirth",e._d)}
    />
      <Button>Submit</Button>
    </div>
  );
};

export default RegisterForm;
