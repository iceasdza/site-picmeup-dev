import React, {Component} from 'react'
import { Dropdown, Menu, Button, Input, Image, Responsive, Sidebar, Icon} from 'semantic-ui-react'
import './Header.css'
import logo from './logo-white-test1.png'

class Header_picmeup extends Component{
    state = {visible : false}

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    render(){
        const { visible } = this.state
        return (
        <div>    
            <div className = "Header-background">
                <Responsive {...Responsive.onlyComputer}>
                    <Menu secondary inverted>
                        <Menu.Menu>
                            <a href = 'http://localhost:3000/'>
                                <Image className="Img" src = {logo} width="150"/>
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
                    </Responsive>
                </div>
                <Responsive {...Responsive.onlyMobile}>
                    <Sidebar.Pushable >
                    <Sidebar as={Menu} animation='push' visible={visible} vertical>
                        <Menu.Item name='home'>
                            สถานที่ที่น่าสนใจ
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            อีเว้นท์ที่กำลังมาแรง
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            สนทนา
                        </Menu.Item>
                        <Menu.Item>
                            สร้างสถานที่
                        </Menu.Item>
                        <Menu.Item>
                            สร้างอีเว้นท์
                        </Menu.Item>  
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className="Header-background">
                            <Menu secondary inverted>
                                <Menu.Item onClick={this.toggleVisibility}>
                                    <Icon name='sidebar' /> 
                                </Menu.Item>
                                    <Menu.Item position='right'>
                                        <Input size='mini' icon = 'search' placeholder='ค้นหา...' />
                                    </Menu.Item>
                            </Menu>
                        </div>
                    </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Responsive>
        </div>
        )
    }
}
export default Header_picmeup