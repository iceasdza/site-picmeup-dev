import React, { Component } from "react";
import {
  Dropdown,
  Menu,
  Button,
  Input,
  Image,
  Responsive,
  Icon,
  List,
  Divider,
  Form,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/Header.css";
import logo from "../../static/logo-white-test1.png";
import ReactAutocomplete from "react-autocomplete";
import axios from "../../lib/axios";
import { Redirect } from "react-router-dom";

class Header_picmeup extends Component {
  state = {
    sidebar: "hidden",
    visible: true,
    value: "",
    placesData: [],
    eventData: [],
    redirect: false,
    id: null,
    searchOptions: "place",
    searchData : []
  };

  handleSideBar = () => {
    this.setState({ visible: !this.state.visible });
    if (this.state.visible === true) {
      this.setState({ sidebar: "show" });
    } else if (this.state.visible === false) {
      this.setState({ sidebar: "hidden" });
    }
  };

  getPlaceDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/getPlaceInfo");
    for (let x = 0; x < resp.data.length; x++) {
      arr.push({ id: resp.data[x]._id, label: resp.data[x].placeName });
    }
    this.setState({ placesData: arr,searchData:arr });
  };

  getEventDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/GetEventInfo");
    for (let x = 0; x < resp.data.length; x++) {
      arr.push({ id: resp.data[x]._id, label: resp.data[x].eventName });
    }
    this.setState({ eventData: arr });
  };

  componentDidMount = () => {
    this.getPlaceDetail();
    this.getEventDetail();
  };

  search = async e => {
    e.preventDefault();
    const searchOptions = this.state.searchOptions;
    if (searchOptions === "place") {
      this.setState({ redirect: true });
      const value = this.state.value;
      const resp = await axios.get("/api/getPlaceInfoFromName/" + value);
      this.setState({ id: resp.data });
    }
    if (searchOptions === "event") {
      this.setState({ redirect: true });
      const value = this.state.value;
      const resp = await axios.get("/api/getEventInfoFromName/" + value);
      this.setState({ id: resp.data });
    }
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleChange = (e, { value }) => {
    this.setState({ searchOptions: value });
    const placesData = this.state.placesData
    const eventData  =this.state.eventData
    if(value==='place'){
        this.setState({searchData:placesData})
    }else{
      this.setState({searchData:eventData})
    }
  };

  render() {
    const { redirect, id,searchOptions } = this.state;
    if (redirect && id !== null) {
      if(searchOptions === 'place'){
        return <Redirect to={{ pathname: "/placeInfo/", search: id }} />;
      }else{
        return <Redirect to={{ pathname: "/eventInfo/", search: id }} />;
      }
      
    }
    return (
      <div>
        <div className="Header-background">
        {console.log(this.state.eventData)}
          <Responsive {...Responsive.onlyComputer}>
            <Menu secondary inverted>
              <Menu.Menu>
                <Link to={{ pathname: "/" }}>
                  <Image className="Img" src={logo} height="50" width="150" />
                </Link>
              </Menu.Menu>
              <Menu.Item link name="สถานที่ที่น่าสนใจ" />
              <Menu.Item link name="อีเว้นท์ที่กำลังมาแรง" />
              <Menu.Item link name="สนทนา" />
              <Dropdown item text="จัดการ">
                <Dropdown.Menu>
                  <Dropdown.Item>สร้างสถานที่</Dropdown.Item>
                  <Dropdown.Item>สร้างอีเว้นท์</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Menu position="right">
                <Menu.Item>
                <Label>กิจกรรม</Label>
                  <Form.Radio
                    className="searchOption"
                    value="event"
                    checked={this.state.searchOptions === "event"}
                    onChange={this.handleChange}
                  />
                  <Label>สถานที่</Label>
                  <Form.Radio
                  className="searchOption"
                    value="place"
                    checked={this.state.searchOptions === "place"}
                    onChange={this.handleChange}
                  />
                </Menu.Item>
                <Menu.Item>
                  <form onSubmit={this.search}>
                    <ReactAutocomplete
                      items={this.state.searchData}
                      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.label}
                      renderItem={item => (
                        <div key={item.id} className="itemSearch">
                          {item.label}
                        </div>
                      )}
                      value={this.state.value}
                      onChange={e => this.setState({ value: e.target.value })}
                      onSelect={value => this.setState({ value })}
                    />
                  </form>
                </Menu.Item>
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
            </Menu>
          </Responsive>
        </div>

        <Responsive {...Responsive.onlyMobile}>
          <Menu secondary inverted>
            <Menu.Item position="left">
              <Icon name="sidebar" size="large" onClick={this.handleSideBar} />
            </Menu.Item>
            <Menu.Item position="right">
              <Input size="mini" icon="search" placeholder="ค้นหา..." />
            </Menu.Item>
          </Menu>
          <List relaxed className={this.state.sidebar + " sideBar"}>
            <List.Item>
              <Link to={{ pathname: "/" }}>หน้าแรก</Link>
            </List.Item>
            <List.Item>สถานที่น่าสนใจ</List.Item>
            <List.Item>อีเว้นท์ที่กำลังมาแรง</List.Item>
            <List.Item>สนทนา</List.Item>
            <Divider inverted />
            <List.Item>
              <Link to={{ pathname: "/login" }}>ลงชื่อเข้าใช้</Link>
            </List.Item>
            <List.Item>
              <Link to={{ pathname: "/register" }}>สมัครสมาชิก</Link>
            </List.Item>
          </List>
        </Responsive>
      </div>
    );
  }
}
export default Header_picmeup;
