import React from "react";
import { Divider } from "semantic-ui-react";
import "../../static/topicView.css";
const TopicsListComponent = props => {
  return (
    <div>
      <Divider horizontal>กระทู้</Divider>
      {props.CreateTopicButton()}
      {props.renderTopicList()}
    </div>
  );
};

export default TopicsListComponent;
