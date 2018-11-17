import React, { Component } from "react";
import axios from "../../lib/axios";
import { Form } from "formsy-semantic-ui-react";
import { Link } from "react-router-dom";
import { Card, Divider, Image, Segment, Responsive } from "semantic-ui-react";
import Autocomplete from "react-autocomplete";
import "../../static/autocomplete.css";
class Activity extends Component {
  state = {
    recomendPlace: [],
    activitiesData: [],
    activityName: "",
    value: ""
  };

  componentDidMount() {
    this.getActivityDetail();
  }

  TagSelected = (field, value) => {
    this.setState({ activityName: value });
  };

  getActivityDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/getAllActivity");
    resp.data.map((data, index) => {
      arr.push({
        id: index,
        label: data.activityName
      });
    });
    this.setState({ activitiesData: arr });
  };

  getPlaceFromActivity = async () => {
    const resp = await axios.get(
      "/api/getPlaceFromActivity/" + this.state.value
    );
    if (resp.status === 200) {
      this.setState({
        recomendPlace: resp.data
      });
    }
  };

  renderAutoComplete = () => {
    return (
      <Autocomplete
        className="test"
        items={this.state.activitiesData}
        shouldItemRender={(item, value) =>
          item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
        }
        getItemValue={item => item.label}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.id}
            className="itemSearch"
            style={{ background: isHighlighted ? "lightgray" : "white" }}
          >
            {item.label}
          </div>
        )}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
    );
  };

  render() {
    return (
      <div className="container fluid">
        <center>
          <Form onSubmit={this.getPlaceFromActivity}>
            <p className="searchHead">ค้นหากิจกรรม</p>
            {this.renderAutoComplete()}
          </Form>
        </center>

        <div>
          <Divider horizontal>
            {" "}
            <p className="headers">
              ไปถ่ายรูป
              {this.state.value}
              ที่ไหนดี | พบ {this.state.recomendPlace.length} การค้นหา
            </p>
          </Divider>
          <Segment.Group>
          <Responsive as={Segment} minWidth={0} maxWidth={767}>
          <center>
          {this.state.recomendPlace.map((data, index) => (
              <Card key={index} className="showhotcardMobile">
                <Link
                  to={{
                    pathname: "/placeInfo/",
                    search: data._id
                  }}
                >
                  <Image src={data.images[0]} className="showhotimage" />
                  <div class="text-block">
                    <div className="activity">
                      <h3 className="showhotname">{data.placeName}</h3>
                      <p className="description">{data.placeDes}</p>
                      <p className="extraDetail">
                        เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                        {data.comments.length}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </center>
          </Responsive>
          <Responsive as={Segment} minWidth={767}>
          <Card.Group itemsPerRow={4} centered className="showframe">
            {this.state.recomendPlace.map((data, index) => (
              <Card key={index} className="showhotcard">
                <Link
                  to={{
                    pathname: "/placeInfo/",
                    search: data._id
                  }}
                >
                  <Image src={data.images[0]} className="showhotimage" />
                  <div class="text-block">
                    <div className="activity">
                      <h3 className="showhotname">{data.placeName}</h3>
                      <p className="description">{data.placeDes}</p>
                      <p className="extraDetail">
                        เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                        {data.comments.length}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </Card.Group>
          </Responsive>
          </Segment.Group>
         
        </div>
      </div>
    );
  }
}

export default Activity;
