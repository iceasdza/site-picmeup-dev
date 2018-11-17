import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import { Pagination } from "semantic-ui-react";
import LoadingScreen from "../screen/loading";
import "../../static/topic.css";
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsData: [],
      open: true,
      page: [],
      activePage: 1
    };
  }

  componentDidMount = () => {
    this.getAllTopics();
    this.renderTopic();
  };

  getAllTopics = async () => {
    const resp = await axios.get("/api/getalltopics");
    if (resp.status === 200) {
      const data = this.split(resp.data, 10);
      this.setState({ topicsData: resp.data, open: false, page: data });
    }
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

  renderTopic = () => {
    const page = this.state.page;
    const activePage = this.state.activePage;
    const data = page[activePage - 1];
    if (data) {
      return data.map((data, index) => (
        <Card fluid key={index}>
        {console.log(data)}
          <Card.Content className="contentTopicInfo">
            <Link
              to={{
                pathname: "/topic/",
                search: data._id
              }}
            >
              <Card.Header>{data.topicName}</Card.Header>
            </Link>
            <Card.Meta>
              <Link
                to={{
                  pathname: "/user/",
                  search: data.creator
                }}
              >
                <span className="date">{"โดยคุณ " + data.creator}</span>
              </Link>
            </Card.Meta>
            <Card.Description>
             สถานที่  : {data.topicPlace} วันที่ : {data.date.substring(0, 10)}
            </Card.Description>
          </Card.Content>
        </Card>
      ));
    }
  };

  CreateTopicButton = () => {
    if (Cookies.get("user") === undefined) {
    } else {
      return (
        <Link
          to={{
            pathname: "/createTopic"
          }}
        >
        <Button
        className="createTopicBtn"
        >สร้างมีตติ้ง
        </Button>
        </Link>
      );
    }
  };

  render() {
    return (
      <div className="container fluid">
        <LoadingScreen open={this.state.open} />
        <div>
        <span className="createTopicHeader">
        มีตติ้ง
        </span>
        {this.CreateTopicButton()}
        </div>
        <div className="topicList">{this.renderTopic()}</div>
        <center>
          <Pagination
            className="pagination"
            defaultActivePage={1}
            totalPages={this.state.page.length}
            onPageChange={this.handlePaginationChange}
          />
        </center>
      </div>
    );
  }
}

export default TopicList;
