import React, { Component } from "react";
import GalleryComponent from "../../components/gallery/galleryComponent";
import { Card, Image, Segment, Responsive } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import axios from "../../lib/axios";
import LoadingScreen from "../screen/loading";
import "../../static/gallery.css";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      open: true
    };
  }

  getData = async () => {
    const resp = await axios.get("/api/getAlbums");
    if (resp.status === 200) {
      this.setState({ albums: resp.data, open: false });
    }
  };

  renderGalleryList = () => {
    return (
      <Segment.Group>
        <Responsive as={Segment} minWidth={0} maxWidth={767}>
        <br/>
        <center>
        {this.state.albums.map((data, index) => (
          <Card key={index} className="showhotcardMobile">
            <Link
              to={{
                pathname: "/gallery/albumInfo/",
                search: data._id
              }}
            >
              <Image src={data.images[0]} className="showhotimage" />
              <div class="text-block">
                <div className="dataWrap">
                  <h3 className="showhotname">โดยคุณ : {data.albumOwner}</h3>
                  <h3 className="showhotname">อัลบั้ม : {data.albumName}</h3>
                  <p className="description">{data.albumDes}</p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
        </center>
        </Responsive>
        <Responsive as={Segment} minWidth={767}>
        <Card.Group itemsPerRow={4} className="galleryCard">
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
                <div className="dataWrap">
                  <h3 className="showhotname">โดยคุณ : {data.albumOwner}</h3>
                  <h3 className="showhotname">อัลบั้ม : {data.albumName}</h3>
                  <p className="description">{data.albumDes}</p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </Card.Group></Responsive>
      </Segment.Group>
    );
  };

  componentDidMount() {
    this.getData();
  }

  renderCreateAlbumButton = () => {
    return (
      <div>
        <div className="bannerGallery">
          <h1 className="bannerHeader">ถ่ายทอดประสบการณ์ผ่านรูปถ่าย</h1>
          <div className="headerWrap">
            <NavLink to="/createalbum" className="createAlbumContent">
              สร้างอัลบัมของคุณที่นี่ !{" "}
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <LoadingScreen open={this.state.open} />
        {this.renderCreateAlbumButton()}
        <GalleryComponent renderGalleryList={this.renderGalleryList} />
      </div>
    );
  }
}
