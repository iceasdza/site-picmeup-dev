import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../../components/header/header'
import EventDetail from '../../components/events/eventInfo'
import axios from '../../lib/axios';

class EventInfo extends Component {

    state = {
        eventName: "",
        eventDes: "",
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
        images:[],
        id:"",
        placeId:"",
        placeImage:"",
        placeName:"",
        open: false,
        index:null
    }

    getData  = async () => {
        let _id = this.props.location.state.id
        const resp = await axios.get("/api/getEventInfoFromId/"+_id)
        // console.log(axios)
        const data = resp.data[0]
        this.setState({
            eventName: data.eventName,
            eventDes: data.eventDes,
            tel: data.tel,
            openTime: data.openTime,
            closeTime: data.closeTime,
            fee: data.fee,
            carParking: data.carParking,
            days: data.days,
            tags: data.tags,
            FileList: data.FileList,
            placeId:data.PlaceId,
            images: data.images
        })
        const place = await axios.get("/api/getPlaceInfoFromId/"+this.state.placeId)
        const placeData = place.data[0]
        this.setState({
            placeName:placeData.placeName,
            placeImage:placeData.images[0]
        })

        console.log(this.state)
    }




    componentDidMount =  () => {
            this.getData()

    }

    onOpenModal = (value) => {
        this.setState({ open: true ,index:value})
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

    render = () => {
        return (
            <div>
                <Header />
                <EventDetail
                eventName={this.state.eventName}
                eventDes={this.state.eventDes}
                tel={this.state.tel}
                openTime={this.state.openTime}
                closeTime={this.state.closeTime}
                fee={this.state.fee}
                carParking={this.state.carParking}
                days={this.state.days}
                tags={this.state.tags}
                images={this.state.images}
                placeId={this.state.placeId}
                placeImage={this.state.placeImage}
                placeName={this.state.placeName}
                index = {this.state.index}

                onCloseModal={this.onCloseModal}
                onOpenModal={this.onOpenModal}
                open = {this.state.open}
                />

            </div>
        )
    }
}

export default EventInfo