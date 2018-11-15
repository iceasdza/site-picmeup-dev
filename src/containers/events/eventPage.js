import React, { Component } from "react";
import axios from "../../lib/axios";
import LoadingScreen from "../screen/loading";
import { Card, Image, Pagination } from "semantic-ui-react";
import { Link } from "react-router-dom";
class EventPage extends Component {
  state = {
    eventData: [],
    open: true,
    activePage: 1
  };

  getData = async () => {
    const events = await axios.get("/api/GetEventInfo");
    if (events.status === 200) {
      const data = this.split(events.data, 9);
      this.setState({
        eventData: data,
        open: false
      });
    }
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  };

  split = (arr, chunk) => {
    const data = [];
    for (let i = 0; i < arr.length; i += chunk) {
      data.push(arr.slice(i, i + chunk));
    }
    return data;
  };

  componentDidMount = () => {
    this.getData();
  };

  renderEvent = () => {
    const page = this.state.eventData
    const activePage = this.state.activePage
    const data = page[activePage-1]
    if(data){
      return (
        <div className="getAllPage">
        <Card.Group itemsPerRow={3} centered className="showhotframe">
          {data.map(
            (data, index) =>
            <Card key={index} className="showhotcard">
            <Link
              to={{
                pathname: "/eventInfo/",
                search: data._id
              }}
            >
              <Image src={data.images[0]} className="showhotimage" />
              <div class="text-block">
              <div className="activity">
              <h3 className="showhotname">{data.eventName}</h3>
                <p className="description">{data.eventDes}</p>
                <p className="extraDetail">
                  เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                  {data.comments.length}
                </p></div>
              </div>
            </Link>
          </Card>
          )}
        </Card.Group>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <LoadingScreen open={this.state.open} />
        {this.renderEvent()}
        <center>
          <br/>
        <Pagination
          className="pagination"
          defaultActivePage={1}
          totalPages={this.state.eventData.length}
          onPageChange={this.handlePaginationChange}
        />
        <br/>
        </center>
      </div>
    );
  }
}

export default EventPage;
