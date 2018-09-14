import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import '../../static/topic.css'
const createTopicComponent = props => {
  return (
    <div className="container fluid">
      <ReactQuill
        value={props.text}
        modules={createTopicComponent.modules}
        formats={createTopicComponent.formats}
        onChange={props.handleChange}
      />
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
