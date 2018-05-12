import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image, Button ,Divider} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Header from '../components/place/Header_Picmeup'
import axios from 'axios';
class Home extends Component {


    state = {
        placesData: [],
        eventData:[]
    }

    getData = async () => {
        const places = await axios.get("http://localhost:3030/api/getPlaceInfo")
        const events = await axios.get("http://localhost:3030/api/GetEventInfo")
        this.setState({ placesData: places.data ,eventData:events.data})
    }

    componentDidMount = async () => {
        this.getData()
        // console.log(this.state.placesData)
    }

    deletePlace = async (event) => {
        const id = event.target.value
        const resp = await axios.delete("http://localhost:3030/api/deletePlaceDataFromId/" + id)
        alert("delete!")
        this.getData()
    }

    deleteEvent = async (event) => {
        const id = event.target.value
        const resp = await axios.delete("http://localhost:3030/api/deleteEventDataFromId/" + id)
        alert('DELETED!')
        this.getData()
    }



    render() {
        return (
            <div>
                <Header/>
                <Divider horizontal>SHORT CUT</Divider>
                <Link to={{pathname : '/addplace'}}><Button primary content="Add place"/></Link>
                <Link to={{pathname : '/addevent' }}><Button primary content="Add event"/></Link>
                <Divider horizontal>PLACE</Divider>
                <Card.Group itemsPerRow={4} >
                    {this.state.placesData.map(data => (
                        <Card>
                            <Image src={data.FileList[0]} />
                            {data.placeName}
                            <Card.Content>
                                {/* <Link to={"/placeInfo/" + data._id}>{data.placeName}</Link> */}

                                <Link to={{
                                    pathname: '/placeInfo',
                                    state: { id: data._id },
                                }} ><Button primary content="View"/></Link>
                                <Link to={{
                                    pathname: '/updatePlace',
                                    state: { id: data._id },
                                }} ><Button primary content="Edit"/></Link>
                                <Button color='red' content="DELETE" value={data._id} onClick={this.deletePlace}/>


                            </Card.Content>
                        </Card>

                    )
                    )}
                </Card.Group>

                 <Divider horizontal>EVENT</Divider>
                 <Card.Group itemsPerRow={4} >
                    {this.state.eventData.map(data => (
                        <Card>
                            <Image src={data.FileList[0]} />
                            {data.eventName}
                            <Card.Content>
                                {/* <Link to={"/placeInfo/" + data._id}>{data.placeName}</Link> */}

                                <Link to={{
                                    pathname: '/eventInfo',
                                    state: { id: data._id },
                                }} ><Button primary content="View"/></Link>
                                <Link to={{
                                    pathname: '/updateEvent',
                                    state: { id: data._id },
                                }} ><Button primary content="Edit"/></Link>
                                <Button color='red' content="DELETE" value={data._id} onClick={this.deleteEvent}/>


                            </Card.Content>
                        </Card>

                    )
                    )}
                </Card.Group>

            </div>
        )
    }
}

export default Home