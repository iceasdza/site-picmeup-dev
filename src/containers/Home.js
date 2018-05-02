import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import { Form } from 'formsy-semantic-ui-react'
import FormUpload from '../components/place/TestUploadFile'
import axios from 'axios';

class Home extends Component {

    state = {
        FileList: {},
        Nahee: 'pingpong na heee'
    }

    // GetFileUploaded = (field, value) => {
    //     console.log(value)
    //     // this.state.FileList.push(value)
    //     // console.log(value)
    //     this.setState({ [field] : value })
    // }

    CreatePlace = async (event) => {
        var data = new FormData();
        const lengthOfFile = document.getElementById('img').files.length
        if (lengthOfFile === 1) {
            const dataFile = document.getElementById('img').files[0]
            data.append('img', dataFile)
            const resp = await axios.post('http://localhost:3030/api/uploadSingleFile', data)
            console.log('upload single file : ', resp)
        } else {
            var arr = []
            const dataFile = document.getElementById('img')
            for (var x = 0; x < dataFile.files.length; x++) {
                data.append('img', dataFile.files[x])
            }
            const resp = await axios.post('http://localhost:3030/api/uploadMultipleFile', data)
            console.log('upload Multiple file : ',resp)
        }
    }


    render() {
        return (
            <div>
                <h1>
                    <Header />
                    <Form onSubmit={this.CreatePlace} encType="multipath/form-data">
                        <FormUpload
                        // GetFileUploaded={this.GetFileUploaded}
                        />
                        <Form.Button floated='right' size='big'>สร้างสถานที่</Form.Button>
                    </Form>
                </h1>
            </div>
        )
    }
}

export default Home