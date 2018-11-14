import React, { Component } from "react";
import GalleryComponent from "../../components/gallery/galleryComponent";
import { Card, Image,Button } from "semantic-ui-react";
import { Link,NavLink } from "react-router-dom";
import axios from "../../lib/axios";
import Cookie from "js-cookie";
import LoadingScreen from '../screen/loading'
import '../../static/gallery.css'
const user = Cookie.get("user");

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      open:true
    };
  }

  getData = async () => {
    const resp = await axios.get("/api/getAlbums");
    if(resp.status=== 200){
      this.setState({ albums: resp.data,open:false });
    }
  };

  renderGalleryList = () => {
    return (
      <Card.Group itemsPerRow={4 } className="galleryCard">
        {this.state.albums.map((data, index) => (
          <Card key={index} className="showhotcard">
          <Link
            to={{
              pathname: "/gallery/albumInfo/",
              search: data._id
            }}
          >
            <Image src={data.images[0]} className="showhotimage" />
            <div class="text-block">
            <h3 className="showhotname">โดยคุณ : {data.albumOwner}</h3>
                <h3 className="showhotname">อัลบั้ม : {data.albumName}</h3>
                <p className="description">{data.albumDes}</p>
            </div>
          </Link>
        </Card>
        ))}
      </Card.Group>
    );
  };

  componentDidMount() {
    this.getData();
  }

  renderCreateAlbumButton = () =>{
      return(
        <div>
          <div className="bannerGallery">
              <h1 className="bannerHeader">ถ่ายทอดประสบการณ์ผ่านรูปถ่าย</h1>
              <div className="headerWrap">
              <NavLink to="/createalbum" className="createAlbumContent">สร้างอัลบัมของคุณที่นี่ ! </NavLink>
              </div>
          </div>
        </div>
      )
  }

  render() {
    
    return (
      <div>
      <LoadingScreen
      open={this.state.open}
      />
      {this.renderCreateAlbumButton()}
        <GalleryComponent 
        renderGalleryList={this.renderGalleryList} />
      </div>
    );
  }
}
