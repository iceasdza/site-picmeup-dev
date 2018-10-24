import React from "react";
import { geolocated } from "react-geolocated";
import axios from "../../../lib/axios";
import Cookies from "js-cookie";
import { Table,Button } from "semantic-ui-react";
let user = Cookies.get("user");
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGeoLocation: {},
      userData: [],
      userDistanceInfo:[]
    };
  }

  componentDidMount(){
    this.getData();
  }
  // componentWillReceiveProps(){
  //   this.sendData();
  // }

  getData = async () => {
    const resp = await axios.get("/api/getAllGeo/" + user);
    this.setState({ userData: resp.data });
  };

  sendData = async () => {
    if (this.props.coords === null) {
      return;
    }
    const resp = await axios.put("/api/updateGeolocation", {
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
      user: user
    });

    this.setState({
      userGeoLocation: { latitude: resp.data.latitude, longitude: resp.data.longitude }
    });
  };

  getDistanceFromLatLonInKm=(lat1,lon1,lat2,lon2)=> {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d
  }
  
  deg2rad=(deg)=>{
    return deg * (Math.PI/180)
  }

  storeUserNearBy = () =>{
    const currentUserLat = this.state.userGeoLocation.latitude
    const currentUserLng = this.state.userGeoLocation.longitude

    const arr = []
    this.state.userData.map((data)=>{
      const resp = this.getDistanceFromLatLonInKm(currentUserLat,currentUserLng,data.latitude,data.longitude)
      arr.push({distance:resp,userName:data.userName})
    })
    this.setState({
      userDistanceInfo:arr
    })

  }

  renderTable = () => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Distance</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.userDistanceInfo.map((data, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index}</Table.Cell>
              <Table.Cell>{data.userName}</Table.Cell>
              <Table.Cell>{data.distance}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  render() 
  {
    return <div className="container fluid">
    <Button onClick={this.storeUserNearBy}>
      คำนวนสิ
    </Button>
    <Button onClick={this.sendData}>
      ระบุพิกัด
    </Button>
  
    {this.renderTable()}
    </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Demo);
