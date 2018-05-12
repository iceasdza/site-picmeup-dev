import React, { Component } from 'react';
import PlaceForm from '../components/place/Place_Form'
import { Form } from 'formsy-semantic-ui-react'
import Header from '../components/place/Header_Picmeup'
import axios from '../lib/axios';

class AddPlace extends React.Component {
    
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


    FeeOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("fee : ", value)
    }

    DeletePhotoUploaded = async (field,value,index)=>{
        const src = value
        await  axios.get('/api/deleteImage/'+src)
        const arr = this.state.FileList
        console.log("BEFORE : ",arr)
        arr.splice(index,1)
        console.log("AFTER : ",arr)
        this.setState({FileList:arr})
    }

    GetFileUploaded = async (field, value) => {
        var arr = []
        for (var x = 0; x < value.length; x++) {
            arr.push("http://128.199.107.81:3030/images/places/"+value[x].name)
        }
        // this.setState({FileList:arr})
        // console.log("FileList : ",this.state.FileList)
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('/api/uploadSingleFile', data)
            console.log('upload single file : ', resp)
            this.setState({FileList:arr})
        } else {
            const dataFile = document.getElementById('img')
            for (var y = 0; y < dataFile.files.length; y++) {
                data.append('img', dataFile.files[y])
            }
            const resp = await axios.post('/api/uploadMultipleFile', data)
            console.log('upload Multiple file : ',resp)
            this.setState({FileList:arr})
        }


    }

    CarParkingOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("car parking : " + value)
    }

    TagSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.tags)
    }

    DaysSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.days)
    }


    CreatePlace = async (event) => {

            const resp = await axios.post('/api/addplace',{
                placeName: this.state.placeName,
                placeDes: this.state.placeDes,
                tel: this.state.tel,
                openTime: this.state.openTime,
                closeTime: this.state.closeTime,
                fee: this.state.fee,
                carParking: this.state.carParking,
                tags: this.state.tags,
                days: this.state.days,
                FileList: this.state.FileList
            })

            //reload for test
            window.location.replace("/")
    }

    setField = (field, value) => {
        this.setState({ [field]: value })
        console.log(field + " : " + value)
    }


    componentDidMount() {
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <Header />
                <Form onSubmit={this.CreatePlace}>
                    <PlaceForm
                        // passing value
                        placeName={this.state.placeName}
                        placeDes={this.state.placeDes}
                        tel={this.state.tel}
                        openTime={this.state.openTime}
                        closeTime={this.state.closeTime}
                        fee={this.state.fee}
                        carParking={this.state.carParking}
                        days={this.state.days}
                        tags={this.state.tags}
                        FileList= {this.state.FileList}
                        // pass method
                        TagSelected={this.TagSelected}
                        FeeOption={this.FeeOption}
                        setField={this.setField}
                        CarParkingOption={this.CarParkingOption}
                        DaysSelected={this.DaysSelected}
                        GetFileUploaded={this.GetFileUploaded}
                        DeletePhotoUploaded={this.DeletePhotoUploaded}
                    />
                </Form>
            </div>
        )
    }
}

export default AddPlace