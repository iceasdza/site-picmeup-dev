import React from "react";
import { geolocated } from "react-geolocated";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Table,
  Dimmer,
  Loader,
  Radio,
  Header,
  Label,
  Icon,
  Image,
  Form,
  Grid,
  Segment,
  Responsive
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import moment from "moment";
import "../../../static/findbynear.css";
let user = Cookies.get("user");

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGeoLocation: {},
      userData: [],
      userDistanceInfo: [],
      open: true,
      value: true,
      lastCheckIn: moment(),
      distance: "1",
      calculatedDistance: []
    };
  }

  // handleChange = (e, { value }) => this.setState({ value })

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

  modalInbox = async (reciver, avatar) => {
    return swal({
      title: "Send message to " + reciver,

      html: '<input id="swal-input1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        const message = document.getElementById("swal-input1").value;
        axios.post("/api/sendMessage", {
          content: message,
          sender: user,
          reciver: reciver,
          avatar: avatar
        });
      }
    });
  };

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
        avatar: data.avatar,
        lastCheckIn: data.lastCheckIn
      });
    });
    const calculated = [];
    arr.forEach(element => {
      const distance = parseInt(
        element.distance.substr(0, element.distance.length - 4)
      );
      if (distance <= 1) {
        calculated.push(element);
      }
    });
    this.setState({
      userDistanceInfo: arr,
      calculatedDistance: calculated
    });
  };

  renderTable = () => {
    const isCheckIn = this.state.value;
    if (isCheckIn) {
      return (
<div className="container fluid tableData">
              <Table unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>ชื่อผู้ใช้</Table.HeaderCell>
                    <Table.HeaderCell>ระยะทาง (กิโลเมตร)</Table.HeaderCell>
                    <Table.HeaderCell>ส่งข้อความ</Table.HeaderCell>
                    <Table.HeaderCell>เช็คอินล่าสุด</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.calculatedDistance.map((data, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <Image src={data.avatar} avatar /> &nbsp;{" "}
                        {data.userName}
                      </Table.Cell>
                      <Table.Cell>{data.distance}</Table.Cell>
                      <Table.Cell>
                        {data.status ? (
                          <Icon
                            color="black"
                            name="mail"
                            onClick={e =>
                              this.modalInbox(data.userName, data.avatar)
                            }
                          />
                        ) : (
                          <Label circular color="red" empty />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {data.lastCheckIn.replace(
                          /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\D07:00)/,
                          "เช็คอินล่าสุดวันที่ | $3/$2/$1 เวลา $4:$5 น."
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
      );
    } else {
      return;
    }
  };

  handleChange = async (e, { value }) => {
    if (!value) {
      const resp = await axios.put("/api/updateGeolocation", {
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
        user: user,
        lastCheckIn: Date.now()
      });
      this.setState({
        userGeoLocation: {
          latitude: resp.data.latitude,
          longitude: resp.data.longitude
        }
      });
      window.location.reload();
    } else {
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

  handleChangeDistance = (e, { value }) => {
    const data = this.state.userDistanceInfo;
    const arr = [];
    data.forEach(element => {
      const distance = parseInt(
        element.distance.substr(0, element.distance.length - 4)
      );
      if (distance <= value) {
        arr.push(element);
      }
    });

    this.setState({ distance: value, calculatedDistance: arr });
  };

  renderSelect = () => {
    return (
      <Segment.Group>
        <Responsive
          as={Segment}
          minWidth={0}
          maxWidth={767}
          className="mobileSelect"
        >
          <div>
            <Header as="h2" className="headerSelectMobile">
              เช็คอิน
            </Header>
            <Radio
              toggle
              value={this.state.value}
              checked={this.state.value}
              onChange={this.handleChange}
            />
            {this.state.value ? (
              <Form>
                <center>
                  <h1 className="headerSelectMobile">ค้นหาในระยะ</h1>
                </center>
                <Form.Radio
                  className="radioSelectMobile"
                  label="1 km."
                  value="1"
                  checked={this.state.distance === "1"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelectMobile"
                  label="2 km."
                  value="2"
                  checked={this.state.distance === "2"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelectMobile"
                  label="5 km."
                  value="5"
                  checked={this.state.distance === "5"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelectMobile"
                  label="10 km."
                  value="10"
                  checked={this.state.distance === "10"}
                  onChange={this.handleChangeDistance}
                />
              </Form>
            ) : (
              <p>กรุณาเช็คอินเพื่อค้นหาเพื่อนถ่ายรูปใกล้เคียง</p>
            )}
          </div>
        </Responsive>

        <Responsive as={Segment} minWidth={767} className="formSelect">
          <div>
            <Header as="h2" className="headerSelect">
              เช็คอิน
            </Header>
            <Radio
              toggle
              value={this.state.value}
              checked={this.state.value}
              onChange={this.handleChange}
            />
            {this.state.value ? (
              <Form>
                <center>
                  <h1 className="headerSelect">ค้นหาในระยะ</h1>
                </center>
                <Form.Radio
                  className="radioSelect"
                  label="1 km."
                  value="1"
                  checked={this.state.distance === "1"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelect"
                  label="2 km."
                  value="2"
                  checked={this.state.distance === "2"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelect"
                  label="5 km."
                  value="5"
                  checked={this.state.distance === "5"}
                  onChange={this.handleChangeDistance}
                />{" "}
                <Form.Radio
                  className="radioSelect"
                  label="10 km."
                  value="10"
                  checked={this.state.distance === "10"}
                  onChange={this.handleChangeDistance}
                />
              </Form>
            ) : (
              <p>กรุณาเช็คอินเพื่อค้นหาเพื่อนถ่ายรูปใกล้เคียง</p>
            )}
          </div>
        </Responsive>
      </Segment.Group>
    );
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
      <div>
        <div className="bannerFindByNear">
          <h1 className="bannerHeaderFindByNear">
            ค้นหาเพื่อนถ่ายรูปใกล้ตัวคุณ!
            <br />
          </h1>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column />
              <Grid.Column>{this.renderSelect()}</Grid.Column>
              <Grid.Column />
            </Grid.Row>
          </Grid>
          {this.renderTable()}
        </div>
        <br />
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
