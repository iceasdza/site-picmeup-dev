import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../../../components/header/header'
import PlaceEdit from '../../../components/admin/places/placeEditForm'
import { Form } from 'formsy-semantic-ui-react'
import axios from '../../../lib/axios';

class Home extends Component {

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
        images: [],
        id: "",
        FileName: [],
        message:""
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

    DaysSelected = (field, value) => {
        this.setState({ [field]: value })
        console.log(this.state.days)
    }

    getData = async () => {
        let _id = this.props.location.state.id
        const resp = await axios.get("/api/getPlaceInfoFromId/" + _id)
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
            id: _id,
            images: data.images
        })
    }

    setField = (field, value) => {
        this.setState({ [field]: value })
        console.log(field + " : " + value)
    }

    DeleteImage = async (index) => {
        const images = this.state.images
        images.splice(index, 1)
        this.setState({images:images})

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
            arr.push("http://128.199.107.81:3030/images/places/"+ date + "-" + value[x].name)
            // arr.push("http://localhost:3030/images/places/" + date + "-" + value[x].name)
            names.push(date + "-" + value[x].name)
        }
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('/api/uploadSingleFile', data)
            console.log('upload single file : ', resp)
            this.setState({ FileList: arr, FileName: names })
        } else {
            const dataFile = document.getElementById('img')
            for (var y = 0; y < dataFile.files.length; y++) {
                data.append('img', dataFile.files[y])
            }
            const resp = await axios.post('/api/uploadMultipleFile', data)
            console.log('upload Multiple file : ', resp)
            this.setState({ FileList: arr, FileName: names })
        }


    }

    componentDidMount = () => {
        this.getData()
    }

    onValidSubmit = (formData) => alert(JSON.stringify(formData));

    UpdatePlace = async (formData) => {

        this.onValidSubmit()
        
        const lengthOfFile = this.state.FileList.length

        if(lengthOfFile===0){
            this.setState({message:"กรุณาเลือกรูปภาพ"})
            return 
        }
        if(formData.place_name === "" || formData.place_desc === "" || formData.place_tel === "" 
        || formData.place_open === "" || formData.place_close === ""|| formData.day_tag === undefined 
        || formData.place_tag === undefined){
            return
        }

        const date = new Date();
        await axios.put('/api/UpdatePlaceFromId/' + this.state.id, {
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
            editor: "Patis editor",
            edit_date: date,
            images:this.state.images
        })

        //reload for test
        window.location.replace("/")
    }



    render() {
        return (
            <div>
                <Header />
                <Form onSubmit={this.UpdatePlace}>
                    <PlaceEdit
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
                        message={this.state.message}

                        TagSelected={this.TagSelected}
                        FeeOption={this.FeeOption}
                        setField={this.setField}
                        CarParkingOption={this.CarParkingOption}
                        DaysSelected={this.DaysSelected}
                        GetFileUploaded={this.GetFileUploaded}
                        DeleteImage={this.DeleteImage}
                    />
                </Form>
            </div>
        )
    }
}

export default Home