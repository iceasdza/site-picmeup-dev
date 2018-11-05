import React,{Component} from 'react'
import axios from "../../lib/axios";
import LoadingScreen from "../screen/loading";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
class PlacePage  extends Component{
    state = {
        placesData: [],
        open: true,
      };

      getData = async () => {
        const places = await axios.get("/api/getPlaceInfo");
        if (places.status === 200) {
          this.setState({
            placesData: places.data,
            open: false
          });
        }
      };

      componentDidMount=()=>{
          this.getData()
      }

      renderPlaces=()=>{
          return(
<Card.Group itemsPerRow={3} centered className="showhotframe">
          {this.state.placesData.map(
            (data, index) =>
              index < 3 ? (
                <Card key={index} className="showhotcard">
                  <Image src={data.images[0]} className="showhotimage" />
                  <Card.Content>
                    <Link
                      to={{
                        pathname: "/placeInfo/",
                        search: data._id
                      }}
                    >
                      <h3 className="showhotname">{data.placeName}</h3>
                      <p className='description'>{data.placeDes}</p>
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
                {this.renderPlaces()}
            </div>
        )
    }
}

export default PlacePage