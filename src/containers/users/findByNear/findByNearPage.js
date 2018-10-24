import React from "react";
import { geolocated } from "react-geolocated";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Table } from "semantic-ui-react";
let user = Cookies.get("user");
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: "",
      userLng: "",
      userData: []
    };
  }

  componentDidUpdate() {
    this.sendData();
  }
  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const resp = await axios.get("/api/getAllGeo/"+user);
    this.setState({ userData: resp.data });

    console.log(resp.data)
  };

  sendData = async () => {
    if(this.props.coords === null){
      return
    }
    const resp = await axios.post("/api/updateGeolocation", {
      lat: this.props.coords.latitude,
      lng: this.props.coords.longitude,
      user: user
    });

    console.log(resp.data);
  };

  renderTable = () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Longtitude</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.userData.map((data,index)=>(
                  <Table.Row key={index}>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{data.userName}</Table.Cell>
                  <Table.Cell>{data.lat}</Table.Cell>
                  <Table.Cell>{data.lng}</Table.Cell>
                </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  render() {
    return <div className="container fluid">{this.renderTable()}</div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Demo);
