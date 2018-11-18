import React, { Component } from "react";
import { Input, Form, Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../static/Scarch.css";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import LoadingScreen from "../../containers/screen/loading";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
const user = Cookies.get("user");
let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
class Searchpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      resultPlaces: [],
      resultEvents: [],
      resultTagPlaces: [],
      resultTagEvents: [],
      resultDescriptionPlaces: [],
      resultDescriptionEvents: [],
      value: ""
    };
  }
  removeData = async (field, id, name) => {
    if (field === "event") {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการจะลบ " + name + " หรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          axios.post("/api/deleteEventDataFromId/" + id);
          swal("ลบเรียบร้อย!");
          this.getDataForSearch();
        }
      });
    }
    if (field === "place") {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการจะลบ " + name + " หรือไม่ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          axios.post("/api/deletePlaceDataFromId/" + id);
          swal("ลบเรียบร้อย!");
          this.getDataForSearch();
        }
      });
    }
  };
  componentDidMount() {
    if (this.props.location.state) {
      let _tag = this.props.location.state.passtag;
      this.setState(
        {
          value: _tag
        },
        () => {
          this.getDataForSearch();
        }
      );
    }
  }

  inputScarch = () => {
    return (
      <div>
      <Input
      className="searchForm"
        placeholder="ค้นหา สถานที่ อีเว้นท์ แท็ก"
        value={this.state.value}
        onChange={this.handleOnChange("value")}
      />
      <br/>
      <Button className="searchBtn">ค้นหา</Button>
      </div>
    );
  };
  getDataForSearch = async () => {
    if(this.state.value.length===0){
      return
    }
    this.setState({
      open: true
    });
    try{
    const respPlaces = await axios.get(
      "/api/getDataForSearchPlace/" + this.state.value
    );
    const respEvents = await axios.get(
      "/api/getDataForSearchEvent/" + this.state.value
    );
    const respTagPlaces = await axios.get(
      "/api/getTagForSearchPlace/" + this.state.value
    );
    const respTagEvents = await axios.get(
      "/api/getTagForSearchEvent/" + this.state.value
    );
    const respDescriptionPlaces = await axios.get(
      "/api/getDescriptionForSearchPlace/" + this.state.value
    );
    const respDescriptionEvents = await axios.get(
      "/api/getDescriptionForSearchEvent/" + this.state.value
    );
    this.setState({ isLoading: true });
    if (respPlaces.status === 200 && respDescriptionPlaces.status === 200) {
      this.setState({
        resultPlaces: [...respPlaces.data, ...respDescriptionPlaces.data]
      });
    }
    if (respEvents.status === 200 && respDescriptionEvents.status === 200) {
      this.setState({
        resultEvents: [...respEvents.data, ...respDescriptionEvents.data]
      });
    }
    if (respTagPlaces.status === 200) {
      this.setState({
        resultTagPlaces: respTagPlaces.data
      });
    }
    if (respTagEvents.status === 200) {
      this.setState({
        resultTagEvents: respTagEvents.data,
        open: false,
        value: ""
      });
    } 
  }catch(err){
    swal({
      title: "อุ๊ปซ์ เหมือนเราไม่มีสิ่งที่คุณค้นหานะ ?",
      text: "ลองหาอย่างอื่นนอกจาก " + this.state.value + " ดูดีไหม ?",
      type: "question",
      confirmButtonColor: "#333",
      confirmButtonText:"ฉันเข้าใจเเล้ว"
    })
      this.setState({
        open: false,
        value: ""
      });
    }
  };

  handleOnChange = key => e => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    return (
      <div className="searchPageWarp">
        <LoadingScreen open={this.state.open} />
        <center>
        <Form className="inputScarch" onSubmit={this.getDataForSearch}>
          {this.inputScarch()}
        </Form>
        </center>
        <div className="slickWraper">
          {this.state.resultPlaces.length === 0 ? (
            <span />
          ) : (
            <p className="inputScarch">สถานที่</p>
          )}
          <Slider {...settings}>
            {this.state.resultPlaces.map((data, index) => (
              <Card key={index} className="showhotcard">
                <Image src={data.images[0]} className="showhotimage" />
                <Link
                  to={{
                    pathname: "/placeInfo/",
                    search: data._id
                  }}
                >
                  <div class="text-block">
                    {user === "admin" ? (
                      <div>
                        {" "}
                        <Link
                          to={{
                            pathname: "/updatePlace",
                            state: { id: data._id }
                          }}
                        >
                          <Button
                            primary
                            content="แก้ไข"
                            icon="edit"
                            className="homeBtn"
                            size="mini"
                          />
                        </Link>
                        <Button
                          icon="trash"
                          size="mini"
                          className="homeBtn"
                          color="red"
                          content="ลบ"
                          value={index}
                          onClick={e =>
                            this.removeData("place", data._id, data.placeName)
                          }
                        />
                      </div>
                    ) : (
                      <span />
                    )}
                    <h3 className="showhotname">{data.placeName}</h3>
                    <p className="description">{data.placeDes}</p>
                    <p className="extraDetail">
                      เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                      {data.comments.length}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </Slider>
        </div>

        <div className="slickWraper">
          {this.state.resultEvents.length === 0 ? (
            <span />
          ) : (
            <p className="inputScarch">อีเว้นท์</p>
          )}
          <Slider {...settings}>
            {this.state.resultEvents.map((data, index) => (
              <Card key={index} className="showhotcard">
                <Image src={data.images[0]} className="showhotimage" />
                <Link
                  to={{
                    pathname: "/eventInfo/",
                    search: data._id
                  }}
                >
                  <div class="text-block">
                    {user === "admin" ? (
                      <div>
                        {" "}
                        <Link
                          to={{
                            pathname: "/updateEvent",
                            state: { id: data._id }
                          }}
                        >
                          <Button
                            primary
                            content="แก้ไข"
                            icon="edit"
                            className="homeBtn"
                            size="mini"
                          />
                        </Link>
                        <Button
                          color="red"
                          content="ลบ"
                          icon="trash"
                          size="mini"
                          className="homeBtn"
                          value={index}
                          onClick={e =>
                            this.removeData("event", data._id, data.eventName)
                          }
                        />
                      </div>
                    ) : (
                      <span />
                    )}
                    <h3 className="showhotname">{data.eventName}</h3>
                    <p className="description">{data.eventDes}</p>
                    <p className="extraDetail">
                      เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                      {data.comments.length}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </Slider>
        </div>

        <div className="slickWraper">
          {this.state.resultTagPlaces.length === 0 ? (
            <span />
          ) : (
            <p className="inputScarch">แท็กสถานที่</p>
          )}
          <Slider {...settings}>
            {this.state.resultTagPlaces.map((data, index) => (
              <Card key={index} className="showhotcard">
                <Image src={data.images[0]} className="showhotimage" />
                <Link
                  to={{
                    pathname: "/placeInfo/",
                    search: data._id
                  }}
                >
                  <div class="text-block">
                    {user === "admin" ? (
                      <div>
                        {" "}
                        <Link
                          to={{
                            pathname: "/updatePlace",
                            state: { id: data._id }
                          }}
                        >
                          <Button
                            primary
                            content="แก้ไข"
                            icon="edit"
                            className="homeBtn"
                            size="mini"
                          />
                        </Link>
                        <Button
                          icon="trash"
                          size="mini"
                          className="homeBtn"
                          color="red"
                          content="ลบ"
                          value={index}
                          onClick={e =>
                            this.removeData("place", data._id, data.placeName)
                          }
                        />
                      </div>
                    ) : (
                      <span />
                    )}
                    <h3 className="showhotname">{data.placeName}</h3>
                    <p className="description">{data.placeDes}</p>
                    <p className="extraDetail">
                      เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                      {data.comments.length}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </Slider>
        </div>
        <div className="slickWraper">
          {/* <p className="inputScarch">แท็กอีเว้นท์</p> */}
          {this.state.resultTagEvents.length === 0 ? (
            <span />
          ) : (
            <p className="inputScarch">แท็กอีเว้นท์</p>
          )}
          <Slider {...settings}>
            {this.state.resultTagEvents.map((data, index) => (
              <Card key={index} className="showhotcard">
                <Image src={data.images[0]} className="showhotimage" />
                <Link
                  to={{
                    pathname: "/eventInfo/",
                    search: data._id
                  }}
                >
                  <div class="text-block">
                    {user === "admin" ? (
                      <div>
                        {" "}
                        <Link
                          to={{
                            pathname: "/updateEvent",
                            state: { id: data._id }
                          }}
                        >
                          <Button
                            primary
                            content="แก้ไข"
                            icon="edit"
                            className="homeBtn"
                            size="mini"
                          />
                        </Link>
                        <Button
                          color="red"
                          content="ลบ"
                          icon="trash"
                          size="mini"
                          className="homeBtn"
                          value={index}
                          onClick={e =>
                            this.removeData("event", data._id, data.eventName)
                          }
                        />
                      </div>
                    ) : (
                      <span />
                    )}
                    <h3 className="showhotname">{data.eventName}</h3>
                    <p className="description">{data.eventDes}</p>
                    <p className="extraDetail">
                      เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                      {data.comments.length}
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
export default Searchpage;
