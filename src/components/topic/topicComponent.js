import React from "react";
import { Header, Divider, Form, Comment } from "semantic-ui-react";
const TopicComponent = props => {
  return (
    <div className="container fluid">
      <Header as="h1">{props.topicName}</Header>
      โดยคุณ {props.creator}
      <br/>
      {props.editTopic()}
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      <Divider horizontal>Comments</Divider>
      <Form onSubmit={props.handleSubmitComment}>
        <Form.TextArea
          label="เขียนควาคิดเห็น"
          placeholder="แสดงความคิดเห็น"
          value={props.text}
          onChange={e => props.handleOnchage(e.target.value)}
          required
        />
        <Form.Button>ตกลง</Form.Button>
      </Form>
      <Divider />
      <Comment.Group>
        {props.comments.map((data, index) => (
              <Comment key={index}>
                <Comment.Avatar
                  as="a"
                  src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
                />
                <Comment.Content>
                  <Comment.Author>แสดงความคิดเห็นโดยคุณ {data.commentator}</Comment.Author>
                  <Comment.Text >
                    {data.comment}
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
      </Comment.Group>
    </div>
  );
};

export default TopicComponent;
