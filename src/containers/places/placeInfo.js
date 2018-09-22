import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PlaceDetail from '../../components/places/placeInfo'
import axios from '../../lib/axios';

class PlaceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            images: [],
            id:"",
            open: false,
            index:null
        };
      }

    getData  = async () => {
        
        let _id = this.props.location.search.slice(1)
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
            images: data.images
        })
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
                images={this.state.images}
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