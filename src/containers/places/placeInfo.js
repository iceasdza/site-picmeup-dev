import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import PlaceDetail from "../../components/places/placeInfo";
import { Divider, Form, Comment,Button } from "semantic-ui-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import "../../static/map.css";
import axios from "../../lib/axios";
import LoadingScreen from '../screen/loading'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import '../../static/image.css'
import { Redirect } from "react-router-dom";

class PlaceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: "",
      placeDes: "",
      contact: "",
      openTime: "",
      closeTime: "",
      fee: "no",
      feePrice:0,
      carParking: "yes",
      carParkSize:0,
      carParkPrice:0,
      days: [],
      tags: [],
      map: {
        latitude: 0,
        longtitude: 0
      },
      images: [],
      id: "",
      index: null,
      comments: [],
      text: "",
      lat:'',
      lng:'',
      open:true,
      isRedirect:false
    };
  }

  modalImage = (src) =>{
    return(
      swal({
        imageUrl: src,
        width:'100%',
        imageWidth:100,
      })
    )
  }


  getData = async () => {   
    try{ 
    let _id = this.props.location.search.slice(1);
    const resp = await axios.get("/api/getPlaceInfoFromId/" + _id);
    if(resp.status ===200){
      const data = resp.data[0];
      this.setState({
        placeName: data.placeName,
        placeDes: data.placeDes,
        contact: data.contact,
        openTime: data.openTime,
        closeTime: data.closeTime,
        fee: data.fee,
        feePrice:data.feePrice,
        carParking: data.carParking,
        carParkSize: data.carParkSize,
        carParkPrice: data.carParkPrice,
        days: data.days,
        tags: data.tags,
        images: data.images,
        comments: data.comments,
        lat:data.lat,
        lng:data.lng,
        open:false
      });
    }
  }catch(err){
    this.setState({isRedirect:true})
  }
  };

  renderMap =()=>{
    return(
      <Map
      className="mapView"
      //   style={style}
        google={this.props.google}
        zoom={18}
        onClick={this.onMapClicked}
        center={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
      >
        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
      </Map>
    )
  }


  componentDidMount = () => {
    this.getData();
  };

  onOpenModal = value => {
    this.setState({ open: true, index: value });
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
      comments.push({ comment: this.state.text, commentator: "Guest",avatar:'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg' });
    } else {
      comments.push({
        comment: this.state.text,
        commentator: Cookies.get("user"),
        avatar:Cookies.get("userAvatar")
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
        <LoadingScreen
        open={this.state.open}
        />
      <Divider horizontal>ความคิดเห็น</Divider>
      <Form onSubmit={this.handleSubmitComment}>
        <Form.TextArea
          label="เขียนควาคิดเห็น"
          placeholder="แสดงความคิดเห็น"
          value={this.state.text}
          onChange={e => this.handleOnchage(e.target.value)}
          required
        />
         <Button className="commentBtn">ตกลง</Button>
      </Form>
      <Divider />
      <Comment.Group>
        {this.state.comments.map((data, index) => (
          <Comment key={index}>
            <Comment.Avatar
              as="avatar"
              src={data.avatar}
            />
            <Comment.Content>
            {data.commentator !== 'Guest' ? (
                <Comment.Author>
                แสดงความคิดเห็นโดยคุณ {" "}
                <Link
                  to={{
                    pathname: "/user/",
                    search: data.commentator
                  }}
                >
                  <span className="creator">{data.commentator}</span>
                </Link>
              </Comment.Author>
              ):(
                <Comment.Author>
                แสดงความคิดเห็นโดยคุณ {" "}
                  <span className="creator">{data.commentator}</span>
              </Comment.Author>
              )}
              <Comment.Text>{data.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      </div>
    )
}

  setDayOpen=()=>{
    let setDay=''
    switch(this.state.days.length) {
      case 7:
          return setDay ='ทุกวัน'
          // break;
          case 1:
          return setDay = this.state.days[0]
          // break;
          default:
          let dayOne = this.state.days[0]
          let last = this.state.days.length
          let lastDay = this.state.days[last-1]
        return setDay = dayOne +' - '+lastDay
  }
  }
  render = () => {
    if(this.state.isRedirect){
      this.setState({open:false})
      return <Redirect to={{ pathname: "/*" }} />;
    }
    return (
      <div>
        <LoadingScreen
        open={this.state.open}
        />
        <PlaceDetail
          placeName={this.state.placeName}
          placeDes={this.state.placeDes}
          modalImage = {this.modalImage}
          contact={this.state.contact}
          openTime={this.state.openTime}
          closeTime={this.state.closeTime}
          fee={this.state.fee}
          feePrice={this.state.feePrice}
          carParking={this.state.carParking}
          parkingPrice={this.state.carParkPrice}
          parkingSize={this.state.carParkSize}
          days={this.setDayOpen()}
          tags={this.state.tags}
          images={this.state.images}
          index={this.state.index}
          onCloseModal={this.onCloseModal}
          onOpenModal={this.onOpenModal}
          open={this.state.open}
          renderComment={this.renderComment}
          renderMap = {this.renderMap}
        />
      </div>
    );}
}


// export default PlaceInfo;
export default GoogleApiWrapper({
  apiKey: "AIzaSyAxyyre9woDQlaPEGTb-Hmqprwjyd2rD88"
})(PlaceInfo);