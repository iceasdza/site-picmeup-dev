import React, { Component } from 'react';
import PlaceForm from '../../../components/admin/places/addPlaceForm'
import { Form } from 'formsy-semantic-ui-react'
import Header from '../../../components/header/header'
import axios from '../../../lib/axios';

class AddPlace extends Component {

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
        FileName: [],
        message:"",
        files:[]
        
    }

    // onValidSubmit = (formData) => alert(JSON.stringify(formData));


    FeeOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("fee : ", value)
    }

    DeletePhotoUploaded =(field,index)=>{
    let arr = []
    arr = this.state.files
    arr.splice(index,1)
    this.setState({files:arr})

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

    handleSelectImage=(event)=>{
        const files  = event.target.files
        const arr =[]
        for(var x = 0; x < files.length; x++){
            arr.push(URL.createObjectURL(files[x]))
        }    
        this.setState({
            files:arr
        })
    }


    CreatePlace = async (formData) => {
        // this.onValidSubmit()
        const lengthOfFile = document.getElementById('img').files.length
        var arr = []
        var names = []

        var data = new FormData();

        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            await axios.post('/api/uploadSingleFile', data)
            console.log(dataFile)
            this.setState({ FileList: arr, FileName: dataFile.name })


        }else{
            const dataFile = document.getElementById('img').files
            console.log(dataFile)
            for (var y = 0; y < dataFile.length; y++) {
                data.append('img', dataFile[y])
                names.push(dataFile[y].name)
                
            }
            await axios.post('/api/uploadMultipleFile', data)
            this.setState({ FileList: arr, FileName: names })
        }

        if(lengthOfFile===0){
            this.setState({message:"กรุณาเลือกรูปภาพ"})
            return 
        }
        if(formData.place_name === "" || formData.place_desc === "" || formData.place_tel === "" 
        || formData.place_open === "" || formData.place_close === "" || formData.place_tag === ""
        || formData.place_day === undefined || formData.place_tag === undefined){
            return
        }
        
        await axios.post('/api/addplace', {
            placeName: this.state.placeName,
            placeDes: this.state.placeDes,
            tel: this.state.tel,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            fee: this.state.fee,
            carParking: this.state.carParking,
            tags: this.state.tags,
            days: this.state.days,
            FileList: this.state.FileList,
            FileName: this.state.FileName
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
                        FileList={this.state.FileList}
                        message={this.state.message}
                        files={this.state.files}
                        // pass method
                        TagSelected={this.TagSelected}
                        FeeOption={this.FeeOption}
                        setField={this.setField}
                        CarParkingOption={this.CarParkingOption}
                        DaysSelected={this.DaysSelected}
                        GetFileUploaded={this.GetFileUploaded}
                        DeletePhotoUploaded={this.DeletePhotoUploaded} 
                        handleSelectImage={this.handleSelectImage}
                        
                    />
                </Form>
            </div>
        )
    }
}

export default AddPlace