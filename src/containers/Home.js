import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios';
class Home extends Component {


    state = {
        placesData: []
    }

    getData = async () =>{
        const resp = await axios.get("http://localhost:3030/api/getPlaceInfo")
        this.setState({ placesData: resp.data })
    }

    componentDidMount = async () => {
        this.getData()
        // console.log(this.state.placesData)
    }
    deletePlace = async (event) =>{
            const id = event.target.value
            const resp = await axios.delete("http://localhost:3030/api/deletePlaceDataFromId/"+id)
            alert("delete!")
            this.getData()
    }



    render() {
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                    {this.state.placesData.map(data => (
                        <Card>
                            <Image src={data.FileList[0]} />
                            {data._id}
                            <Card.Content>
                                {/* <Link to={"/placeInfo/" + data._id}>{data.placeName}</Link> */}

                                <Link to={{
                                    pathname: '/placeInfo',
                                    state: {id: data._id},
                                }} >TEST</Link>

                                <button value={data._id} onClick={this.deletePlace}>DELETE</button>

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