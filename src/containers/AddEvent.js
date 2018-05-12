import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import { Form } from 'formsy-semantic-ui-react'
import EventForm from '../components/event/EventForm'
import axios from '../lib/axios';
class AddEvent extends Component {
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
        placesData: [],
        PlaceId:''
    }

    setField = (field, value) => {
        this.setState({ [field]: value })
        console.log(field + " : " + value)
    }

    DeletePhotoUploaded = async (field,value,index)=>{
        const src = value
        await  axios.get('/api/deleteEventImage/'+src)
        const arr = this.state.FileList
        console.log("BEFORE : ",arr)
        arr.splice(index,1)
        console.log("AFTER : ",arr)
        this.setState({FileList:arr})
    }

    getPlaceDetail = async()=>{
        const resp = await axios.get("/api/getPlaceInfo")
        this.setState({ placesData: resp.data })
    }

    GetFileUploaded = async (field, value) => {
        var arr = []
        for (var x = 0; x < value.length; x++) {
            arr.push("http://localhost:3030/images/events/"+value[x].name)
        }
        // this.setState({FileList:arr})
        // console.log("FileList : ",this.state.FileList)
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('/api/uploadEventSingleFile', data)
            console.log('upload single file : ', resp)
            this.setState({FileList:arr})
        } else {
            const dataFile = document.getElementById('img')
            for (var y = 0; y < dataFile.files.length; y++) {
                data.append('img', dataFile.files[y])
            }
            const resp = await axios.post('/api/uploadEventMultipleFile', data)
            console.log('upload Multiple file : ',resp)
            this.setState({FileList:arr})
        }

        console.log()


    }
    FeeOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("fee : ", value)
    }

    CarParkingOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("car parking : " + value)
    }

    TagSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.tags)
    }

    PlaceSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.PlaceId)
    }

    DaysSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.days)
    }

    componentDidMount = async () => {
        this.getPlaceDetail()
        // console.log(this.state.placesData)
    }

    CreateEvent = async (event) => {

        const resp = await axios.post('/api/addevent',{
            eventName: this.state.eventName,
            eventDes: this.state.eventDes,
            tel: this.state.tel,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            fee: this.state.fee,
            carParking: this.state.carParking,
            tags: this.state.tags,
            days: this.state.days,
            FileList: this.state.FileList,
            PlaceId: this.state.PlaceId

        })

        //reload for test
        window.location.replace("/")
}

    render() {
        return (
            <div>
                <Header />
                <Form onSubmit={this.CreateEvent}>
                    <EventForm
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
                        placesData={this.state.placesData}

                        setField={this.setField}
                        GetFileUploaded={this.GetFileUploaded}
                        DeletePhotoUploaded={this.DeletePhotoUploaded}
                        TagSelected={this.TagSelected}
                        FeeOption={this.FeeOption}
                        CarParkingOption={this.CarParkingOption}
                        DaysSelected={this.DaysSelected}
                        PlaceSelected={this.PlaceSelected}
                    />
                </Form>
            </div>
        )
    }
}

export default AddEvent