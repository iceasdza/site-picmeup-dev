import React, { Component } from 'react';
import Header from "../../components/header/header";
import {
    Menu,
    Button
} from "semantic-ui-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Image } from 'semantic-ui-react'
class HeaderControl extends Component {

    state={
        redirect:false
    }

    loginTab = () => {
        let tmp = "";

        if (Cookies.get("user") !== undefined) {
            console.log(Cookies.get('userAvatar'))
            tmp = (
                <Menu.Menu position="right">
                    <Menu.Item>ยินดีต้อนรับคุณ {Cookies.get("user")} <Image src={Cookies.get('userAvatar')} avatar /></Menu.Item>
                    <Menu.Item>
                        <Button inverted onClick={this.logout}>ลงชื่อออก</Button>
                    </Menu.Item>
                </Menu.Menu>
            );
        } else {
            tmp = (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Link to={{ pathname: "/login" }}>
                            <Button inverted>ลงชื่อเข้าใช้</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={{ pathname: "/register" }}>
                            <Button inverted>สมัครสมาชิก</Button>
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            );
        }
        return tmp;
    };

    logout = () => {
        Cookies.remove('user');
        this.setState({ redirect: true })
        console.log(Cookies.get('user'))
    }

    render() {
        let {redirect } = this.state
        if(redirect && Cookies.get("user") === undefined){
            console.log('logout')
            return (
                <Redirect
                  to="/login"
                />
              )
        }
        return (
            <div>
                <Header loginTab={this.loginTab} />
            </div>
        )
    }
}
export default HeaderControl