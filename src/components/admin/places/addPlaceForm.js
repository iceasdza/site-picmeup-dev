import React from "react";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label, Image, Card, Icon,Divider} from "semantic-ui-react";
import "../../../static/Form.css";

const optionsTag = [
  { key: 1, text: "สวน", value: "สวน" },
  { key: 2, text: "ป่า", value: "ป่า" },
  { key: 3, text: "เมือง", value: "เมือง" }
];

const optionsDay = [
  { key: 1, text: "วันจันทร์", value: "mon" },
  { key: 2, text: "วันอังคาร", value: "tue" },
  { key: 3, text: "วันพุธ", value: "wed" },
  { key: 4, text: "วันพฤหัสบดี", value: "thu" },
  { key: 5, text: "วันศุกร์", value: "fri" },
  { key: 6, text: "วันเสาร์", value: "sat" },
  { key: 7, text: "วันอาทิตย์", value: "sun" }
];

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

const Place_Form = props => {
  return (
    <div className="container fluid">
      <Divider horizontal>สร้างสถานที่</Divider>
      <Form.Input
        label="ชื่อสถานที่"
        name="place_name"
        placeholder="ชื่อสถานที่.."
        width={8}
        value={props.placeName}
        onChange={(e, { value }) => props.setField("placeName", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{
          isDefaultRequiredValue: "จำเป็นต้องใส่ชื่อสถานที่"
        }}
      />
      <Form.TextArea
        name="place_desc"
        label="คำอธิบายสถานที่"
        placeholder="เกี่ยวกับสถานที่.."
        width={14}
        value={props.placeDes}
        onChange={(e, { value }) => props.setField("placeDes", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{ isDefaultRequiredValue: "จำเป็นต้องใส่คำอธิบาย" }}
      />
      <Form.Field>
        <label>
          อัพโหลดรูปภาพสถานที่{" "}
          <h3 style={{ color: "red" }}>{props.message}</h3>
        </label>
        <label className="custom-file-upload">
          <p className="Color">อัพโหลดรูปภาพ</p>
          <input
            name="img"
            id="img"
            type="file"
            style={{ display: "none" }}
            onChange={e => props.handleSelectImage(e)}
            multiple
          />
        </label>
        <Card.Group itemsPerRow={6}>
          {props.files.map((data, index) => (
            <Card key={index}>
              <div>
                <Icon
                  circular
                  inverted
                  name="remove"
                  color="red"
                  onClick={() => props.DeletePhotoUploaded("files", index)}
                />
              </div>
              <Image src={data} className="imageUploadSize" />
            </Card>
          ))}
        </Card.Group>
      </Form.Field>
      <div className="Gap">
        <Form.Group>
          <Form.Input
            name="place_tel"
            label="เบอร์โทรติดต่อ"
            placeholder="ใส่เลขเบอร์ 9 หรือ 10 ตัว"
            width={5}
            required
            value={props.tel}
            onChange={(e, { value }) => props.setField("tel", value)}
            errorLabel={<Label color="red" pointing />}
            validations="isNumeric,minLength:9,maxLength:10"
            validationErrors={{
              isDefaultRequiredValue: "จำเป็นต้องใส่เบอร์ติดต่อ",
              isNumeric: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง",
              minLength: "โปรดใส่เบอร์โทรศัพท์ให้ครบถ้วน",
              maxLength: "โปรดใส่เบอร์โทรศัพท์ให้ถูกต้อง"
            }}
          />
        </Form.Group>
      </div>
      <Form.Group>
        <div className="Radio">
          <Form.Group grouped>
            <label>ค่าใช้จ่าย</label>
            <Form.Radio
              label="มี"
              name="fee"
              value="yes"
              checked={props.fee === "yes"}
              onChange={(e, { value }) => props.FeeOption("fee", value)}
            />
            <Form.Radio
              label="ไม่มี"
              name="fee"
              value="no"
              checked={props.fee === "no"}
              onChange={(e, { value }) => props.FeeOption("fee", value)}
            />
          </Form.Group>
        </div>
        <div className="Radio">
          <Form.Group grouped>
            <label>ที่จอดรถ</label>
            <Form.Radio
              label="มี"
              name="parking"
              value="yes"
              checked={props.carParking === "yes"}
              onChange={(e, { value }) =>
                props.CarParkingOption("carParking", value)
              }
            />
            <Form.Radio
              label="ไม่มี"
              name="parking"
              value="no"
              checked={props.carParking === "no"}
              onChange={(e, { value }) =>
                props.CarParkingOption("carParking", value)
              }
            />            
          </Form.Group>
        </div>
      </Form.Group>
      <label>วันที่เปิดทำการ</label>
      <div className="Body">
        <Dropdown
          multiple
          selection
          options={optionsDay}
          placeholder="วันที่เปิดทำการ"
          renderLabel={renderLabel}
          require="true"
          name="place_day"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "ต้องเลือกวันที่เปิดทำการ" }}
          onChange={(e, { value }) => props.DaysSelected("days", value)}
        />
      </div>
<Form.Group>
      <div className="Body">
      <label>เวลาเปิดทำการ</label>
        <Dropdown                    
          selection
          options={optionsTime}
          placeholder="เวลาเปิดทำการ"
          renderLabel={renderLabel}
          require="true"
          name="place_open"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "จำเป็นต้องใส่เวลาเปิด" }}
          onChange={(e, { value }) => props.setField("openTime", value)}
        />
      </div>     
      <div className="Body">
      <label>เวลาปิดทำการ</label>
        <Dropdown                    
          selection
          options={optionsTime}
          placeholder="เวลาปิดทำการ"
          renderLabel={renderLabel}
          require="true"
          name="place_close"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{ customValidation: "จำเป็นต้องใส่เวลาปิด" }}
          onChange={(e, { value }) => props.setField("closeTime", value)}
        />
      </div>      
</Form.Group>
      <label>แท็กประเภทสถานที่</label>
      <div className="Body">
        <Dropdown
          multiple
          selection
          options={optionsTag}
          placeholder="แท็กของสถานที่"
          renderLabel={renderLabel}
          require="true"
          name="place_tag"
          errorLabel={<Label color="red" pointing />}
          validations={{
            customValidation: (values, value) => !(!value || value.length < 1)
          }}
          validationErrors={{
            customValidation: "ต้องเลือกแท็กอย่างน้อย 1 แท็ก"
          }}
          onChange={(e, { value }) => props.TagSelected("tags", value)}
        />
      </div>
      <p>แผนที่</p>
      {props.renderGoogleMap()}
      <div>
        <Form.Button floated="right" size="big" style={{zIndex:'4'}}>
          สร้างสถานที่
          </Form.Button>
      </div>
    </div>
  );
};
export default Place_Form;
