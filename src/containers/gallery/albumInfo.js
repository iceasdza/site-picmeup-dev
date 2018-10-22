import React, { Component } from "react";
import AlbumInfoComponent from "../../components/gallery/albumInfoComponent";
import { Card ,Comment,Form,Divider} from "semantic-ui-react";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
export default class AlbumInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumOwner:'',
      albumName:'',
      albumDes:'',
      comments:[],
      createDate:'',
      images:[],
      text:''
    };
  }

  handleOnchage = e => {
    this.setState({ text: e });
  };

  getData = async () => {
    let _id = this.props.location.search.slice(1);
    const resp = await axios.get("/api/getAlbumFromId/" + _id);
    this.setState({ 
      albumOwner: resp.data[0].albumOwner,
      albumName:resp.data[0].albumName,
      albumDes:resp.data[0].albumDes,
      comments:resp.data[0].comments,
      createDate:resp.data[0].createDate,
      images:resp.data[0].images
    });
  };

  componentDidMount() {
    this.getData();
  }

  handleSubmitComment = async () => {
    const id = this.props.location.search.replace("?", "");
    const comments = this.state.comments;
    if (Cookies.get("user") === undefined) {
      comments.push({ comment: this.state.text, commentator: "Guest" });
    } else {
      comments.push({
        comment: this.state.text,
        commentator: Cookies.get("user")
      });
    }
    this.setState({ comments: comments, text: "" });
    await axios.put("/api/addAlbumComment/" + id, {
      comments: this.state.comments
    });
    this.getData();
  };

  renderImages = () =>{
    return(
      <Card.Group itemsPerRow={6}>
      {this.state.images.map((data,index)=>(
        <Card raised image={data} key={index}/>
      ))}
    </Card.Group>
    )
  }

  renderComment = () => {
    return (
      <div className="container fluid">
        <Divider horizontal>Comments</Divider>
        <Form onSubmit={this.handleSubmitComment}>
          <Form.TextArea
            label="เขียนควาคิดเห็น"
            placeholder="แสดงความคิดเห็น"
            value={this.state.text}
            onChange={e => this.handleOnchage(e.target.value)}
            required
          />
          <Form.Button>ตกลง</Form.Button>
        </Form>
        <Divider />
        <Comment.Group>
          {this.state.comments.map((data, index) => (
            <Comment key={index}>
              <Comment.Avatar
                as="a"
                src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
              />
              <Comment.Content>
                <Comment.Author>
                  แสดงความคิดเห็นโดยคุณ {data.commentator}
                </Comment.Author>
                <Comment.Text>{data.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    );
  };

  render() {
    return (
      <div className="container fluid">
      <AlbumInfoComponent
      renderImages={this.renderImages}
      renderComment={this.renderComment}
      />
      </div>
    );
  }
}
