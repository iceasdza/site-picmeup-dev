import React from 'react'
import {Dropdown, Menu, Button, Input, Segment, Image} from 'semantic-ui-react'
import '../../static/Header.css'
import logo from '../../static/logo-white-test1.png'

const Header_picmeup = () => (
    <div className = "Header-background">
        <Menu secondary inverted>
            <Menu.Menu>
                <a href = 'http://localhost:3000/'>
                    <Image src = {logo} height="45" width="150"/>
                </a>
            </Menu.Menu>
            <Menu.Item link name = 'สถานที่ที่น่าสนใจ'/>
            <Menu.Item link name = 'อีเว้นท์ที่กำลังมาแรง'/>
            <Menu.Item link name = "สนทนา"/>
            <Dropdown item text = 'จัดการ'>
                <Dropdown.Menu>
                    <Dropdown.Item>สร้างสถานที่</Dropdown.Item>
                    <Dropdown.Item>สร้างอีเว้นท์</Dropdown.Item> 
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position = 'right'>
                <Menu.Item>
                <Input icon = 'search' placeholder='ค้นหา...' />
                </Menu.Item>
                <div className = "Login">
                    <Button primary>สมัครสมาชิก</Button>
                    <Button secondary>เข้าสู่ระบบ</Button>
                </div>
            </Menu.Menu>
        </Menu>
    </div>
)
export default Header_picmeup