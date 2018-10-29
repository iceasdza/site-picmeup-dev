import React, { Component } from "react"
import axios from '../../../lib/axios'
import Cookies from "js-cookie";
import { Form } from "formsy-semantic-ui-react";
import {Button } from 'semantic-ui-react'
const user = Cookies.get("user")
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            tel: '',
        };
    }
    getData = async () => {
        const resp = await axios.get("/api/profile/" + user);
        const data = resp.data;
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            tel: data.tel,
        });
    };
    componentDidMount() {
        this.getData()

    }
    handleSubmit = async () => {
        const resp = await axios.put("/api/updateProfile/" + user, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            tel: this.state.tel
        });

        console.log(resp)
    };

    // handleOnChange = (filed,value)=>{
    //     console.log(filed,value)
    //     this.setState({[filed]:value})
    // }
    handleOnChange = key => e => {
        this.setState({ [key]: e.target.value })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            label="ชื่อ"
                            name="first_name"
                            placeholder={this.state.firstName}
                            width={8}
                            value={this.state.firstName}
                            // onChange={e=>this.handleOnChange('firstName',e.target.value)}
                            onChange={this.handleOnChange('firstName')}
                        />
                        <Form.Input
                            label="นามสกุล"
                            name="last_name"
                            placeholder={this.state.lastName}
                            width={8}
                            value={this.state.lastName}
                            onChange={this.handleOnChange('lastName')}
                        />
                        <Form.Input
                            label="email"
                            name="email"
                            placeholder={this.state.email}
                            width={8}
                            value={this.state.email}
                            onChange={this.handleOnChange('email')}
                        />
                        <Form.Input
                            label="เบอร์โทรศัพท์"
                            name="tel"
                            placeholder={this.state.tel}
                            width={8}
                            value={this.state.tel}
                            onChange={this.handleOnChange('tel')}
                        />
                        <Button>Submit</Button>
                </Form>
            </div>
        )
    }



}

export default EditProfile