import React, { Component } from "react";
import EditAlbumComponent from "../../../components/users/album/editAlbumComponent";
import { Form } from "formsy-semantic-ui-react";
import { Label, Button, Icon } from "semantic-ui-react";
import axios from "../../../lib/axios";
import { Redirect } from "react-router-dom";
import UpLoadingScreen from '../../screen/uploading'
import '../../../static/image.css'

class EditAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: "",
      files: [],
      imageState: true,
      images: [],
      loading:false,
      redirect: false,
      albumDes:'',
      newImage:[],
      id:'',
      avatarLabel:'hidden'
    };
  }
  setField = (field, value) => {
    this.setState({ [field]: value });
  };

  componentDidMount(){
    this.getData()
  }

  getData=async()=>{
    if(this.props.location.state===undefined){
      this.setState({redirect:true})
      return
    }
    const _id = this.props.location.state.id
    const resp = await axios.get('/api/getAlbumFromId/'+_id)
    if(resp.status ===200){
      const data = resp.data[0]
      this.setState({
        id:_id,
        albumName:data.albumName,
        albumDes:data.albumDes,
        images:data.images
      })
    }
  }

  handleSelectImage = async() => {
    this.setState({ imageState: true,loading:true,avatarLabel:"hidden" });
    const lengthOfFile = document.getElementById("img").files.length;
    let data = new FormData();
    if (lengthOfFile === 1) {
      const arr = this.state.images
      this.setState({ open: true });
      const dataFile = document.getElementById("img").files[0];
      data.append("img", dataFile);
      const resp = await axios.post("/api/uploadSingleImage", data);
      arr.push(resp.data)
      if(resp.status === 200){
        this.setState({ images: arr,loading:false });
      }else{
        return
      }

    } else {
      this.setState({ open: true });
      const dataFile = document.getElementById("img").files;
      for (var y = 0; y < dataFile.length; y++) {
        data.append("img", dataFile[y]);
      }
      const resp = await axios.post("/api/uploadMultipleImage", data);
      if(resp.status === 200){
        data = this.state.images
        for (let x = 0; x < resp.data.length; x++) {
          data.push(resp.data[x].location);
        }
        this.setState({ images: data,loading:false });
      }else{
        return
      }
    }


  };

  handleImageLoaded = () => {
    this.setState({ imageState: false });
  };

  DeletePhotoUploaded = (field, index) => {
    let image = this.state.images
    image.splice(index, 1);
    this.setState({ image: image });
  };

  renderForm = () => {
    return (
      <div className="editAlbum">
        <Form.Input
          label="ชิ่ออัลบั้ม"
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
        
        <Form.TextArea
        name="place_desc"
        label="คำอธิบายอัลบั้ม"
        placeholder="เกี่ยวกับอัลบั้ม.."
        width={14}
        value={this.state.albumDes}
        onChange={(e, { value }) => this.setField("albumDes", value)}
        required
        errorLabel={<Label color="red" pointing />}
        validationErrors={{ isDefaultRequiredValue: "จำเป็นต้องใส่คำอธิบาย" }}
      />

        <label className="uploadBtn">
          <p className="Color">เลือกรูปภาพ</p>
          <input
            name="img"
            id="img"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={e => this.handleSelectImage(e)}
          />
        </label>
        <Label  pointing='left' color="red" className={this.state.avatarLabel} >กรุณาเลือกรูปภาพ</Label>
      
      </div>
    );
  };


  handleSunmit = async () => {
    if(this.state.images.length === 0 && this.state.files.length === 0){
      this.setState({ avatarLabel: "" });
      return ;
    }
    this.setState({ loading: true });
    const resp = await axios.put("/api/updateAlbum/"+this.state.id,{
      albumName: this.state.albumName,
      albumDes: this.state.albumDes,
      images: this.state.images
    });
    if(resp.status === 200){
      this.setState({ redirect: true });
    }
  };

  render() {
    const { redirect} = this.state;
    if (redirect) {
      return <Redirect to={{ pathname: "/gallery" }} />;
    }
    return (
      <div>
        <Form  className="container fluid">
        <UpLoadingScreen
        loading={this.state.loading}
        />
        <EditAlbumComponent
          renderForm={this.renderForm()}
          handleImageLoaded={this.handleImageLoaded}
          imageState={this.state.imageState}
          files={this.state.images}
          DeletePhotoUploaded={this.DeletePhotoUploaded}
        />
        <br />
        <br />
      </Form>
                <center>
        <Button animated onClick={this.handleSunmit} className="commentBtn">
          <Button.Content visible>แก้ไข</Button.Content>
          <Button.Content hidden>
            <Icon name="file" />
          </Button.Content>
        </Button>
        </center>
      </div>
    );
  }
}

export default EditAlbum;
