import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image, Button, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Header from '../components/place/Header_Picmeup'
import axios from '../lib/axios';
class Home extends Component {


    state = {
        placesData: [],
        eventData: [],
        open: false,
        targetId: "",
        FileName:[]
    }

    getData = async () => {
        const places = await axios.get("/api/getPlaceInfo")
        const events = await axios.get("/api/GetEventInfo")
        this.setState({ placesData: places.data, eventData: events.data })
    }

    componentDidMount = async () => {
        this.getData()
        // console.log(this.state.placesData)
    }

    deletePlace = async (event) => {
        const index = event.target.value
        const data = this.state.placesData[index]
        const id = data._id
        await axios.post("/api/deletePlaceDataFromId/"+id,{
           FileName : data.FileName
        })
        
        this.getData()
    }

    deleteEvent = async (event) => {
        const index = event.target.value
        const data = this.state.eventData[index]
        const id = data._id
        await axios.post("/api/deleteEventDataFromId/"+id,{
            FileName : data.FileName
         })
         this.getData()
    }

    render() {
        return (
            <div>

                <Header />
                <Divider horizontal>SHORT CUT</Divider>
                <Link to={{ pathname: '/addplace' }}><Button primary content="Add place" /></Link>
                <Link to={{ pathname: '/addevent' }}><Button primary content="Add event" /></Link>
                <Link to={{ pathname: '/register' }}><Button primary content="Register" /></Link>
                <Divider horizontal>PLACE</Divider>

                <Card.Group itemsPerRow={4} >
                    {this.state.placesData.map((data,index) => (
                        <Card key={index}>
                            <Image src={"http://localhost:3030/images/places/"+data.FileName[0]} />
                            {data.placeName}
                            <Card.Content>
                                {/* <Link to={"/placeInfo/" + data._id}>{data.placeName}</Link> */}

                                <Link to={{
                                    pathname: '/placeInfo',
                                    state: { id: data._id },
                                }} ><Button primary content="View" /></Link>
                                <Link to={{
                                    pathname: '/updatePlace',
                                    state: { id: data._id },
                                }} ><Button primary content="Edit" /></Link>
                                <Button color='red' content="DELETE" value={index} onClick={this.deletePlace} />
                            </Card.Content>
                        </Card>


                    )
                    )}
                </Card.Group>
                <Divider horizontal>EVENT</Divider>
                <Card.Group itemsPerRow={4} >
                    {this.state.eventData.map((data,index) => (
                        <Card>
                            <Image src={data.FileList[0]} />
                            {data.eventName}
                            <Card.Content>
                                {/* <Link to={"/placeInfo/" + data._id}>{data.placeName}</Link> */}

                                <Link to={{
                                    pathname: '/eventInfo',
                                    state: { id: data._id },
                                }} ><Button primary content="View" /></Link>
                                <Link to={{
                                    pathname: '/updateEvent',
                                    state: { id: data._id },
                                }} ><Button primary content="Edit" /></Link>
                                <Button color='red' content="DELETE" value={index} onClick={this.deleteEvent} />


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