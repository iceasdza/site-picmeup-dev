import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker"
import "../../static/topic.css";
import { Button, Divider, Input } from "semantic-ui-react";
const editTopicComponent = props => {
  return (
    <div className="container fluid">
      <div>
        <Input fluid size="massive" placeholder="หัวข้อกระทู้..." value={props.topicName}  onChange={e=>props.handleName(e.target.value)}/>
        {props.renderPlaceList()}
        <ReactQuill
          value={props.content}
          modules={editTopicComponent.modules}
          formats={editTopicComponent.formats}
          onChange={props.handleChange}
        />
        <DatePicker
    selected={props.date}
    onChange={props.handleDate}    
/>

<DatePicker
    selected={props.time}
    onChange={props.handleTime}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="LT"
    timeCaption="Time"
/>
        <Divider horizontal>
          <Button positive onClick={props.handleSubmit}>
            บันทึก
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
