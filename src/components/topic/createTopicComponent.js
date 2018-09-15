import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../static/topic.css";
import { Button, Divider, Input } from "semantic-ui-react";
const createTopicComponent = props => {
  return (
    <div className="container fluid">
      <div>
        <Input fluid size="massive" placeholder="หัวข้อกระทู้..." onChange={e=>props.handleName(e.target.value)}/>
        <ReactQuill
          value={props.text}
          modules={createTopicComponent.modules}
          formats={createTopicComponent.formats}
          onChange={props.handleChange}
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

createTopicComponent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
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
createTopicComponent.formats = [
  "header",
  "font",
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

export default createTopicComponent;
