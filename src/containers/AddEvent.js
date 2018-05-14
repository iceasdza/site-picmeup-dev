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
        PlaceId:'',
        FileName: [],
        message:""
    }

    setField = (field, value) => {
        this.setState({ [field]: value })
        console.log(field + " : " + value)
    }

    DeletePhotoUploaded = async (field,value,index)=>{
        const src = value
        console.log("value : ",value)
        await  axios.get('/api/deleteEventImage/'+src)
        const arr = this.state.FileList
        const filesName = this.state.FileName
        console.log("BEFORE : ",arr)
        arr.splice(index,1)
        filesName.splice(index, 1)
        console.log("AFTER : ",arr)
        this.setState({ FileList: arr, FileName: filesName })

        if(arr.length===0){
            this.setState({message:"กรุณาเลือกรูปภาพ"})
        }
    }

    getPlaceDetail = async()=>{
        const resp = await axios.get("/api/getPlaceInfo")
        this.setState({ placesData: resp.data })
    }

    GetFileUploaded = async (field, value) => {
        if(value.length > 0  ){
            this.setState({message:""})
        }
        if(value.length >11){
            this.setState({message:"สามารถอัพโหลดรูปภาพได้มากสุด 12 รูป"})
            return;
        }
        var arr = []
        var names = []
        var today = new Date()
        var date = today.getDay() + today.getMonth() + today.getFullYear() + today.getHours().toString();
        for (var x = 0; x < value.length; x++) {
            arr.push("http://128.199.107.81:3030/images/events/"+ date + "-" + value[x].name)
            // arr.push("http://localhost:3030/images/events/" + date + "-" + value[x].name)
            names.push(date + "-" + value[x].name)
        }
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('/api/uploadEventSingleFile', data)
            console.log('upload single file : ', resp)
            this.setState({ FileList: arr, FileName: names })
        } else {
            const dataFile = document.getElementById('img')
            for (var y = 0; y < dataFile.files.length; y++) {
                data.append('img', dataFile.files[y])
            }
            const resp = await axios.post('/api/uploadEventMultipleFile', data)
            console.log('upload Multiple file : ',resp)
            this.setState({ FileList: arr, FileName: names })
        }

        console.log(this.state.FileName)


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

    onValidSubmit = (formData) => alert(JSON.stringify(formData));

    CreateEvent = async (formData) => {
        this.onValidSubmit
        const lengthOfFile = document.getElementById('img').files.length
        console.log(formData)
        if(lengthOfFile===0){
            this.setState({message:"กรุณาเลือกรูปภาพ"})
            return 
        }
        if(formData.place_name === "" || formData.place_desc === "" || formData.place_tel === "" 
        || formData.place_open === "" || formData.place_close === ""|| formData.day_tag == undefined 
        || formData.place_tag == undefined || formData.place_select === undefined){
            return
        }

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
            PlaceId: this.state.PlaceId,
            FileName: this.state.FileName
        })

        // reload for test
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
                        message={this.state.message}

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