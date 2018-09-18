import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import HeaderControl from "../../header/headercontrol";
import { Form } from "formsy-semantic-ui-react";
import EventForm from "../../../components/admin/events/eventAddForm";
import axios from "../../../lib/axios";
class AddEvent extends Component {
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
    placesData: [],
    PlaceId: "",
    message: "",
    images: [],
    files: []
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
    console.log(field + " : " + value);
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

  DeletePhotoUploaded = (field, index) => {
    let arr = [];
    arr = this.state.files;
    arr.splice(index, 1);
    this.setState({ files: arr });
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

  componentDidMount = async () => {
    this.getPlaceDetail();
  };

  onValidSubmit = formData => alert(JSON.stringify(formData));

  CreateEvent = async formData => {
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
    let data = new FormData();
    if (lengthOfFile === 1) {
      const dataFile = document.getElementById("img").files[0];
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleEvent", data);
      this.setState({ images: resp.data });
    } else {
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultipleEvents", data);
      data = [];
      for (let x = 0; x < resp.data.length; x++) {
        data.push(resp.data[x].location);
      }
      this.setState({ images: data });
    }

    if (lengthOfFile === 0) {
      this.setState({ message: "กรุณาเลือกรูปภาพ" });
      return;
    }

    await axios.post("/api/addevent", {
      eventName: this.state.eventName,
      eventDes: this.state.eventDes,
      tel: this.state.tel,
      openTime: this.state.openTime,
      closeTime: this.state.closeTime,
      fee: this.state.fee,
      carParking: this.state.carParking,
      tags: this.state.tags,
      days: this.state.days,
      PlaceId: this.state.PlaceId,
      images:this.state.images
    });

    // reload for test
    window.location.replace("/");
  };

  render() {
    return (
      <div>
        <HeaderControl />
        <Form onSubmit={this.CreateEvent}>
          <EventForm
            eventName={this.state.eventName}
            eventDes={this.state.eventDes}
            tel={this.state.tel}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            carParking={this.state.carParking}
            days={this.state.days}
            tags={this.state.tags}
            FileList={this.state.FileList}
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
          />
        </Form>
      </div>
    );
  }
}

export default AddEvent;
