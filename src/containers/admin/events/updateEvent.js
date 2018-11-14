import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "formsy-semantic-ui-react";
import EventEditForm from "../../../components/admin/events/eventEditForm";
import axios from "../../../lib/axios";
import { Redirect } from "react-router-dom";
import {  Dimmer, Loader } from "semantic-ui-react";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
class UpdateEvent extends Component {
  state = {
    eventName: "",
    eventDes: "",
    content: "",
    openTime: "",
    closeTime: "",
    fee: "no",
    feePrice:null,
    days: [],
    tags: [],
    map: {
      latitude: 0,
      longtitude: 0
    },
    FileList: [],
    placesData: [],
    PlaceId: "",
    message: "",
    images: [],
    id: "",
    files: [],
    redirect: false,
    open: false,
    imageState:true,
    tagsData:[]
  };
  setField = (field, value) => {
    this.setState({ [field]: value });
  };
  handleImageLoaded = () => {
    this.setState({imageState:false})
  };
  getData = async () => {
    let _id = this.props.location.state.id;
    const resp = await axios.get("/api/getEventInfoFromId/" + _id);

    const data = resp.data[0];
    this.setState({
      eventName: data.eventName,
      eventDes: data.eventDes,
      content: data.content,
      openTime: data.openTime,
      closeTime: data.closeTime,
      fee: data.fee,
      feePrice: data.feePrice,
      days: data.days,
      tags: data.tags,
      FileList: data.FileList,
      id: _id,
      PlaceId: data.PlaceId,
      images: data.images
    });
  };

  DeleteImage = async index => {
    const images = this.state.images;
    images.splice(index, 1);
    this.setState({ images: images });
  };
  DeletePhotoUploaded = index => {
    let arr = [];
    arr = this.state.files;
    arr.splice(index, 1);
    this.setState({ files: arr });
  };
  handleSelectImage = async() => {
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
    const temp = this.state.images;
      const dataFile = document.getElementById("img").files[0];
      const arr = []
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleEvent", data);
      arr.push(resp.data)
      temp.push(resp.data);
      this.setState({ 
        // files: arr,
        images: temp });
    } else {
      // this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultiplePlaces", data);
      const temp = this.state.images;
      data = [];
      for (let x = 0; x < resp.data.length; x++) {
        data.push(resp.data[x].location);
        temp.push(resp.data[x].location);
      }
      this.setState({ 
        // files: data,
        images: temp });
    }
  };

  getPlaceDetail = async () => {
    const resp = await axios.get("/api/getPlaceInfo");
    this.setState({ placesData: resp.data });
  };

  FeeOption = (field, value) => {
    this.setState({ [field]: value });
  };

  CarParkingOption = (field, value) => {
    this.setState({ [field]: value });
  };

  TagSelected = (field, value) => {
    this.setState({ [field]: value });
  };

  PlaceSelected = (field, value) => {
    this.setState({ [field]: value });
  };

  DaysSelected = (field, value) => {
    this.setState({ [field]: value });
  };

  getTagDetail = async () =>{
    const arr = []
    const resp = await axios.get("/api/getAllTags");
    resp.data.map((data,index)=>(
      arr.push({ key: index+1, text: data.tagName, value: data.tagName })
    ))
    this.setState({tagsData:arr})

  }

  componentDidMount = async () => {
    this.getData();
    this.getPlaceDetail();
    this.getTagDetail();
  };

  UpdateEvent = async formData => {
    if (
      formData.place_name === "" ||
      formData.place_desc === "" ||
      formData.place_content === "" ||
      formData.place_open === "" ||
      formData.place_close === "" ||
      formData.day_tag === undefined ||
      formData.place_tag === undefined ||
      formData.place_select === undefined
    ) {
      return;
    }

    const lengthOfFile = document.getElementById("img").files.length;
    //--------no image updated-----------//
    if (lengthOfFile === 0) {
      this.setState({ open: true });
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการแก้ไขอีเว้นท์" + this.state.eventName + "ระบบหรือไม่ ?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
        axios.put("/api/UpdateEventFromId/" + this.state.id, {
        eventName: this.state.eventName,
        eventDes: this.state.eventDes,
        content: this.state.content,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        fee: this.state.fee,
        feePrice: this.state.feePrice,
        tags: this.state.tags,
        days: this.state.days,
        images: this.state.images,
        PlaceId: this.state.PlaceId
      }).then(value=>{
            if(value.status===200){
              this.setState({ redirect: true });
            }
          })
        }
      })
    }
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการแก้ไขอีเว้นท์" + this.state.eventName + "ระบบหรือไม่ ?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
      axios.put("/api/UpdateEventFromId/" + this.state.id, {
      eventName: this.state.eventName,
      eventDes: this.state.eventDes,
      content: this.state.content,
      openTime: this.state.openTime,
      closeTime: this.state.closeTime,
      fee: this.state.fee,
      feePrice: this.state.feePrice,
      tags: this.state.tags,
      days: this.state.days,
      FileList: this.state.FileList,
      PlaceId: this.state.PlaceId,
      FileName: this.state.FileName,
      images: this.state.images
    }).then(value=>{
          if(value.status===200){
            this.setState({ redirect: true });
          }
        })
      }
    })
  };

  render() {
    const { redirect,open } = this.state
    if(redirect){
    return  (
      <Redirect
      to={{ pathname: "/main" }}
    />
    )
    }
    return (
      <div>
        <Form onSubmit={this.UpdateEvent}>
        <Dimmer active={open} page>
          <Loader size='massive'><p>รอแปปนึงกำลังอัพโหลดรูป</p></Loader>
          </Dimmer>
          <EventEditForm
            eventName={this.state.eventName}
            eventDes={this.state.eventDes}
            content={this.state.content}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            feePrice={this.state.feePrice}
            days={this.state.days}
            tags={this.state.tags}
            PlaceId={this.state.PlaceId}
            images={this.state.images}
            placesData={this.state.placesData}
            message={this.state.message}
            files={this.state.files}
            setField={this.setField}
            GetFileUploaded={this.GetFileUploaded}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            TagSelected={this.TagSelected}
            FeeOption={this.FeeOption}
            CarParkingOption={this.CarParkingOption}
            DaysSelected={this.DaysSelected}
            PlaceSelected={this.PlaceSelected}
            handleSelectImage={this.handleSelectImage}
            DeleteImage={this.DeleteImage}
            imageState={this.state.imageState} 
            handleImageLoaded={this.handleImageLoaded}
            tagsData={this.state.tagsData}
          />
        </Form>
      </div>
    );
  }
}

export default UpdateEvent;
