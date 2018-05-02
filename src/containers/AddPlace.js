import React, { Component } from 'react';
import PlaceForm from '../components/place/Place_Form'
import { Form } from 'formsy-semantic-ui-react'
import Header from '../components/place/Header_Picmeup'
import axios from 'axios';

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
        FileList: [0],
        FileQuantity: 0,
    }


    FeeOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("fee : ", value)
    }

    GetFileUploaded = async (field, value) => {
        this.setState({FileList:[]})
        this.setState({ [field]: value, FileQuantity: value })
        const length = this.state.FileQuantity.length
        console.log(length)
        var arr = []
        for (var x = 0; x < length; x++) {
            // this.state.FileList.push("localhost:3030/images/places/"+this.state.FileQuantity[x].name)
            // this.state.FileList.push("localhost:3030/images/places/"+this.state.FileQuantity[x].name)
            arr.push("localhost:3030/images/places/"+this.state.FileQuantity[x].name)
        }
        // console.log("ARRAY : ",arr)
        // this.state.FileList.push(arr)
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('http://localhost:3030/api/uploadSingleFile', data)
            console.log('upload single file : ', resp)
        } else {
            const dataFile = document.getElementById('img')
            for (var y = 0; y < dataFile.files.length; y++) {
                data.append('img', dataFile.files[y])
            }
            const resp = await axios.post('http://localhost:3030/api/uploadMultipleFile', data)
            console.log('upload Multiple file : ',resp)
        }

        this.setState({FileList:arr})
        console.log("FileList : ",this.state.FileList)

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

            const resp = await axios.post('http://localhost:3030/api/testData',{
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

    }

    setField = (field, value) => {
        this.setState({ [field]: value })
        console.log(field + " : " + value)
    }


    componentDidMount() {
        console.log(this.state.FileList)
    }

    showData = () => {
        alert(this.state.FileQuantity)
    }

    render() {
        return (
            <div>
                {
                    
                }
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
                        mon={this.state.mon}
                        tue={this.state.tue}
                        wed={this.state.wed}
                        thu={this.state.thu}
                        fri={this.state.fri}
                        sat={this.state.sat}
                        sun={this.state.sun}
                        tags={this.state.tags}
                        // pass method
                        TagSelected={this.TagSelected}
                        FeeOption={this.FeeOption}
                        setField={this.setField}
                        CarParkingOption={this.CarParkingOption}
                        DaysSelected={this.DaysSelected}
                        GetFileUploaded={this.GetFileUploaded}
                    />
                </Form>
            </div>
        )
    }
}

export default AddPlace