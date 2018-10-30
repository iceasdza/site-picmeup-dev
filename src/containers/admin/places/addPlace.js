import React, { Component } from "react";
import PlaceForm from "../../../components/admin/places/addPlaceForm";
import { Form } from "formsy-semantic-ui-react";
import { Dimmer, Loader, Card, Icon, Image } from "semantic-ui-react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Redirect } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "../../../static/map.css";
import axios from "../../../lib/axios";
class AddPlace extends Component {
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
    message: "",
    files: [],
    address: "",
    lat: 13.6525851,
    lng: 100.49361,
    redirect: false,
    open: false,
    imageState:true
  };

  handleImageLoaded = () => {
    this.setState({imageState:false})
  };
  renderImage = () => {
    return (
      <Card.Group itemsPerRow={6}>
        {this.state.files.map((data, index) => (
          <Card key={index}>
            <div>
              <Icon
                circular
                inverted
                name="remove"
                color="red"
                onClick={() => this.DeletePhotoUploaded("files", index)}
              />
            </div>
              <Dimmer active={this.state.imageState}>
                <Loader >
                  โหลดดิ้ง
                </Loader>
              </Dimmer>
            <Image
              onLoad={this.handleImageLoaded}
              src={data}
              className="imageUploadSize"
            />
          </Card>
        ))}
      </Card.Group>
    );
  };

  FeeOption = (field, value) => {
    this.setState({ [field]: value });
  };

  DeletePhotoUploaded = (field, index) => {
    let image = this.state.images
    image.splice(index, 1);
    this.setState({ image: image });
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

  handleSelectImage = async() => {
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
      // this.setState({ open: true });
      const dataFile = document.getElementById("img").files[0];
      const arr = []
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSinglePlace", data);
      arr.push(resp.data)
      this.setState({ images: arr });
    } else {
      // this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultiplePlaces", data);
      data = [];
      for (let x = 0; x < resp.data.length; x++) {
        data.push(resp.data[x].location);
      }
      this.setState({ images: data });
    }
  };

  CreatePlace = async formData => {
    const lengthOfFile = this.state.images.length
    if (lengthOfFile === 0) {
      this.setState({ message: "กรุณาเลือกรูปภาพ" });
      return;
    }
    if (
      formData.place_name === "" ||
      formData.place_desc === "" ||
      formData.place_tel === "" ||
      formData.place_open === "" ||
      formData.place_close === "" ||
      formData.place_tag === "" ||
      formData.place_day === undefined ||
      formData.place_tag === undefined
    ) {
      return;
    }
    this.setState({ open: true });
    const resp = await axios.post("/api/addplace", {
      placeName: this.state.placeName,
      placeDes: this.state.placeDes,
      tel: this.state.tel,
      openTime: this.state.openTime,
      closeTime: this.state.closeTime,
      fee: this.state.fee,
      carParking: this.state.carParking,
      tags: this.state.tags,
      days: this.state.days,
      images: this.state.images,
      lat: this.state.lat,
      lng: this.state.lng
    });
    if(resp.status === 200){
      this.setState({ redirect: true });
    }
  };

  setField = (field, value) => {
    this.setState({ [field]: value });
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
        <Map
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
        </Map>
      </div>
    );
  };
  render() {
    const { redirect, open } = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/main" }} />;
    }
    return (
      <div>
        <Form onSubmit={this.CreatePlace}>
          <Dimmer active={open} page>
            <Loader size="massive">
              <p>รอแปปนึงกำลังอัพโหลดรูป</p>
            </Loader>
          </Dimmer>

          <PlaceForm
            // passing value
            placeName={this.state.placeName}
            placeDes={this.state.placeDes}
            tel={this.state.tel}
            openTime={this.state.openTime}
            closeTime={this.state.closeTime}
            fee={this.state.fee}
            carParking={this.state.carParking}
            days={this.state.days}
            tags={this.state.tags}
            message={this.state.message}
            files={this.state.images}
            // pass method
            TagSelected={this.TagSelected}
            FeeOption={this.FeeOption}
            setField={this.setField}
            CarParkingOption={this.CarParkingOption}
            DaysSelected={this.DaysSelected}
            GetFileUploaded={this.GetFileUploaded}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            handleSelectImage={this.handleSelectImage}
            renderGoogleMap={this.renderGoogleMap}
            //renderImage={this.renderImage}     
            imageState={this.state.imageState} 
            handleImageLoaded={this.handleImageLoaded}     
            handleSetImageState={this.handleSetImageState}
          />
        </Form>
      </div>
    );
  }
}

// export default AddPlace
export default GoogleApiWrapper({
  apiKey: "AIzaSyAxyyre9woDQlaPEGTb-Hmqprwjyd2rD88"
})(AddPlace);
