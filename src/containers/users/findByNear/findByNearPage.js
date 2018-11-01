import React from "react";
import { geolocated } from "react-geolocated";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Table, Dimmer, Loader, Radio, Header, Label ,Icon,Image} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
let user = Cookies.get("user");

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGeoLocation: {},
      userData: [],
      userDistanceInfo: [],
      open: true,
      value: true
    };
  }

  componentWillMount = async () => {
    await this.getData();
    // await this.getCurrentUserStatus()
  };

  componentWillReceiveProps = async props => {
    await this.getCurrentUserStatus();
    const isCheckIn = this.state.value;
    if (isCheckIn) {
      if (props.coords) {
        const resp = await axios.put("/api/updateGeolocation", {
          latitude: props.coords.latitude,
          longitude: props.coords.longitude,
          user: user
        });
        this.setState({
          userGeoLocation: {
            latitude: resp.data.latitude,
            longitude: resp.data.longitude
          }
        });
      }
      await this.storeUserNearBy();
    } else {
      await axios.put("/api/updateGeolocation", {
        latitude: null,
        longitude: null,
        user: user
      });
    }
  };

  modalInbox = async (reciver,avatar) =>{
    return(
      swal({
        title: 'Send message to '+reciver,
        html:
          '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          const message = document.getElementById('swal-input1').value
          const resp = axios.post('/api/sendMessage',{
            content : message,
            sender:user,
            reciver:reciver,
            avatar:avatar
          })

          console.log(resp)
          // return [
          //   // document.getElementById('swal-input1').value

          // ]
        }
      })
    )
  }

  getData = async () => {
    const resp = await axios.get("/api/getAllGeo/" + user);
    this.setState({ userData: resp.data });
  };

  getCurrentUserStatus = async () => {
    const resp = await axios.get("/api/profile/" + user);
    const data = resp.data;
    this.setState({
      value: data.status
    });
  };

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(3) + " Km.";
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  storeUserNearBy = () => {
    const currentUserLat = this.state.userGeoLocation.latitude;
    const currentUserLng = this.state.userGeoLocation.longitude;

    const arr = [];
    this.state.userData.map(data => {
      const resp = this.getDistanceFromLatLonInKm(
        currentUserLat,
        currentUserLng,
        data.latitude,
        data.longitude,
        data.status
      );

      arr.push({
        distance: resp,
        userName: data.userName,
        status: data.status,
        avatar:data.avatar
      });
    });
    this.setState({
      userDistanceInfo: arr
    });
  };

  renderTable = () => {
   const isCheckIn = this.state.value
   if(isCheckIn){
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Distance</Table.HeaderCell>
            <Table.HeaderCell>status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.userDistanceInfo.map((data, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell><Image src={data.avatar} avatar /> &nbsp; {data.userName}</Table.Cell>
              <Table.Cell>{data.distance}</Table.Cell>
              <Table.Cell>
                {data.status ? (
                  <Icon color='black' name='mail' onClick={e=>this.modalInbox(data.userName,data.avatar)} />
                  
                ) : (
                  <Label circular color="red" empty />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
   }else{
     return(
       <p>
         กรุณา checkin
       </p>
     )
   }
  };

  handleChange = async (e, { value }) => {
    if (!value) {
      const resp = await axios.put("/api/updateGeolocation", {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        user: user
      });
      this.setState({
        userGeoLocation: {
          latitude: resp.data.latitude,
          longitude: resp.data.longitude
        }
      });
      window.location.reload()
    }else{
      await axios.put("/api/updateGeolocation", {
        latitude: null,
        longitude: null,
        user: user
      });
    }
    const resp = await axios.put("/api/updateStatus", {
      user: user,
      status: !value
    });
    if (resp.status === 200) {
      this.setState({ value: !value });
    }
  };

  render() {
    const { open } = this.state;
    if (user === undefined) {
      return <Redirect to={{ pathname: "/main" }} />;
    }
    if (!this.props.coords) {
      return (
        <Dimmer active={open} page>
          <Loader size="massive">
            <p>รอแปปนึงกำลังหาคนใกล้ๆ</p>
          </Loader>
        </Dimmer>
      );
    }
    return (
      <div className="container fluid">
        <br />
        <Header as="h2">เช็คอิน</Header>
        <Radio
          toggle
          value={this.state.value}
          checked={this.state.value}
          onChange={this.handleChange}
        />
        {this.renderTable()}
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Demo);
