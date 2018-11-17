import React from "react";
import { Header, Divider } from "semantic-ui-react";
import '../../static/topic.css'
const TopicComponent = props => {
  return (
    <div className="container fluid">
    <center>
    <h1 className="topicHeader">{props.topicName}</h1>
    </center>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      <p className="meetingDate">วันที่ {props.date} เวลา {props.time}</p>
      <p className="placeMeeting">สถานที่</p>
      {props.renderPlace()}
      <Divider />
      <span className="creator">
      โดยคุณ {props.creator}
      </span>
      <br />
      {props.editTopic()}
      {props.renderComment()}
    </div>
  );
};

export default TopicComponent;
