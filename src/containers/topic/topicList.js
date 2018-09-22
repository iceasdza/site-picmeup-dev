import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TopicsListComponent from "../../components/topic/topicsListComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsData: []
    };
  }

  componentDidMount = () => {
    this.getAllTopics();
  };

  getAllTopics = async () => {
    const resp = await axios.get("/api/getalltopics");
    this.setState({ topicsData: resp.data });
  };

  renderTopicList = () => {
    const data = this.state.topicsData;
    return data.map((data, index) => (
      <Card fluid key={index}>
        <Link
          to={{
            pathname: "/topic/",
            search: data._id
          }}
        >
          <Card.Content header={data.topicName} />
        </Link>
        <Card.Content description={data.creator + " : " + data.create_date} />
      </Card>
    ));
  };

  CreateTopicButton = () => {
    let button = "";
    if (Cookies.get("user") === undefined) {
      button = <Button disabled>สร้างกระทู้</Button>;
    } else {
      button = <Button href="/createtopic">สร้างกระทู้</Button>;
    }

    return button;
  };

  render() {
    return (
      <div>
        <TopicsListComponent
          topics={this.state.topicsData}
          CreateTopicButton={this.CreateTopicButton}
          renderTopicList={this.renderTopicList}
        />
      </div>
    );
  }
}

export default TopicList;
