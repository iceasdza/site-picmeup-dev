import React, { Component } from 'react';
import Place_Form from '../components/place/Place_Form'
import { Form } from 'semantic-ui-react'
import axios from 'axios';

class AddPlace extends Component {

    state = {
        placeName: "",
        placeDes: "",
        picPath: "",
        tel: "",
        openTime: "",
        closeTime: "",
        fee: "no",
        carParking: "yes",

        // days: [
        //     { day: 'mon', status: true },
        //     { day: "tue", status: true },
        //     { day: "wed", status: true },
        //     { day: "thu", status: true },
        //     { day: "fri", status: true },
        //     { day: "sat", status: true },
        //     { day: "sun", status: true }
        // ],
        // days: {
        //     mon:{day:'mon',status:"yes"},
        //     tue:{tue:"tue"},
        //     wed:{wed:"wed"},
        //     thu:{thu:"thu"},
        //     fri:{fri:"fri"},
        //     sat:{sat:"yes"},
        //     sun:{sun:"sun"}
        // },
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true,

        tags: [],
        map: {
            latitude: 0,
            longtitude: 0
        }
    }

    FeeOption = (field, value) => {
        this.setState({ [field]: value })
        console.log("fee : " + value)
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
        //monday
        if (value === 'mon' && this.state.mon === true) {
            this.setState({ mon: false })
        } else if (value === 'mon' && this.state.mon === false) {
            this.setState({ mon: true })
        }

        if (value === 'tue' && this.state.tue === true) {
            this.setState({ tue: false })
        } else if (value === 'tue' && this.state.tue === false) {
            this.setState({ tue: true })
        }

        if (value === 'wed' && this.state.wed === true) {
            this.setState({ wed: false })
        } else if (value === 'wed' && this.state.wed === false) {
            this.setState({ wed: true })
        }

        if (value === 'thu' && this.state.thu === true) {
            this.setState({ thu: false })
        } else if (value === 'thu' && this.state.thu === false) {
            this.setState({ thu: true })
        }

        if (value === 'fri' && this.state.fri === true) {
            this.setState({ fri: false })
        } else if (value === 'fri' && this.state.fri === false) {
            this.setState({ fri: true })
        }

        if (value === 'sat' && this.state.sat === true) {
            this.setState({ sat: false })
        } else if (value === 'sat' && this.state.sat === false) {
            this.setState({ sat: true })
        }

        if (value === 'sun' && this.state.sun === true) {
            this.setState({ sun: false })
        } else if (value === 'sun' && this.state.sun === false) {
            this.setState({ sun: true })
        }
    }


    CreatePlace = async (event) => {
        event.preventDefault()

        // alert('test')
        await axios.post('http://localhost:3030/api/todo', {
            placeName: this.state.placeName,
            placeDes: this.state.placeDes,
            tel: this.state.tel,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime,
            fee: this.state.fee,
            carParking: this.state.carParking,
            tags:this.state.tags,
            mon: this.state.mon,
            tue: this.state.tue,
            wed: this.state.wed,
            thu: this.state.thu,
            fri: this.state.fri,
            sat: this.state.sat,
            sun: this.state.sun,
        })

        this.setState({
            placeName: ""
        })

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
                <Form onSubmit={this.CreatePlace}>
                    <Place_Form
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
                    />
                </Form>
            </div>
        )
    }
}

export default AddPlace