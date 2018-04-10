import React, {Component} from 'react'
import {Button, Checkbox, Form, Dropdown, Confirm} from 'semantic-ui-react'
import './Form.css'

const options = [
    { key: 1, text: 'สวน', value: 1 },
    { key: 2, text: 'ป่า', value: 2 },
    { key: 3, text: 'เมือง', value: 3 },
  ]

  const renderLabel = label => ({
    color: 'blue',
    content: `แท็ก - ${label.text}`,
    icon: 'check',
  })

const Place_Form = () => (
    <div className = "Body">
        <div className = "Head">
            <h1>สร้างสถานที่</h1>
            <hr class = "Hr"/>
        </div>
        <div className = "Form">
            <Form>
            <Form.Field width={8} required>
                <label>ชื่อสถานที่</label>
                <input name="place_name" placeholder='ชื่อสถานที่..' />
            </Form.Field>
            <Form.TextArea name="place_desc" label='คำอธิบายสถานที่' placeholder='เกี่ยวกับสถานที่..' width={14} required/>
            <Form.Field>
                <label>อัพโหลดรูปภาพสถานที่</label>
                <label class="custom-file-upload">
                    <p class="Color">อัพโหลดรูปภาพ</p>
                    <input type="file" name="img" multiple/>
                </label>
            </Form.Field>
            <Form.Group>
                <Form.Input name="place_tel" label='เบอร์โทรติดต่อ' placeholder='เบอร์โทร' width={5} required/>
                <Form.Input name="place_open" label='เวลาเปิดทำการ' placeholder='เวลาเปิด' width={3} required/>
                <Form.Input name="place_close" label='ถึง' placeholder='เวลาปิด' width={3} required/>
            </Form.Group>
            <Form.Group>
                <div className="Radio">
                    <Form.Group grouped>
                        <label>ค่าใช้จ่าย</label>
                        <Form.Field label='มี' control='input' type='radio' name='fee' />
                        <Form.Field label='ไม่มี' control='input' type='radio' name='fee' checked/>
                    </Form.Group>
                </div>
                <div className="Radio">
                    <Form.Group grouped>
                        <label>ที่จอดรถ</label>
                        <Form.Field label='มี' control='input' type='radio' name='parking' checked/>
                        <Form.Field label='ไม่มี' control='input' type='radio' name='parking' />
                    </Form.Group>
                </div>
                <Form.Field required>
                    <div className="Radio">
                            <Form.Group grouped>
                                <label>วันที่เปิดทำการ</label>
                                <Form.Field label='วันจันทร์' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันอังคาร' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันพุธ' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันพฤหัสบดี' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันศุกร์' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันเสาร์' control='input' type='checkbox' name='day' checked/>
                                <Form.Field label='วันอาทิตย์' control='input' type='checkbox' name='day' checked/>
                            </Form.Group>
                    </div>
                </Form.Field>
            </Form.Group>
            <Form.Field required>
                <label>แท็กประเภทสถานที่</label>
                <div className="Body">
                    <Dropdown
                        multiple
                        selection
                        options={options}
                        placeholder='แท็กของสถานที่'
                        renderLabel={renderLabel}
                        require
                        name="place_tag"
                    />
                </div>
            </Form.Field>
                <p>แผนที่</p>

            <div>
                <Form.Button floated='right' size='big'>สร้างสถานที่</Form.Button>
            </div>
            </Form>
        </div>
    </div>
)
export default Place_Form