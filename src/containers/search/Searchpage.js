import React, { Component } from "react";
import { Input, Form, Card,Image,Button} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import '../../static/Scarch.css'
import axios from "../../lib/axios";
import Cookies from "js-cookie";
const user = Cookies.get("user");

class Searchpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            resultPlaces: [],
            resultEvents: [],
            value: ""
        };
    }

    inputScarch = () => {
        return (
            <Input action='Search' placeholder='Search...' value={this.state.value} onChange={this.handleOnChange('value')} />
        )
    }
    getDataForSearch = async () => {
        const respPlaces = await axios.get(
            "/api/getDataForSearchPlace/" + this.state.value
        );
        const respEvents = await axios.get(
            "/api/getDataForSearchEvent/" + this.state.value
        );
        this.setState({ isLoading: true })
        if (respPlaces.status === 200) {
            this.setState({
                isLoading: false,
                resultPlaces: respPlaces.data,    
                resultEvents: respEvents.data,       
            });
        }      
        if (respEvents.status === 200) {
            this.setState({
                isLoading: false,
                
                resultEvents: respEvents.data,       
            });
        }        
    };



    handleOnChange = key => e => {
        this.setState({ [key]: e.target.value })
    }
    render() {
        console.log(this.state)
        return (
            <div >
                <Form className="inputScarch" onSubmit={this.getDataForSearch}>
                    {this.inputScarch()}
                </Form>
                <p className="inputScarch">สถานที่</p>
                <div>
                    <Card.Group itemsPerRow={4} centered >
                        { this.state.resultPlaces.map((data, index) => (
                            <Card key={index} className="showhotcard">
                            <Link
                              to={{
                                pathname: "/placeInfo/",
                                search: data._id
                              }}
                            >
                              <Image src={data.images[0]} className="showhotimage" />
                              <div class="text-block">
                              <br/>
                              {user === "admin" ? (
                                  <div>
                                    {" "}
                                    <Link
                                      to={{
                                        pathname: "/updatePlace",
                                        state: { id: data._id }
                                      }}
                                    >
                                      <Button primary content="Edit" />
                                    </Link>
                                    <Button
                                      color="red"
                                      content="DELETE"
                                      value={index}
                                      onClick={e =>
                                        this.removeData(
                                          "event",
                                          data._id,
                                          data.placeName
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                    <span></span>
                                )}
                                <h3 className="showhotname">{data.placeName}</h3>
                                <p className="description">{data.placeDes}</p>
                                <p className="extraDetail">
                                  เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                  {data.comments.length}
                                </p>
                              </div>
                            </Link>
                          </Card>
                        ))}
                    </Card.Group>
                </div>
<p className="inputScarch">อีเว้นท์</p>

                <div>
                    <Card.Group itemsPerRow={4} centered >
                        { this.state.resultEvents.map((data, index) => (
                            <Card key={index} className="showhotcard">
                            <Link
                              to={{
                                pathname: "/eventInfo/",
                                search: data._id
                              }}
                            >
                              <Image src={data.images[0]} className="showhotimage" />
                              <div class="text-block">
                              <br/>
                              {user === "admin" ? (
                                  <div>
                                    {" "}
                                    <Link
                                      to={{
                                        pathname: "/updateEvent",
                                        state: { id: data._id }
                                      }}
                                    >
                                      <Button primary content="Edit" />
                                    </Link>
                                    <Button
                                      color="red"
                                      content="DELETE"
                                      value={index}
                                      onClick={e =>
                                        this.removeData(
                                          "event",
                                          data._id,
                                          data.eventName
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <span></span>
                                )}
                                <h3 className="showhotname">{data.eventName}</h3>
                                <p className="description">{data.eventDes}</p>
                                <p className="extraDetail">
                                  เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                  {data.comments.length}
                                </p>
                              </div>
                            </Link>
                          </Card>
                        ))}
                    </Card.Group>
                </div>
            </div>
        )
    }
}
export default Searchpage
