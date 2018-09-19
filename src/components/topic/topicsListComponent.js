import React from "react";
import { Divider, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/topic.css";
const TopicsListComponent = props => {
  return (
    <div className="container fluid">
      <Divider horizontal>กระทู้</Divider>
      {props.CreateTopicButton()}
      {/* <Button href="/createtopic">
      สร้างกระทู้
      </Button> */}
      {props.topics.map((data, index) => (
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
      ))}
    </div>
  );
};

export default TopicsListComponent;
