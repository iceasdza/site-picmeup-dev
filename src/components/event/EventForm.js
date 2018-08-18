import React from 'react'
import { Form, Dropdown } from 'formsy-semantic-ui-react'
import { Label, Image, Card, Icon } from 'semantic-ui-react'
import '../../static/Form.css'

const optionsTag = [
    { key: 1, text: 'สัตว์เลี้ยง', value: 'สัตว์เลี้ยง' },
    { key: 2, text: 'ท่องเที่ยว', value: 'ท่องเที่ยว' },
    { key: 3, text: 'ต้นไม้', value: 'ต้นไม้' },
    { key: 4, text: 'กีฬา', value: 'กีฬา' },
    { key: 5, text: 'ธุรกิจ', value: 'ธุรกิจ' },
]

const optionsDay = [
    { key: 1, text: 'วันจันทร์', value: 'mon' },
    { key: 2, text: 'วันอังคาร', value: 'tue' },
    { key: 3, text: 'วันพุธ', value: 'wed' },
    { key: 4, text: 'วันพฤหัสบดี', value: 'thu' },
    { key: 5, text: 'วันศุกร์', value: 'fri' },
    { key: 6, text: 'วันเสาร์', value: 'sat' },
    { key: 7, text: 'วันอาทิตย์', value: 'sun' },
]


const renderLabel = label => ({
    color: 'blue',
    content: `${label.text}`,
    icon: 'check',
})



const EventForm = (props) => {
    const optionPlace = []
    props.placesData.map((data, index) => (
        optionPlace.push({ key: index + 1, text: data.placeName, value: data._id }
        )))
    return (
        <div className="Body">
            <div className="Head">
                <h1>สร้างอีเวนท์</h1>
                <hr className="Hr" />
            </div>
            <div className="Form">
                <Form.Input label='ชื่ออีเวนท์' name="place_name" placeholder='ชื่ออีเวนท์..' width={8} value={props.eventName}
                    onChange={(e, { value }) => props.setField("eventName", value)} required errorLabel={<Label color="red" pointing />}
                    validationErrors={{ isDefaultRequiredValue: 'จำเป็นต้องใส่ชื่ออีเวนท์', }}
                />
                <Form.TextArea name="place_desc" label='คำอธิบายอีเวนท์' placeholder='เกี่ยวกับอีเวนท์..' width={14} value={props.eventDes}
                    onChange={(e, { value }) => props.setField("eventDes", value)} required errorLabel={<Label color="red" pointing />}
                    validationErrors={{ isDefaultRequiredValue: 'จำเป็นต้องใส่คำอธิบาย', }} />
                <Form.Field>
                    <label>อัพโหลดรูปภาพอีเวนท์<h3 style={{color:"red"}}>{props.message}</h3></label>
                    <label className="custom-file-upload">
                        <p className="Color">อัพโหลดรูปภาพ</p>
                        <input type="file" accept="image/*" name="img" id="img" multiple onChange={(event) => props.GetFileUploaded('FileList', event.target.files)} require="true" />
                    </label>
                    <Card.Group itemsPerRow={6}>
                        {props.FileList.map((src, index) => (
                            <Card>
                                <div>
                                    <Icon circular inverted name='remove' color="red" onClick={() => props.DeletePhotoUploaded("photo", src.slice(36 + 5), index)} />
                                </div>
                                <Image src={src} />
                            </Card>
                        ))}
                    </Card.Group>


                </Form.Field>
                <div className="Gap">
                    <Form.Group>
                        <Form.Input name="place_tel" label='เบอร์โทรติดต่อ' placeholder='ใส่เลขเบอร์ 9 หรือ 10 ตัว' width={5} required value={props.tel} onChange={(e, { value }) => props.setField("tel", value)} errorLabel={<Label color="red" pointing />} validations="isNumeric,minLength:9,maxLength:10" validationErrors={{ isDefaultRequiredValue: 'จำเป็นต้องใส่เบอร์ติดต่อ', isNumeric: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง', minLength: 'โปรดใส่เบอร์โทรศัพท์ให้ครบถ้วน', maxLength: 'โปรดใส่เบอร์โทรศัพท์ให้ถูกต้อง' }} />
                        <Form.Input name="place_open" label='เวลาเปิดทำการ' placeholder='ใส่ตัวเลข 4 ตัว' width={3} required value={props.openTime} onChange={(e, { value }) => props.setField("openTime", value)} errorLabel={<Label color="red" pointing />} validations="isNumeric,isLength:4" validationErrors={{ isDefaultRequiredValue: 'จำเป็นต้องใส่เวลาเปิด', isNumeric: 'รูปแบบของเวลาไม่ถูกต้อง', isLength: 'โปรดใส่เวลาให้ถูกต้อง' }} />
                        <Form.Input name="place_close" label='ถึง' placeholder='ใส่ตัวเลข 4 ตัว' width={3} required value={props.closeTime} onChange={(e, { value }) => props.setField("closeTime", value)} errorLabel={<Label color="red" pointing />} validations="isNumeric,isLength:4" validationErrors={{ isDefaultRequiredValue: 'จำเป็นต้องใส่เวลาปิด', isNumeric: 'รูปแบบของเวลาไม่ถูกต้อง', isLength: 'โปรดใส่เวลาให้ถูกต้อง' }} />
                    </Form.Group>
                </div>
                <Form.Group>
                    <div className="Radio">
                        <Form.Group grouped>
                            <label>ค่าใช้จ่าย</label>
                            <Form.Radio label='มี' name='fee' value='yes' checked={props.fee === 'yes'} onChange={(e, { value }) => props.FeeOption('fee', value)} />
                            <Form.Radio label='ไม่มี' name='fee' value='no' checked={props.fee === 'no'} onChange={(e, { value }) => props.FeeOption('fee', value)} />
                        </Form.Group>
                    </div>
                    <div className="Radio">
                        <Form.Group grouped>
                            <label>ที่จอดรถ</label>
                            <Form.Radio label='มี' name='parking' value='yes' checked={props.carParking === 'yes'} onChange={(e, { value }) => props.CarParkingOption('carParking', value)} />
                            <Form.Radio label='ไม่มี' name='parking' value='no' checked={props.carParking === 'no'} onChange={(e, { value }) => props.CarParkingOption('carParking', value)} />
                        </Form.Group>
                    </div>
                </Form.Group>
                <label>วันที่เปิดทำการ</label>
                <div className="Body">
                    <Dropdown multiple selection options={optionsDay} placeholder='วันที่เปิดทำการ' renderLabel={renderLabel} require="true" name="day_tag" errorLabel={<Label color="red" pointing />} validations={{ customValidation: (values, value) => !(!value || value.length < 1), }} validationErrors={{ customValidation: 'ต้องเลือกวันที่เปิดทำการ', }} onChange={(e, { value }) => props.DaysSelected('days', value)} />
                </div>

                <label>แท็กประเภทอีเวนท์</label>
                <div className="Body">
                    <Dropdown multiple selection options={optionsTag} placeholder='แท็กของอีเวนท์' renderLabel={renderLabel} require="true" name="place_tag" onChange={(e, { value }) => props.TagSelected('tags', value)} errorLabel={<Label color="red" pointing />} validations={{ customValidation: (values, value) => !(!value || value.length < 1), }} validationErrors={{ customValidation: 'ต้องเลือกแท็กอย่างน้อย 1 แท็ก', }} />
                </div>

                <label>สถานที่จัดงาน</label>
                <div className="Body">
                    <Dropdown selection options={optionPlace} placeholder='สถานที่จัดงาน' renderLabel={renderLabel} require="true" name="place_select" onChange={(e, { value }) => props.PlaceSelected('PlaceId', value)} errorLabel={<Label color="red" pointing />} validations={{ customValidation: (values, value) => !(!value || value.length < 1), }} validationErrors={{ customValidation: 'กรุณาเลือกสถานที่', }} />
                </div>
                <p>แผนที่</p>

                <div>
                    <Form.Button floated='right' size='big'>สร้างอีเวนท์</Form.Button>
                </div>
            </div>
        </div>
    )
}
export default EventForm