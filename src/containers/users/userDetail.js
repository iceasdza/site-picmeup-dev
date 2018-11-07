import React,{Component} from 'react'
import axios from '../../lib/axios'
import { Link } from "react-router-dom";
import { Header, Image, Table, Menu, Card, Icon ,Button} from "semantic-ui-react";
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: "",
          lastName: "",
          gender: "",
          userName: "",
          email: "",
          tel: "",
          messages: [],
          activeItem: "profile",
          albums: [],
          topics:[],
          commentedTopics:[],
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
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                userName: data.userName,
                email: data.email,
                tel: data.tel,
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
            <Card.Content >{data.creator + " : " + data.create_date} <Button color='red' onClick={e=>this.modalRemoveTopic(data._id,data.topicName)}>Delete</Button>
            </Card.Content>
               
          </Card>
        ));
      };

      componentDidMount(){
          this.getData()
      }

    render(){
        return(
            <div className="container fluid">
                profile
            </div>
        )
    }
}
export default UserDetail