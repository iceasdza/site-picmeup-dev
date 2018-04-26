import React, { Component } from 'react'
import {Form} from 'formsy-semantic-ui-react'
const formUpload = (props) => {
    return (
        <Form.Field>
            <label>อัพโหลดรูปภาพสถานที่</label>
            <label className="custom-file-upload">
                <p className="Color">อัพโหลดรูปภาพ</p>
                <input id="img" multiple type="file" name="img[]"  onChange={(event) => props.GetFileUploaded('FileList', event.target.files)
                } />
            </label>
        </Form.Field>   
    )
}

export default formUpload