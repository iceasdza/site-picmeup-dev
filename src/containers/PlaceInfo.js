import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import PlaceDetail from '../components/place/PlaceInfo'
import axios from 'axios';

class PlaceInfo extends Component {

    state = {
        placeName: "",
        placeDes: "",
        tel: "",
        openTime: "",
        closeTime: "",
        fee: "no",
        carParking: "yes",
        days: [],
        tags: [],
        map: {
            latitude: 0,
            longtitude: 0
        },
        FileList: [],
    }

    componentDidMount = async () => {
        const resp = await axios.get("http://localhost:3030/api/getPlaceInfoFromId/5af02108cd34222decf00b7d")
        const data = resp.data[0]
        this.setState({
            placeName: data.placeName,
            placeDes: data.placeDes,
            tel: data.tel,
            openTime: data.openTime,
            closeTime: data.closeTime,
            fee: data.fee,
            carParking: data.carParking,
            days: data.days,
            tags: data.tags,
            FileList: data.FileList
        })
    }

    render() {
        return (
            <div>
                <Header />
                <PlaceDetail/>
                {/* <h1>{this.state.placeName}</h1>
                <h1>{this.state.placeDes}</h1>
                <h1>{this.state.tel}</h1>
                <h1>{this.state.openTime}</h1>
                <h1>{this.state.closeTime}</h1>
                <h1>{this.state.fee}</h1>
                <h1>{this.state.carParking}</h1>
                {this.state.days.map(data => (
                    <h1>{data}</h1>
                ))}
                {this.state.tags.map(data => (
                    <h1>{data}</h1>
                ))}
                {this.state.FileList.map(data => (
                    <img src={data}/>
                ))} */}

            </div>
        )
    }
}

export default PlaceInfo