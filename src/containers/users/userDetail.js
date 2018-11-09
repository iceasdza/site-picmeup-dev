import React,{Component} from 'react'
import axios from '../../lib/axios'
import { Link } from "react-router-dom";
import { Header, Image, Table, Menu, Card, Icon ,Button} from "semantic-ui-react";
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          albums: [],
          topics:[],
          user:[],
          open:true
        };
      }

      getData=async()=>{
        const user = this.props.location.search.replace("?", "");
        const data = await axios.get("/api/profile/" + user);
        const album = await axios.get("/api/getAlbumFromName/" + user);
        const topic = await axios.get('api/getTopicFromName/'+user)
        if(topic.status === 200 && data.status === 200 && album.status === 200){
            this.setState({
                user:data.data,
                albums: album.data,
                topics:topic.data,
              });
        }
      }

      renderTopicList = () => {
        const data = this.state.topics;
        return data.map((data, index) => (
          <Card fluid key={index}>
            <Link
              to={{
                pathname: "/topic/",
                search: data._id
              }}
            >
              <Card.Content header={data.topicName} />
            </Link>
            <Card.Content >{data.creator + " : " + data.create_date} 
            </Card.Content>
               
          </Card>
        ));
      };

      renderGalleryList = () => {
        return (
          
          <Card.Group itemsPerRow={4}>
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
                      <h3 className="">{data.albumName}</h3>
                    </Link>
                  </Card.Header>
                  <Card.Description>{data.albumDes}</Card.Description>
                  <Card.Description>{data.albumOwner}</Card.Description>
                  <Card.Meta>
                    <span className="date">{data.createDate}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        );
      };

      renderProfile=()=>{
        return(
          <div>
            <Image src={this.state.user.avatar}/>
            {this.state.user.userName}
          </div>
        )
      }

      componentDidMount(){
          this.getData()
      }

    render(){
        return(
            <div className="container fluid">
                {this.renderProfile()}
                {this.renderGalleryList()}
                {this.renderTopicList()}
            </div>
        )
    }
}
export default UserDetail