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
        {props.renderPlaceList()}
        <ReactQuill
          value={props.text}
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

export default createTopicComponent;
