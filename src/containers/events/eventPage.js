import React,{Component} from 'react'
import axios from "../../lib/axios";
import LoadingScreen from "../screen/loading";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class EventPage  extends Component{
    state = {
        eventData: [],
        open: true,
      };

    getData = async () => {
        const events = await axios.get("/api/GetEventInfo");
        if (events.status === 200) {
          this.setState({
            eventData: events.data,
            open: false
          });
        }
      };

    componentDidMount=()=>{
        this.getData()
    }

    renderEvent = () =>{
       return(
        <Card.Group itemsPerRow={3} centered className="showhotframe">
        {this.state.eventData.map(
          (data, index) =>
            index < 3 ? (
              <Card key={index} className="showhotcard">
                <Image src={data.images[0]} className="showhotimage" />
                <Card.Content>
                  <Link
                    to={{
                      pathname: "/eventInfo/",
                      search: data._id
                    }}
                  >
                    <h3 className="showhotname">{data.eventName}</h3>
                    <p className='description'>{data.eventDes}</p>
                  </Link>
                  
                </Card.Content>
              </Card>
            ) : (
              <p key={index} />
            )
        )}
      </Card.Group>
       )
    }

      
    render(){
        return(
            <div>
                <LoadingScreen open={this.state.open}/>
                {this.renderEvent()}
            </div>
        )
    }
}

export default EventPage