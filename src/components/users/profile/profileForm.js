import React from "react"
import { Message } from "semantic-ui-react";


const ProfileForm = props => {
    return (
        <div>
            <Message>
                <Message.Header>ชื่อ</Message.Header>
                <p>{props.firstName}</p>
                <Message.Header>นามสกุล</Message.Header>
                <p>{props.lastName}</p>
                <Message.Header>เพศ</Message.Header>
                <p>{props.gender}</p>
                <Message.Header>E-Mail</Message.Header>
                <p>{props.email}</p>
                <Message.Header>ชื่อผู้ใช้</Message.Header>
                <p>{props.userName}</p>
                <Message.Header>เบอร์โทรศัพท์</Message.Header>
                <p>{props.tel}</p>
                <Message.Header>ตำเเหน่ง</Message.Header>
                <p></p>
                <Message.Header>สถานะใช้งาน</Message.Header>
                <p></p>
            </Message>
        </div>
    )
}

export default ProfileForm;
