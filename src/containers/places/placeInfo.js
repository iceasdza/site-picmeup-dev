import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PlaceDetail from '../../components/places/placeInfo'
import { Divider, Form, Comment } from "semantic-ui-react";
import Cookies from "js-cookie";
import axios from '../../lib/axios';

class PlaceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeName: "",
            placeDes: "",
            tel: "",
            openTime: "",
            closeTime: "",
            fee: "no",
            carParking: "yes",
            days: [],
            tags: [],
            map: {
                latitude: 0,
                longtitude: 0
            },
            images: [],
            id:"",
            open: false,
            index:null,
            comments: [],
            text:'',
            
        };
      }

    getData  = async () => {
        
        let _id = this.props.location.search.slice(1)
        const resp = await axios.get("/api/getPlaceInfoFromId/"+_id)
        const data = resp.data[0]
        this.setState({
            placeName: data.placeName,
            placeDes: data.placeDes,
            tel: data.tel,
            openTime: data.openTime,
            closeTime: data.closeTime,
            fee: data.fee,
            carParking: data.carParking,
            days: data.days,
            tags: data.tags,
            images: data.images,
            comments: data.comments,
        })
    }

    componentDidMount =  () => {
            this.getData()
    }

    onOpenModal = (value) => {
        this.setState({ open: true ,index:value})
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

      handleOnchage = e => {
        this.setState({ text: e });
      };
    
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
        await axios.put("/api/addPlaceComment/" + id, {
          comments: this.state.comments
        });
        this.getData();
      };
    
      renderComment = () =>{
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
          )
      }


    render = () => {
        return (
            <div>
                <PlaceDetail
                placeName={this.state.placeName}
                placeDes={this.state.placeDes}
                tel={this.state.tel}
                openTime={this.state.openTime}
                closeTime={this.state.closeTime}
                fee={this.state.fee}
                carParking={this.state.carParking}
                days={this.state.days}
                tags={this.state.tags}
                images={this.state.images}
                index = {this.state.index}

                onCloseModal={this.onCloseModal}
                onOpenModal={this.onOpenModal}
                open = {this.state.open}
                renderComment={this.renderComment}
                />

            </div>
        )
    }
}

export default PlaceInfo