import React, { Component } from "react"
import ProfileForm from '../../../components/users/profile/profileForm'
import axios from '../../../lib/axios'
import Cookies from "js-cookie";
const user =  Cookies.get("user")
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            userName: '',
            email: '',
            tel: '',
            status: '',
            onlineStatus: ''
        };
    }
    getData = async () => {
        const resp = await axios.get("/api/profile/" + user);
        const data = resp.data;
        console.log(data)
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            userName: data.userName,
            email: data.email,
            tel: data.tel,
            //   state:data.state,
            //   onlineStatus:data.onlineStatus
        });
    };
    componentDidMount() {
        this.getData()

    }
    
    render() {
        return (
            <div>
                <ProfileForm firstName={this.state.firstName} lastName={this.state.lastName} gender={this.state.gender} userName={this.state.userName} email={this.state.email} tel={this.state.tel} status={this.status} onlineStatus={this.state.onlineStatus} />
            </div>
        )
    }



}

export default Profile