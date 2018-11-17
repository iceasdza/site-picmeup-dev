import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../static/topic.css";
import DatePicker from "react-datepicker"
import { Button, Divider, Input } from "semantic-ui-react";
const createTopicComponent = props => {
  return (
    <div className="container fluid">
      <div>
        <p>นัดหมาย</p>
        <Input fluid size="massive" placeholder="หัวข้อกระทู้..." onChange={e => props.handleName(e.target.value)} />
        <p>สถานที่นัดหมาย</p>
        {props.renderPlaceList()}
        <p>ระบุข้อความ</p>
        <ReactQuill
          value={props.text}
          onChange={props.handleChange}
        />
        <p>วันที่นัดหมาย</p>
        <DatePicker
          utcOffset={"+7"}
          selected={props.date}
          dateFormat="DD/MM/YYYY"
          onChange={props.handleDate}
        />
        <br />
        <p>เวลานัดหมาย</p>
        <DatePicker
          selected={props.time}
          utcOffset={"+7"}
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

export default createTopicComponent;
