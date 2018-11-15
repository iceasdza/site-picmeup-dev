import React, { Component } from "react";
import { Input, Form, Card,Image,Button} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import '../../static/Scarch.css'
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import LoadingScreen from "../../containers/screen/loading";
const user = Cookies.get("user");

class Searchpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            resultPlaces: [],
            resultEvents: [],
            resultTagPlaces: [],
            resultTagEvents: [],
            value: ""
        };
    }
    
    componentDidMount(){ 
if(this.props.location.state){
      let _tag = this.props.location.state.passtag;
      this.setState({
        value:_tag
      }, () => {
        this.getDataForSearch()
      })

    }
      
    }

    inputScarch = () => {
        return (
            <Input action='Search' placeholder='Search...' value={this.state.value} onChange={this.handleOnChange('value')} />
        )
    }
    getDataForSearch = async () => {
      this.setState({
        open:true
      })

      console.log('aaaa: ', this.state.value)
        const respPlaces = await axios.get(
            "/api/getDataForSearchPlace/" + this.state.value
        );
        const respEvents = await axios.get(
            "/api/getDataForSearchEvent/" + this.state.value
        );
        const respTagPlaces = await axios.get(
          "/api/getTagForSearchPlace/" + this.state.value
        );
        const respTagEvents = await axios.get(
          "/api/getTagForSearchEvent/" + this.state.value
        );
        this.setState({ isLoading: true })
        if (respPlaces.status === 200) {
            this.setState({
                // isLoading: false,
                resultPlaces: respPlaces.data,                
            });
        }      
        if (respEvents.status === 200) {
            this.setState({
                // isLoading: false,                
                resultEvents: respEvents.data,                
            });
        }        
        if (respTagPlaces.status === 200) {
          this.setState({
              // isLoading: false,             
              resultTagPlaces: respTagPlaces.data,             
          });
        }      
        if (respTagEvents.status === 200) {
          this.setState({
              open: false,             
              resultTagEvents: respTagEvents.data       
          });
        }        
    };



    handleOnChange = key => e => {
        this.setState({ [key]: e.target.value })
    }
    render() {
        return (
            <div >
              <LoadingScreen open={this.state.open} />
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
                <p className="inputScarch">แท็กสถานที่</p>
                <div>
                    <Card.Group itemsPerRow={4} centered >
                        { this.state.resultTagPlaces.map((data, index) => (
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
                <p className="inputScarch">แท็กอีเว้นท์</p>
                <div>
                    <Card.Group itemsPerRow={4} centered >
                        { this.state.resultTagEvents.map((data, index) => (
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
