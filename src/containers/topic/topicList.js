import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TopicsListComponent from "../../components/topic/topicsListComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import LoadingScreen from '../screen/loading'
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsData: [],
      open:true
    };
  }

  componentDidMount = () => {
    this.getAllTopics();
  };

  getAllTopics = async () => {
    const resp = await axios.get("/api/getalltopics");
    if(resp.status === 200 ){
      this.setState({ topicsData: resp.data,open:false });
    }
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
        <LoadingScreen
        open={this.state.open}
        />
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
