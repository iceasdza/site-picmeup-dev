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
        id:""
    }

    getData  = async () => {
        let _id = this.props.location.state.id

        const resp = await axios.get("http://localhost:3030/api/getPlaceInfoFromId/"+_id)
        console.log(_id)
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

    componentDidMount =  () => {
            this.getData()
    }

    render = () => {
            // console.log(this.props.location.state.id)
            // let _id = this.props.location.state.id
            // this.setState({id:_id})
            // console.log(this.state.id)
        return (
            <div>
                <Header />
                <PlaceDetail
                placeName={this.state.placeName}
                placeDes={this.state.placeDes}
                tel={this.state.tel}
                openTime={this.state.openTime}
                closeTime={this.state.closeTime}
                fee={this.state.fee}
                carParking={this.state.carParking}
                days={this.state.days}
                tags={this.state.tags}
                FileList={this.state.FileList}
                />

            </div>
        )
    }
}

export default PlaceInfo