import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import EventDetail from '../components/event/EventInfo'
import axios from '../lib/axios';

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
        FileList: [],
        id:"",
        placeId:"",
        placeFileList:"",
        placeName:""
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
            placeId:data.PlaceId
        })
        const place = await axios.get("/api/getPlaceInfoFromId/"+this.state.placeId)
        const placeData = place.data[0]
        this.setState({
            placeName:placeData.placeName,
            placeFileList:placeData.FileList[0]
        })

        console.log(this.state)
    }




    componentDidMount =  () => {
            this.getData()

            console.log(this.state.placeFileList)
    }

    render = () => {
            // console.log(this.props.location.state.id)
            // let _id = this.props.location.state.id
            // this.setState({id:_id})
            // console.log(this.state.id)
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
                FileList={this.state.FileList}
                placeId={this.state.placeId}
                placeFileList={this.state.placeFileList}
                placeName={this.state.placeName}
                />

            </div>
        )
    }
}

export default EventInfo