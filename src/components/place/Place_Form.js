import React from 'react'
import { Form, Dropdown} from 'formsy-semantic-ui-react'
import {Label} from 'semantic-ui-react'
import '../../static/Form.css'

const optionsTag = [
    { key: 1, text: 'สวน', value: 'สวน' },
    { key: 2, text: 'ป่า', value: 'ป่า' },
    { key: 3, text: 'เมือง', value: 'เมือง' },
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



const Place_Form = (props) => {
    return (
        <div className="Body">
            <div className="Head">
                <h1>สร้างสถานที่</h1>
                <hr className="Hr" />
            </div>
            <div className="Form">
                <Form.Input label='ชื่อสถานที่' name="place_name" placeholder='ชื่อสถานที่..' width={8} value={props.placeName} onChange={(e, { value }) => props.setField("placeName", value)} required errorLabel={ <Label color="red" pointing/> } validationErrors={{isDefaultRequiredValue: 'จำเป็นต้องใส่ชื่อสถานที่',}}/>
                <Form.TextArea name="place_desc" label='คำอธิบายสถานที่' placeholder='เกี่ยวกับสถานที่..' width={14} value={props.placeDes} onChange={(e, { value }) => props.setField("placeDes", value)} required errorLabel={ <Label color="red" pointing/> } validationErrors={{isDefaultRequiredValue: 'จำเป็นต้องใส่คำอธิบาย',}}/>
                <Form.Field>
                    <label>อัพโหลดรูปภาพสถานที่</label>
                    <label className="custom-file-upload">
                        <p className="Color">อัพโหลดรูปภาพ</p>
                        <input type="file" name="img" multiple  onChange={(event) => props.GetFileUploaded('files',event.target.files)
                            }/>
                    </label>
                </Form.Field>
                <Form.Group>
                    <Form.Input name="place_tel" label='เบอร์โทรติดต่อ' placeholder='เบอร์โทร' width={5} required value={props.tel} onChange={(e, { value }) => props.setField("tel", value)} errorLabel={ <Label color="red" pointing/> } validations={{customValidation: (values, value) => !(!value || value.length > 10 || value.length <= 8),}} validationErrors={{isDefaultRequiredValue: 'จำเป็นต้องใส่เบอร์ติดต่อ',customValidation: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'}}/>
                    <Form.Input name="place_open" label='เวลาเปิดทำการ' placeholder='เวลาเปิด' width={3} required value={props.openTime} onChange={(e, { value }) => props.setField("openTime", value)} errorLabel={ <Label color="red" pointing/> } validationErrors={{isDefaultRequiredValue: 'จำเป็นต้องใส่เวลาเปิด',}}/>
                    <Form.Input name="place_close" label='ถึง' placeholder='เวลาปิด' width={3}  required value={props.closeTime} onChange={(e, { value }) => props.setField("closeTime", value)} errorLabel={ <Label color="red" pointing/> } validationErrors={{isDefaultRequiredValue: 'จำเป็นต้องใส่เวลาปิด',}}/>
                </Form.Group>
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
                    {/* <div className="Radio">
                        <Form.Group grouped>
                            <label>วันที่เปิดทำการ</label>
                            <Form.Checkbox label='วันจันทร์' name='day' value="mon" checked="{props.mon}" onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันอังคาร' name='day' value='tue' checked={props.tue} onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันพุธ' name='day' value='wed' checked={props.wed} onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันพฤหัสบดี' name='day' value='thu' checked={props.thu}  onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันศุกร์' name='day' value='fri' checked={props.fri}  onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันเสาร์' name='day' value='sat' checked={props.sat}  onChange={(e, { value }) => props.DaysSelected('days', value)} />
                            <Form.Checkbox label='วันอาทิตย์' name='day' value='sun' checked={props.sun}  onChange={(e, { value }) => props.DaysSelected('days', value)} />
                        </Form.Group>
                    </div> */}
                </Form.Group>
                <label>วันที่เปิดทำการ</label>
                    <div className="Body">
                        <Dropdown multiple selection options={optionsDay} placeholder='วันที่เปิดทำการ' renderLabel={renderLabel} require="true" name="place_tag" errorLabel = {<Label color="red" pointing/>} validations={{customValidation: (values, value) => !(!value || value.length < 1),}} validationErrors={{customValidation: 'ต้องเลือกวันที่เปิดทำการ',}}/>
                    </div>
                <label>แท็กประเภทสถานที่</label>
                <div className="Body">
                    <Dropdown multiple selection options={optionsTag} placeholder='แท็กของสถานที่' renderLabel={renderLabel} require="true" name="place_tag" onChange={(e,{value})=> props.TagSelected('tags',value)} errorLabel = {<Label color="red" pointing/>} validations={{customValidation: (values, value) => !(!value || value.length < 1),}} validationErrors={{customValidation: 'ต้องเลือกแท็กอย่างน้อย 1 แท็ก',}}/>
                </div>
                <p>แผนที่</p>
                <div>
                    <Form.Button floated='right' size='big'>สร้างสถานที่</Form.Button>
                </div>
            </div>
        </div>
    )
}
export default Place_Form