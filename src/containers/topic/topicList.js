import React, { Component } from "react";
import Navbar from "../../components/header/header";
import TopicsListComponent from "../../components/topic/topicsListComponent";
import axios from "../../lib/axios";
class TopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicsData : []
        };
      }

      getAllTopics = async () => {
     const resp = await axios.get('/api/getalltopics')
     this.setState({topicsData:resp.data})
      }

      componentDidMount=()=>{
          this.getAllTopics()
      }

  render() {
    return (
      <div>
        <Navbar />
        <TopicsListComponent 
        topics = {this.state.topicsData}
        />
      </div>
    );
  }
}

export default TopicList;
