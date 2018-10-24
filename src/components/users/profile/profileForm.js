import React from "react"
import {  Message } from "semantic-ui-react";


const ProfileForm = props => {
    return (
        <div>
            <Message>
                <Message.Header>Changes in Service</Message.Header>
                <p>
                    We updated our privacy policy here to better service our customers. We recommend reviewing the
                    changes.
    </p>
            </Message>
            {/* <Form.Group widths="equal">
                <Form.Input
                    fluid
                    name="fistName"
                    label="ชื่อ"
                    placeholder="First name"                  
                />
                <Form.Input
                    fluid
                    name="lastName"
                    label="นามสกุล"
                    placeholder="Last name"
                    required                    
                />
            </Form.Group>
            <Form.Input
                    fluid
                    name="fistGender"
                    label="เพศ"               
                    placeholder="Gender"
                    required                   
                />
            <Form.Input
                fluid
                name="email"
                label="อีเมล"
                placeholder="email"
                required               
            />           
            <br />
            <br />    
            <Form.Input
                fluid
                name="userName"
                label={"ชื่อผู้ใช้"}
                placeholder="username"
                required
            />
            <Form.Input
                fluid
                name="password"
                label="พาสเวิร์ด"
                placeholder="Password"
                type="password"
                required
            />            
            <Form.Input
                fluid
                name="tel"
                label="เบอร์โทร"
                placeholder="tel"
                required
            />
            <br />
            <br />
            <br />
            <Button>Submit</Button> */}
        </div>
    )
}

export default ProfileForm;
