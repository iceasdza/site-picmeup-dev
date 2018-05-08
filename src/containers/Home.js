import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios';
class Home extends Component {


    state = {
        placesData: []
    }

    componentDidMount = async () => {
        const resp = await axios.get("http://localhost:3030/api/getPlaceInfo")

        this.setState({ placesData: resp.data })
        // console.log(this.state.placesData)
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