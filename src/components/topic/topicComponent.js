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
      {props.renderPlace()}
      {props.renderComment()}
    </div>
  );
};

export default TopicComponent;
