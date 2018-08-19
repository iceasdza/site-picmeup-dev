import React from 'react'
import { Form,Card,Icon,Image } from 'semantic-ui-react'
import "../../../static/Form.css";

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
  ]


const RegisterForm = (props) =>{
        return(
            <div className="container fluid">
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
            <br/>
        <label className={props.isActive} onMouseEnter={props.handleOver} onMouseLeave={props.handleOut}>
            <p className="Color">เลือกรูปภาพ</p>
            <input
              name="img"
              id="img"
              type="file"
              style={{ display: "none" }}
              onChange={e => props.handleSelectImage(e)}
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
            </div>
            
        )
    
}

export default RegisterForm