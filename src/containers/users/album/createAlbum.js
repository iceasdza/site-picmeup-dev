import React, { Component } from "react";
import CreateAlbumComponent from "../../../components/users/album/createAlbumComponent";
import { Form } from "formsy-semantic-ui-react";
import { Label, Button, Icon } from "semantic-ui-react";
import axios from "../../../lib/axios";
import Cookie from "js-cookie";
const user = Cookie.get("user");

class CreateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: "",
      files: [],
      imageState: true,
      images: [],
      fileList : []
    };
  }
  setField = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectImage = event => {
    this.setState({ imageState: true });
    const files = event.target.files;
    const arr = [];
    for (var x = 0; x < files.length; x++) {
      arr.push(URL.createObjectURL(files[x]));
    }
    this.setState({
      files: arr
    });
  };
  handleImageLoaded = () => {
    this.setState({ imageState: false });
  };

  DeletePhotoUploaded = (field, index) => {
    const data = Array.from(document.getElementById("img").files)
    let arr = [];
    arr = this.state.files;
    data.splice(index,1)
    arr.splice(index, 1);
    this.setState({ files: arr });
    console.log(data)
  };

  renderForm = () => {
    return (
      <div>
        <Form.Input
          label="ชิ่ออัลบัม"
          name="albumName"
          placeholder="ชื่ออัลบั้ม.."
          width={8}
          value={this.state.albumName}
          onChange={(e, { value }) => this.setField("albumName", value)}
          required
          errorLabel={<Label color="red" pointing />}
          validationErrors={{
            isDefaultRequiredValue: "จำเป็นต้องใส่ชื่ออัลบัม"
          }}
        />
        <label>
          <h3 style={{ color: "red" }}>{this.state.message}</h3>
        </label>
        <label className="custom-file-upload">
          <p className="Color">อัพโหลดรูปภาพ</p>
          <input
            type="file"
            accept="image/*"
            name="img"
            id="img"
            multiple
            onChange={e => this.handleSelectImage(e)}
            require="true"
          />
        </label>
      </div>
    );
  };

  handleSunmit = async () => {
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
      this.setState({ open: true });
      const dataFile = document.getElementById("img").files[0];
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleImage", data);
      this.setState({ images: resp.data });
    } else {
      this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultipleImage", data);
      data = [];
      for (let x = 0; x < resp.data.length; x++) {
        data.push(resp.data[x].location);
      }
      this.setState({ images: data });
    }

    const resp = await axios.post("/api/addAlbum", {
      albumName: this.state.placeName,
      albumDes: this.state.albumDes,
      comments: [],
      albumOwner: user,
      images: this.state.images
    });

    console.log(resp);
  };

  render() {
    return (
      <Form onSubmit={this.handleSunmit} className="container fluid">
        <CreateAlbumComponent
          renderForm={this.renderForm()}
          handleImageLoaded={this.handleImageLoaded}
          imageState={this.state.imageState}
          files={this.state.files}
          DeletePhotoUploaded={this.DeletePhotoUploaded}
        />
        <br />
        <br />
        <Button animated>
          <Button.Content visible>upload</Button.Content>
          <Button.Content hidden>
            <Icon name="file" />
          </Button.Content>
        </Button>
      </Form>
    );
  }
}

export default CreateAlbum;
