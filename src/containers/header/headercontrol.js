import React, { Component } from 'react';
import Header from "../../components/header/header";
import {
    Menu,
    Button
} from "semantic-ui-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
class HeaderControl extends Component {

    loginTab = () => {
        let tmp = "";

        if (Cookies.get("user") !== undefined) {
            tmp = (
                <Menu.Menu position="right">
                    <Menu.Item>ยินดีต้อนรับคุณ {Cookies.get("user")}</Menu.Item>
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
    }

    render() {
        return (
            <dir>
                <Header loginTab={this.loginTab} />
            </dir>
        )
    }
}
export default HeaderControl