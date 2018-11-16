import React from "react";
import { Header, Divider } from "semantic-ui-react";
const TopicComponent = props => {
  return (
    <div className="container fluid">
      <Header as="h1">{props.topicName}</Header>
      โดยคุณ {props.creator}
      <br />
      {props.editTopic()}
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      <p>สถานที่</p>
      {props.renderPlace()}
      <p>วัน{props.date}</p>
  <p>เวลา{props.time}</p>      
      {props.renderComment()}
    </div>
  );
};

export default TopicComponent;
