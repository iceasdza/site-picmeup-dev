import React from "react";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label, Image, Card, Icon } from "semantic-ui-react";
import "../../static/Form.css";

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

const renderLabel = label => ({
  color: "blue",
  content: `${label.text}`,
  icon: "check"
});

const Place_Form = props => {
  return (
    <div className="Body">
      <div className="Head">
        <h1>สร้างสถานที่</h1>
        <hr className="Hr" />
      </div>
      <div className="Form">
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
                <Image src={data} />
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
            <Form.Input
              name="place_open"
              label="เวลาเปิดทำการ"
              placeholder="ใส่ตัวเลข 4 ตัว"
              width={3}
              required
              value={props.openTime}
              onChange={(e, { value }) => props.setField("openTime", value)}
              errorLabel={<Label color="red" pointing />}
              validations="isNumeric,isLength:4"
              validationErrors={{
                isDefaultRequiredValue: "จำเป็นต้องใส่เวลาเปิด",
                isNumeric: "รูปแบบของเวลาไม่ถูกต้อง",
                isLength: "โปรดใส่เวลาให้ถูกต้อง"
              }}
            />
            <Form.Input
              name="place_close"
              label="ถึง"
              placeholder="ใส่ตัวเลข 4 ตัว"
              width={3}
              required
              value={props.closeTime}
              onChange={(e, { value }) => props.setField("closeTime", value)}
              errorLabel={<Label color="red" pointing />}
              validations="isNumeric,isLength:4"
              validationErrors={{
                isDefaultRequiredValue: "จำเป็นต้องใส่เวลาปิด",
                isNumeric: "รูปแบบของเวลาไม่ถูกต้อง",
                isLength: "โปรดใส่เวลาให้ถูกต้อง"
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
        <div>
          <Form.Button floated="right" size="big">
            สร้างสถานที่
          </Form.Button>
        </div>
      </div>
    </div>
  );
};
export default Place_Form;
