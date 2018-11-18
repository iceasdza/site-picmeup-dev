import React from "react";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label,Divider,Button} from "semantic-ui-react";
import "../../../static/Form.css";

import Imagecontrol from "../../../containers/imagerender/imagecontrol"




const optionsTime = [
  { key: 1, text: "05:00", value: "05:00" },
  { key: 2, text: "06:00", value: "06:00" },
  { key: 3, text: "07:00", value: "07:00" },
  { key: 4, text: "08:00", value: "08:00" },
  { key: 5, text: "09:00", value: "09:00" },
  { key: 6, text: "10:00", value: "10:00" },
  { key: 7, text: "11:00", value: "11:00" },
  { key: 8, text: "12:00", value: "12:00" },
  { key: 9, text: "13:00", value: "13:00" },
  { key: 10, text: "14:00", value: "14:00" },
  { key: 11, text: "15:00", value: "15:00" },
  { key: 12, text: "16:00", value: "16:00" },
  { key: 13, text: "17:00", value: "17:00" },
  { key: 14, text: "18:00", value: "18:00" },
  { key: 15, text: "19:00", value: "19:00" },
  { key: 16, text: "20:00", value: "20:00" },
  { key: 17, text: "21:00", value: "21:00" },
  { key: 18, text: "22:00", value: "22:00" },
  { key: 19, text: "23:00", value: "23:00" },
  { key: 20, text: "24:00", value: "24:00" },
]

const renderLabel = label => ({
  color: "blue",
  content: `${label.text}`,
  icon: "check"
});

const EventForm = props => {
  const optionPlace = [];
  props.placesData.map((data, index) =>
    optionPlace.push({ key: index + 1, text: data.placeName, value: data._id })
  );
  return (
    <div className="container fluid">
      <Divider horizontal>สร้างอีเวนท์</Divider>
      <Form.Input
        label="ชื่ออีเวนท์"
        name="place_name"
        placeholder="ชื่ออีเวนท์.."
        width={8}
        value={props.eventName}
        onChange={(e, { value }) => props.setField("eventName", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "จำเป็นต้องใส่ชื่ออีเวนท์"
        }}
      />
      <Form.TextArea
        name="place_desc"
        label="คำอธิบายอีเวนท์"
        placeholder="เกี่ยวกับอีเวนท์.."
        width={14}
        value={props.eventDes}
        onChange={(e, { value }) => props.setField("eventDes", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{ isDefaultRequiredValue: "จำเป็นต้องใส่คำอธิบาย" }}
      />
      <Form.Field>
      <label>
          อัพโหลดรูปภาพอีเว้น <h3 style={{ color: "red" }}>{props.message}</h3>
        </label>
        <label  className="uploadBtnAdmin"> 
        <p className="Color">เลือกรูปภาพ</p>
          <input          
            type="file"
            accept="image/*"
            name="img"
            id="img"
            multiple
            im
            onChange={e => props.handleSelectImage(e)}
            require="true"
          />
           </label>         
        <Imagecontrol files={props.files} DeletePhotoUploaded={props.DeletePhotoUploaded} imageState={props.imageState} handleImageLoaded={props.handleImageLoaded}/>
      </Form.Field>
      <div className="Gap">
          <Form.TextArea
        name="place_content"
        label="ช่องทางการติดต่อ"
        placeholder="ช่องทางการติดต่อสอบถามข้อมูล.."
        width={14}
        value={props.content}
        onChange={(e, { value }) => props.setField("content", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{ isDefaultRequiredValue: "หากไม่มีช่องทางการติดต่อกรุณาใส่ ' - ' " }}
      />
      </div>
      <Form.Group>
      <div className="Radio">
          <Form.Group grouped>
            <label>ค่าเข้าร่วมงาน</label>
            <Form.Radio
              label="มี"
              name="fee"
              value="yes"
              checked={props.fee === "yes"}
              onChange={(e, { value }) => props.FeeOption("fee", value)}
            />
            {props.fee === 'yes' ? (
              <Form.TextArea
                name="feePrice"
                label="ค่าเข้าร่วมงาน"
                placeholder="ค่าเข้าร่วมงาน"
                width={14}
                value={props.feePrice}
                onChange={(e, { value }) => props.FeeOption("feePrice", value)                
              }
                required
                errorLabel={<Label color="red" pointing />}
                validationErrors={{ isDefaultRequiredValue: "ต้องระบุค่าใช้จ่าย" }}
              />
            ) : <p />}
            <Form.Radio
              label="ไม่มี"
              name="fee"
              value="-"
              checked={props.fee === "-"}
              onChange={(e, { value }) => props.FeeOption("fee", value)}
            />
          </Form.Group>
        </div>
      </Form.Group>
      <Form.TextArea
    name="day_tag"
    label="ช่วงเวลาจัดงาน"
    placeholder="ช่วงเวลาจัดงาน"
    width={14}    
    onChange={(e, { value }) => props.DaysSelected("days", value)}
    required
    errorLabel={<Label color="red" pointing />}
    validationErrors={{ isDefaultRequiredValue: "ระบุช่วงเวลาของการจัดงาน" }}
  />
      <div className="Body">
      <label>เวลาเริ่มงาน</label>
        <Dropdown                    
          selection
          options={optionsTime}
          placeholder="เวลาเริ่มงาน"
          renderLabel={renderLabel}
          require="true"
          name="place_open"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "จำเป็นต้องใส่เวลาเริ่มงาน" }}
          onChange={(e, { value }) => props.setField("openTime", value)}
        />
      </div>     
      <div className="Body">
      <label>เวลาปิดงาน</label>
        <Dropdown                    
          selection
          options={optionsTime}
          placeholder="เวลาปิดงาน"
          renderLabel={renderLabel}
          require="true"
          name="place_close"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "จำเป็นต้องใส่เวลาปิดงาน" }}
          onChange={(e, { value }) => props.setField("closeTime", value)}
        />
      </div>      

      <label>แท็กประเภทอีเวนท์</label>
      <div className="Body">
        <Dropdown
          multiple
          selection
          options={props.tagsData}
          placeholder="แท็กของอีเวนท์"
          renderLabel={renderLabel}
          require="true"
          name="place_tag"
          onChange={(e, { value }) => props.TagSelected("tags", value)}
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{
            customValidation: "ต้องเลือกแท็กอย่างน้อย 1 แท็ก"
          }}
        />
      </div>

      <label>สถานที่จัดงาน</label>
      <div className="Body">
        <Dropdown
          selection
          options={optionPlace}
          placeholder="สถานที่จัดงาน"
          renderLabel={renderLabel}
          require="true"
          name="place_select"
          onChange={(e, { value }) => props.PlaceSelected("PlaceId", value)}
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "กรุณาเลือกสถานที่" }}
        />
      </div>

      <div>      
      <br/>
        <center>
        <Button className="submitBtn">สร้างสถานที่</Button> 
        </center>
        <br/>
      </div>
    </div>
  );
};
export default EventForm;
