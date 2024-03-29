import React, { Component } from "react";
import PlaceEdit from "../../../components/admin/places/placeEditForm";
import { Form } from "formsy-semantic-ui-react";
import axios from "../../../lib/axios";
import {  Dimmer, Loader,Button } from "semantic-ui-react";
import {GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Redirect } from "react-router-dom";
import "../../../static/map.css";
import swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
class Home extends Component {
  state = {
    placeName: "",
    placeDes: null,
    contact: null,
    openTime: "",
    closeTime: "",
    fee: "yes",
    feePrice:null,
    carParking: "yes",
    carParkSize:null,
    carParkPrice:null,
    days: [],
    tags: [],
    map: {
      latitude: 0,
      longtitude: 0
    },
    images: [],
    id: "",
    message: "",
    files: [],
    address: "",
    lat: null,
    lng: null,
    redirect:false,
    open: false,
    imageState:true,
    tagsData:[],
    activitiesData:[],
    activities:[]
  };

  getActivityDetail = async () =>{
    const arr = []
    const resp = await axios.get("/api/getAllActivity");
    resp.data.map((data,index)=>(
      arr.push({ key: index+1, text: data.activityName, value: data.activityName })
    ))
    this.setState({activitiesData:arr})
  }

  getTagDetail = async () =>{
    const arr = []
    const resp = await axios.get("/api/getAllTags");
    resp.data.map((data,index)=>(
      arr.push({ key: index+1, text: data.tagName, value: data.tagName })
    ))
    this.setState({tagsData:arr})

  }
  handleImageLoaded = () => {
    this.setState({imageState:false})
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

  DaysSelected = (field, value) => {
    this.setState({ [field]: value });
  };

  getData = async () => {
    if(this.props.location.state===undefined){
      this.setState({redirect:true})
      return
    }
    let _id = this.props.location.state.id;
    const resp = await axios.get("/api/getPlaceInfoFromId/" + _id);
    const data = resp.data[0];
    this.setState({
      placeName: data.placeName,
      placeDes: data.placeDes,
      contact: data.contact,
      openTime: data.openTime,
      closeTime: data.closeTime,
      fee: data.fee,
      feePrice: data.feePrice,
      carParking: data.carParking,
      carParkSize: data.carParkSize,
      carParkPrice:data.carParkPrice,
      tags: data.tags,
      days: data.days,
      images: data.images,
      lat: data.lat,
      lng: data.lng,
      activities:data.activities
    });
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ lat: latLng.lat, lng: latLng.lng }))
      .catch(error => console.error("Error", error));
  };

  renderGoogleMap = () => {
    return (
      <div className="container fluid">
        <PlacesAutocomplete
          styles={{ position: "absolute" }}
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {/* <Map
        className="map"
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
        </Map> */}
        </div>
    );
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
  handleSelectImage = async() => {
    this.setState({ message: "" });
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
    const temp = this.state.images;
      const dataFile = document.getElementById("img").files[0];
      const arr = []
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSinglePlace", data);
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

  componentDidMount = () => {
    this.getData();
    this.getTagDetail()
    this.getActivityDetail()
  };

  UpdatePlace = async formData => {
    if(this.state.images.length===0 && this.state.files.length === 0){
      this.setState({ message: "กรุณาเลือกรูปภาพ" });
      return;
    }
    let _id = this.props.location.state.id;
    if(this.state.placeName=== "" || this.state.placeDes === "" || this.state.contact === ""
    || this.state.openTime === "" || this.state.closeTime=== ""|| this.state.tags === undefined
){
        return
    }
    const lengthOfFile = document.getElementById("img").files.length;
    
    if (lengthOfFile === 0) {
      return swal({
        title: "คุณแน่ใจหรือ ?",
        text: "คุณต้องการแก้ไขสถานที่" + this.state.placeName + "ระบบหรือไม่ ?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value!==undefined) {
          this.setState({ open: true });
        axios.put("/api/UpdatePlaceFromId/" + _id, {
            placeName: this.state.placeName,
            placeDes: this.state.placeDes,
            contact: this.state.contact,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            fee: this.state.fee,
            feePrice: this.state.feePrice,
            carParking: this.state.carParking,
            carParkSize: this.state.carParkSize,
            carParkPrice:this.state.carParkPrice,
            tags: this.state.tags,
            days: this.state.days,
            FileList: this.state.FileList,
            editor: "Patis editor",
            activities:this.state.activities,
            images: this.state.images,
            lat:this.state.lat,
            lng:this.state.lng
          }).then(value=>{
            if(value.status===200){
              this.setState({ redirect: true });
            }
          })
        }
      })
    }
    this.setState({ open: true });
    return swal({
      title: "คุณแน่ใจหรือ ?",
      text: "คุณต้องการแก้ไขสถานที่" + this.state.placeName + "ระบบหรือไม่ ?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        axios.put('/api/UpdatePlaceFromId/' +_id, {
              placeName: this.state.placeName,
              placeDes: this.state.placeDes,
              contact: this.state.contact,
              openTime: this.state.openTime,
              closeTime: this.state.closeTime,
              fee: this.state.fee,
              feePrice: this.state.feePrice,
              carParking: this.state.carParking,
              carParkSize: this.state.carParkSize,
              carParkPrice:this.state.carParkPrice,
              tags: this.state.tags,
              days: this.state.days,
              FileList: this.state.FileList,
              editor: "Patis editor",
              images:this.state.images,
              activities:this.state.activities,
              lat:this.state.lat,
              lng:this.state.lng
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
        <Form >
        <Dimmer active={open} page>
          <Loader size='massive'><p>รอแปปนึงกำลังอัพโหลดรูป</p></Loader>
          </Dimmer>
          <PlaceEdit
            placeName={this.state.placeName}
            placeDes={this.state.placeDes}
            contact={this.state.contact}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            feePrice={this.state.feePrice}
            carParking={this.state.carParking}
            carParkSize={this.state.carParkSize}
            carParkPrice={this.state.carParkPrice}
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
            renderGoogleMap={this.renderGoogleMap}
            imageState={this.state.imageState} 
            handleImageLoaded={this.handleImageLoaded} 
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            tagsData={this.state.tagsData}
            activities={this.state.activities}
            activitiesData={this.state.activitiesData}
          />
          <center>
            <Button className="commentBtn" onClick={this.UpdatePlace}>บันทึก</Button>
          </center>
        </Form>
      </div>
    );
  }
}

// export default Home;
export default GoogleApiWrapper({
  apiKey: "AIzaSyAxyyre9woDQlaPEGTb-Hmqprwjyd2rD88"
})(Home);