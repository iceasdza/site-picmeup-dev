import React from "react";
import { Form, Dropdown } from "formsy-semantic-ui-react";
import { Label } from "semantic-ui-react";
import "../../../static/Form.css";

import Imagecontrol from "../../../containers/imagerender/imageEditControl"



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

const EventForm = props => {
  const optionPlace = [];
  props.placesData.map((data, index) =>
    optionPlace.push({ key: index + 1, text: data.placeName, value: data._id })
  );
  return (
    <div className="Body">
      <div className="Head">
        <h1>แก้ไขอีเวนท์</h1>
        <hr className="Hr" />
      </div>
      <div className="Form">
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
            อัพโหลดรูปภาพอีเวนท์
            <h3 style={{ color: "red" }}>{props.message}</h3>
          </label>
          <label className="custom-file-upload">
            <p className="Color">อัพโหลดรูปภาพ</p>
            <input
              type="file"
              accept="image/*"
              name="img"
              id="img"
              multiple
              onChange={e => props.handleSelectImage(e)}
              require="true"
            />
          </label>
          <Imagecontrol images={props.images} DeleteImage={props.DeleteImage} files={props.files} DeletePhotoUploaded={props.DeletePhotoUploaded} imageState={props.imageState} handleImageLoaded={props.handleImageLoaded}/>
          {/* <Card.Group itemsPerRow={6}>
          {props.images.map((src, index) => (
            <Card key={index}>
              <div>
                <Icon
                  circular
                  inverted
                  name="remove"
                  color="red"
                  onClick={() => props.DeleteImage(index)}
                />
              </div>
              <Image src={src} className="imageUploadSize" />
            </Card>
          ))}
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
        </Card.Group> */}
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
            name="day_tag"
            errorLabel={<Label color="red" pointing />}
            validations={{
              customValidation: (values, value) => !(!value || value.length < 1)
            }}
            validationErrors={{ customValidation: "ต้องเลือกวันที่เปิดทำการ" }}
            onChange={(e, { value }) => props.DaysSelected("days", value)}
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
          <Form.Button floated="right" size="big">
            แก้ไขอีเวนท์
          </Form.Button>
        </div>
      </div>
    </div>
  );
};
export default EventForm;
