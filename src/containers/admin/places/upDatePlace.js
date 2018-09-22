import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import PlaceEdit from "../../../components/admin/places/placeEditForm";
import { Form } from "formsy-semantic-ui-react";
import axios from "../../../lib/axios";

class Home extends Component {
  state = {
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
    id: "",
    message: "",
    files: []
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

  DaysSelected = (field, value) => {
    this.setState({ [field]: value });
    console.log(this.state.days);
  };

  getData = async () => {
    let _id = this.props.location.state.id;
    const resp = await axios.get("/api/getPlaceInfoFromId/" + _id);
    const data = resp.data[0];
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
      id: _id,
      images: data.images
    });
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  DeleteImage = async index => {
    const images = this.state.images;
    images.splice(index, 1);
    this.setState({ images: images });
  };
  DeletePhotoUploaded = (field, index) => {
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

  componentDidMount = () => {
    this.getData();
  };

  UpdatePlace = async formData => {
    if(formData.place_name === "" || formData.place_desc === "" || formData.place_tel === ""
    || formData.place_open === "" || formData.place_close === ""|| formData.day_tag === undefined
    || formData.place_tag === undefined){
        return
    }

    const lengthOfFile = document.getElementById("img").files.length;
    //--------no image updated-----------//
    if (lengthOfFile === 0) {
      const date = new Date();
      await axios.put("/api/UpdatePlaceFromId/" + this.state.id, {
        placeName: this.state.placeName,
        placeDes: this.state.placeDes,
        tel: this.state.tel,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        fee: this.state.fee,
        carParking: this.state.carParking,
        tags: this.state.tags,
        days: this.state.days,
        FileList: this.state.FileList,
        editor: "Patis editor",
        images: this.state.images,
        edit_date: date
      });

      window.location.replace("/");
      return
    }
    //---------add 1 image---------------//
    let data = new FormData();
    if (lengthOfFile === 1) {
        const temp = this.state.images
        const dataFile = document.getElementById('img').files[0]
        data.append('img', dataFile)
        const resp = await axios.post('/api/uploadSinglePlace', data)
        temp.push(resp.data)
        this.setState({ images: temp})

    }
     //---------add >1 image---------------//
    else if(lengthOfFile > 1){
        const dataFile = document.getElementById('img').files
        for (var y = 0; y < dataFile.length; y++) {
            data.append('img', dataFile[y])

        }
        const resp = await axios.post('/api/uploadMultiplePlaces', data)
        const temp = this.state.images
        for(let x = 0;x<resp.data.length;x++){
          temp.push(resp.data[x].location)
        }
        this.setState({ images: temp})
    }

    const date = new Date();
    await axios.put('/api/UpdatePlaceFromId/' + this.state.id, {
        placeName: this.state.placeName,
        placeDes: this.state.placeDes,
        tel: this.state.tel,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        fee: this.state.fee,
        carParking: this.state.carParking,
        tags: this.state.tags,
        days: this.state.days,
        FileList: this.state.FileList,
        editor: "Patis editor",
        edit_date: date,
        images:this.state.images
    })

    //reload for test
    window.location.replace("/")
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.UpdatePlace}>
          <PlaceEdit
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
            message={this.state.message}
            files={this.state.files}
            TagSelected={this.TagSelected}
            FeeOption={this.FeeOption}
            setField={this.setField}
            CarParkingOption={this.CarParkingOption}
            DaysSelected={this.DaysSelected}
            handleSelectImage={this.handleSelectImage}
            DeleteImage={this.DeleteImage}
          />
        </Form>
      </div>
    );
  }
}

export default Home;
