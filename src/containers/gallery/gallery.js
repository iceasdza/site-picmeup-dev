import React, { Component } from "react";
import GalleryComponent from "../../components/gallery/galleryComponent";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import LoadingScreen from '../screen/loading'

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
      <Card.Group itemsPerRow={6}>
        {this.state.albums.map((data, index) => (
          <Card key={index}>
            <Image src={data.images[0]} />
            <Card.Content>
              <Card.Header>
                <Link
                  to={{
                    pathname: "/gallery/albumInfo/",
                    search: data._id
                  }}
                >
                  <h3 className="showname">{data.albumName}</h3>
                </Link>
              </Card.Header>
              <Card.Meta>
                <span className="date">{data.createDate}</span>
              </Card.Meta>
              <Card.Description>{data.albumDes}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="container fluid">
      <LoadingScreen
      open={this.state.open}
      />
        <GalleryComponent renderGalleryList={this.renderGalleryList} />
      </div>
    );
  }
}
