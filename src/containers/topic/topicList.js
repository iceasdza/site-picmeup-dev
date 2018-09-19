import React, { Component } from "react";
import Navbar from "../header/headercontrol";
import {Button} from "semantic-ui-react";
import TopicsListComponent from "../../components/topic/topicsListComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
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

      CreateTopicButton = () =>{
        let button = ""
        if(Cookies.get("user")===undefined){
          button = (
            <Button disabled>สร้างกระทู้</Button>
          )
        }else{
          button =<Button href="/createtopic">
          สร้างกระทู้
          </Button>
        }

        return button
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
        CreateTopicButton= {this.CreateTopicButton}
        />
      </div>
    );
  }
}

export default TopicList;
