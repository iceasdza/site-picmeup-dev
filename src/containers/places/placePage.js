import React, { Component } from "react";
import axios from "../../lib/axios";
import LoadingScreen from "../screen/loading";
import {
  Card,
  Image,
  Pagination,
  Segment,
  Responsive
} from "semantic-ui-react";
import "../../static/image.css";
import { Link } from "react-router-dom";
class PlacePage extends Component {
  state = {
    placesData: [],
    open: true,
    activePage: 1
  };

  getData = async () => {
    const places = await axios.get("/api/getPlaceInfo");
    if (places.status === 200) {
      const data = this.split(places.data, 9);
      console.log(data);
      this.setState({
        placesData: data,
        open: false
      });
    }
  };

  componentDidMount = () => {
    this.getData();
  };

  split = (arr, chunk) => {
    const data = [];
    for (let i = 0; i < arr.length; i += chunk) {
      data.push(arr.slice(i, i + chunk));
    }
    return data;
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  renderPlaces = () => {
    const page = this.state.placesData;
    const activePage = this.state.activePage;
    const data = page[activePage - 1];
    if (data) {
      return (
        <div className="getAllPage">
          <Segment.Group>
            {/* mobile */}
            <Responsive as={Segment} minWidth={0} maxWidth={767}>
              <p className="header"> สถานที่ </p>
              <center>
                {data.map((data, index) => (
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
              <p className="header"> สถานที่ </p>
              <Card.Group itemsPerRow={3} centered className="showhotframe">
                {data.map((data, index) => (
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
      );
    }
  };
  render() {
    return (
      <div>
        <LoadingScreen open={this.state.open} />
        {this.renderPlaces()}
        <center>
          <br />
          <Pagination
            className="pagination"
            defaultActivePage={1}
            totalPages={this.state.placesData.length}
            onPageChange={this.handlePaginationChange}
          />
          <br />
        </center>
      </div>
    );
  }
}

export default PlacePage;
