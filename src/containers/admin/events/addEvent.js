import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "formsy-semantic-ui-react";
import EventForm from "../../../components/admin/events/eventAddForm";
import axios from "../../../lib/axios";
import { Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
class AddEvent extends Component {
  state = {
    eventName: "",
    eventDes: "",
    tel: "",
    openTime: "",
    closeTime: "",
    fee: "no",
    feePrice:0,
    days: [],
    tags: [],
    map: {
      latitude: 0,
      longtitude: 0
    },
    placesData: [],
    PlaceId: "",
    message: "",
    images: [],
    files: [],
    redirect: false,
    open: false,
    imageState: true,
    tagsData:[]
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  handleImageLoaded = () => {
    this.setState({ imageState: false });
  };

  handleSelectImage = async() => {
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
      // this.setState({ open: true });
      const arr = []
      const dataFile = document.getElementById("img").files[0];
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleEvent", data);
      arr.push(resp.data)
      this.setState({ images: arr });
    
    } else {
      // this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultipleEvents", data);
      data = [];
      for (let x = 0; x < resp.data.length; x++) {
        data.push(resp.data[x].location);
      }
      console.log(data)
      this.setState({ images: data });
    }
  };

  DeletePhotoUploaded = (field, index) => {
    let image = this.state.images
    image.splice(index, 1);
    this.setState({ image: image });
  };

  getPlaceDetail = async () => {
    const resp = await axios.get("/api/getPlaceInfo");
    this.setState({ placesData: resp.data });
  };

  getTagDetail = async () =>{
    const arr = []
    const resp = await axios.get("/api/getAllTags");
    resp.data.map((data,index)=>(
      arr.push({ key: index+1, text: data.tagName, value: data.tagName })
    ))
    this.setState({tagsData:arr})

  }

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

  componentDidMount = async () => {
    this.getPlaceDetail();
    this.getTagDetail();
  };

  onValidSubmit = formData => alert(JSON.stringify(formData));

  CreateEvent = async formData => {
    const lengthOfFile = document.getElementById("img").files.length;
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
    if (lengthOfFile === 0) {
      this.setState({ message: "กรุณาเลือกรูปภาพ" });
      return;
    }
    this.setState({ open: true });
   const resp  = await axios.post("/api/addevent", {
      eventName: this.state.eventName,
      eventDes: this.state.eventDes,
      tel: this.state.tel,
      openTime: this.state.openTime,
      closeTime: this.state.closeTime,
      fee: this.state.fee,
      feePrice: this.state.feePrice,
      tags: this.state.tags,
      days: this.state.days,
      PlaceId: this.state.PlaceId,
      images: this.state.images
    });

    // reload for test
    if(resp.status === 200){
      this.setState({ redirect: true });
    }
    
  };

  render() {
    const { redirect, open } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/main" }} />;
    }
    return (
      <div>
        <Form onSubmit={this.CreateEvent}>
          <Dimmer active={open} page>
            <Loader size="massive">
              <p>รอแปปนึงกำลังอัพโหลดรูป</p>
            </Loader>
          </Dimmer>
          <EventForm
            eventName={this.state.eventName}
            eventDes={this.state.eventDes}
            tel={this.state.tel}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            feePrice={this.state.feePrice}
            days={this.state.days}
            tags={this.state.tags}
            placesData={this.state.placesData}
            message={this.state.message}
            files={this.state.images}
            setField={this.setField}
            GetFileUploaded={this.GetFileUploaded}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            TagSelected={this.TagSelected}
            FeeOption={this.FeeOption}
            CarParkingOption={this.CarParkingOption}
            DaysSelected={this.DaysSelected}
            PlaceSelected={this.PlaceSelected}
            handleSelectImage={this.handleSelectImage}
            imageState={this.state.imageState}
            handleImageLoaded={this.handleImageLoaded}
            tagsData={this.state.tagsData}
          />
        </Form>
      </div>
    );
  }
}

export default AddEvent;
