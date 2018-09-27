import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "formsy-semantic-ui-react";
import EventEditForm from "../../../components/admin/events/eventEditForm";
import axios from "../../../lib/axios";
import { Redirect } from "react-router-dom";
import {  Dimmer, Loader } from "semantic-ui-react";
class UpdateEvent extends Component {
  state = {
    eventName: "",
    eventDes: "",
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
    FileList: [],
    placesData: [],
    PlaceId: "",
    message: "",
    images: [],
    id: "",
    files: [],
    redirect: false,
    open: false,
    imageState:true
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
      tel: data.tel,
      openTime: data.openTime,
      closeTime: data.closeTime,
      fee: data.fee,
      carParking: data.carParking,
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
  handleSelectImage = event => {
    const files = event.target.files;
    const arr = [];
    for (var x = 0; x < files.length; x++) {
      arr.push(URL.createObjectURL(files[x]));
    }
    this.setState({
      files: arr
    });
  };

  getPlaceDetail = async () => {
    const resp = await axios.get("/api/getPlaceInfo");
    this.setState({ placesData: resp.data });
  };

  FeeOption = (field, value) => {
    this.setState({ [field]: value });
    console.log("fee : ", value);
  };

  CarParkingOption = (field, value) => {
    this.setState({ [field]: value });
    console.log("car parking : " + value);
  };

  TagSelected = (field, value) => {
    this.setState({ [field]: value });
    console.log(this.state.tags);
  };

  PlaceSelected = (field, value) => {
    this.setState({ [field]: value });
    console.log(this.state.PlaceId);
  };

  DaysSelected = (field, value) => {
    this.setState({ [field]: value });
    console.log(this.state.days);
  };

  componentDidMount = async () => {
    this.getData();
    this.getPlaceDetail();
    // console.log(this.state.placesData)
  };

  UpdateEvent = async formData => {
    if (
      formData.place_name === "" ||
      formData.place_desc === "" ||
      formData.place_tel === "" ||
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
      await axios.put("/api/UpdateEventFromId/" + this.state.id, {
        eventName: this.state.eventName,
        eventDes: this.state.eventDes,
        tel: this.state.tel,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        fee: this.state.fee,
        carParking: this.state.carParking,
        tags: this.state.tags,
        days: this.state.days,
        images: this.state.images,
        PlaceId: this.state.PlaceId
      });

      this.setState({redirect:true})
    }

    //---------add 1 image---------------//
    let data = new FormData();
    if (lengthOfFile === 1) {
      this.setState({ open: true });
      console.log(lengthOfFile);
      const temp = this.state.images;
      const dataFile = document.getElementById("img").files[0];
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleEvent", data);
      temp.push(resp.data);
      this.setState({ images: temp });
    }
    //---------add > 1 image---------------//
    else if (lengthOfFile > 1) {
      this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultiplePlaces", data);
      const temp = this.state.images;
      for (let x = 0; x < resp.data.length; x++) {
        temp.push(resp.data[x].location);
      }
      this.setState({ images: temp });
    }
    await axios.put("/api/UpdateEventFromId/" + this.state.id, {
      eventName: this.state.eventName,
      eventDes: this.state.eventDes,
      tel: this.state.tel,
      openTime: this.state.openTime,
      closeTime: this.state.closeTime,
      fee: this.state.fee,
      carParking: this.state.carParking,
      tags: this.state.tags,
      days: this.state.days,
      FileList: this.state.FileList,
      PlaceId: this.state.PlaceId,
      FileName: this.state.FileName,
      images: this.state.images
    });

    this.setState({redirect:true})
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
            tel={this.state.tel}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            carParking={this.state.carParking}
            days={this.state.days}
            tags={this.state.tags}
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
          />
        </Form>
      </div>
    );
  }
}

export default UpdateEvent;
