import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker"
import "../../static/topic.css";
import { Button, Divider, Label, TextArea} from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const editTopicComponent = props => {
  return (
    <div className="container fluid">
    <center className="topicHeader">
      <h1>
    แก้ไขมีตติ้ง {props.topicName}
      </h1>
    </center>
      <div>
        <p className="labelTopic">นัดหมาย</p>
        <Form.Input fluid size="massive" 
        name="meeting"
        placeholder="หัวข้อกระทู้..." 
        value={props.topicName}
        onChange={e => props.handleName(e.target.value)} 
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "โปรดตั้งชื่อให้การนัดหมายครั้งนี้"
        }}
        />
        <p className="labelTopic">สถานที่นัดหมาย</p>
        {props.renderPlaceList()}
        <p className="labelTopic">ระบุข้อความ</p>
        <ReactQuill
          value={props.content}
          onChange={props.handleChange}
        />{props.contentCheck!=''?<Label color="red" pointing>{props.contentCheck}</Label>:<br/>}        
        <br/>
        <p className="labelTopic">วันที่นัดหมาย</p> 
        <DatePicker
          utcOffset={"+7"}
          selected={props.date}
          dateFormat="DD/MM/YYYY"
          onChange={props.handleDate}
        />{props.dateCheck!=''?<Label color="red" pointing='left'>{props.dateCheck}</Label>:<br/>}
        <br />
        <p className="labelTopic">เวลานัดหมาย</p>
        <DatePicker
          selected={props.time}
          onChange={props.handleTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="LT"
          timeCaption="Time"
        />{props.timeCheck!=''?<Label color="red" pointing='left'>{props.timeCheck}</Label>:<br/>}
        <Divider horizontal>
          <Button positive onClick={props.handleSubmit}>
            เเก้ไขการนัดหมาย
          </Button>
        </Divider>
      </div>
    </div>
  );
};

editTopicComponent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
editTopicComponent.formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

export default editTopicComponent;
