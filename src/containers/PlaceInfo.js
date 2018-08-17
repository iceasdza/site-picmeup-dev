import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import PlaceDetail from '../components/place/PlaceInfo'
import axios from '../lib/axios';

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
        FileName: [],
        id:"",
        open: false,
    }

    getData  = async () => {
        let _id = this.props.location.state.id
        const resp = await axios.get("/api/getPlaceInfoFromId/"+_id)
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
            FileName: data.FileName
        })
    }

    componentDidMount =  () => {
            this.getData()
    }

    onOpenModal = (field,value) => {
        console.log(value)
        this.setState({ open: true ,index:value});
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };


    render = () => {
        const { open } = this.state;
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
                FileName={this.state.FileName}
                index = {this.state.index}

                onCloseModal={this.onCloseModal}
                onOpenModal={this.onOpenModal}
                open = {this.state.open}
                />

            </div>
        )
    }
}

export default PlaceInfo