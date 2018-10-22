import React, { Component } from "react";
import GalleryComponent from "../../components/gallery/galleryComponent";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  getData = async () => {
    const resp = await axios.get("/api/getAlbums");
    this.setState({ albums: resp.data });
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
        <GalleryComponent renderGalleryList={this.renderGalleryList} />
      </div>
    );
  }
}
