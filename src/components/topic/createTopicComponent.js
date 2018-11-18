import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../static/topic.css";
import DatePicker from "react-datepicker"
import { Button, Divider, Label, TextArea} from "semantic-ui-react";
import { Form } from "formsy-semantic-ui-react";
const createTopicComponent = props => {
  return (
    <div className="container fluid">
      <div>
        <p>นัดหมาย</p>
        <Form.Input fluid size="massive" 
        name="meeting"
        placeholder="หัวข้อกระทู้..." 
        onChange={e => props.handleName(e.target.value)} 
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "โปรดตั้งชื่อให้การนัดหมายครั้งนี้"
        }}
        />
        <p>สถานที่นัดหมาย</p>
        {props.renderPlaceList()}
        <p>ระบุข้อความ</p>
        <ReactQuill
          value={props.text}
          onChange={props.handleChange}         
        />{props.textCheck!=''?<Label color="red" pointing>{props.textCheck}</Label>:<br/>}        
        <br/>
        <p>วันที่นัดหมาย</p>
        <DatePicker
          utcOffset={"+7"}
          selected={props.date}
          dateFormat="DD/MM/YYYY"
          onChange={props.handleDate}
        />{props.dateCheck!=''?<Label color="red" pointing='left'>{props.dateCheck}</Label>:<br/>}
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
        />{props.timeCheck!=''?<Label color="red" pointing='left'>{props.timeCheck}</Label>:<br/>}
        <Divider horizontal>
          <Button positive onClick={props.handleSubmit}>
            สร้างการนัดหมาย
          </Button>
        </Divider>
      </div>
    </div>
  );
};

export default createTopicComponent;
