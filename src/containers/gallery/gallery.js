import React, { Component } from "react";
import GalleryComponent from "../../components/gallery/galleryComponent";
import { Card, Image,Button } from "semantic-ui-react";
import { Link,NavLink } from "react-router-dom";
import axios from "../../lib/axios";
import Cookie from "js-cookie";
import LoadingScreen from '../screen/loading'
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
      <Card.Group itemsPerRow={4}>
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
            <h3 className="showhotname">{data.albumOwner}</h3>
                <h3 className="showhotname">{data.albumName}</h3>
                <p className="description">{data.albumDes}</p>
                {/* <p className="extraDetail">
                  เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                  {data.comments.length}
                </p> */}
            </div>
          </Link>
        </Card>
          // <Card key={index}>
          //   <Image src={data.images[0]} />
          //   <Card.Content>
          //     <Card.Header>
          //       <Link
          //         to={{
          //           pathname: "/gallery/albumInfo/",
          //           search: data._id
          //         }}
          //       >
          //         <h3 className="">{data.albumName}</h3>
          //       </Link>
          //     </Card.Header>
          //     <Card.Description>{data.albumDes}</Card.Description>
          //     <Card.Description>{data.albumOwner}</Card.Description>
          //     <Card.Meta>
          //       <span className="date">{data.createDate}</span>
          //     </Card.Meta>
          //   </Card.Content>
          // </Card>
        ))}
      </Card.Group>
    );
  };

  componentDidMount() {
    this.getData();
  }

  renderCreateAlbumButton = () =>{
    if(user === undefined){
      return(
        <div></div>
      )
    }else{
      return(
        <div>
          <br/>
          <NavLink to="/createalbum">
          <Button fluid color='blue'  className="showname">สร้างอัลบั้มของคุณ</Button>

          </NavLink>
          <br/>
        </div>
      )
    }
  }

  render() {
    
    return (
      <div className="container fluid">
      <LoadingScreen
      open={this.state.open}
      />
        <GalleryComponent 
        renderCreateAlbumButton={this.renderCreateAlbumButton}
        renderGalleryList={this.renderGalleryList} />
      </div>
    );
  }
}
