import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Header from '../components/place/Header_Picmeup'
import { Form } from 'formsy-semantic-ui-react'
import FormUpload from '../components/place/TestUploadFile'
import axios from 'axios';

class Home extends Component {

    state = {
        FileList: {},
        Nahee : 'pingpong na heee'
    }

    GetFileUploaded = (field, value) => {
        console.log(value)
        // this.state.FileList.push(value)
        // console.log(value)
        this.setState({ [field] : value })
    }

    CreatePlace = async (event) => {
        // event.preventDefault()
        // event.preventDefault();
        // await axios.get('http://localhost:3030/api/todo')
        var data = new FormData();
        const dataFile = document.getElementById('img')
        let arr = []
        for(var x = 0 ;x<dataFile.files.length;x++){
            console.log(dataFile.files[x])
            arr.push(dataFile.files[x])
        }
        data.append('img',arr)
        const resp = await axios.post('http://localhost:3030/api/uploadFile', data)
        // console.log(event.file)
        console.log(resp)
    }

    render() {
        return (
            <div>
                <h1>
                    <Header />
                    {/* <form action="http://localhost:3030/api/uploadFile" onSubmit={this.CreatePlace} encType="multipath/form-data" method="POST">
                        <FormUpload
                            GetFileUploaded={this.GetFileUploaded}
                        />
                         <Form.Button floated='right' size='big'>สร้างสถานที่</Form.Button>
                    </form> */}
                    <Form onSubmit={this.CreatePlace} encType="multipath/form-data">
                        <FormUpload
                            GetFileUploaded={this.GetFileUploaded}
                        />
                         <Form.Button floated='right' size='big'>สร้างสถานที่</Form.Button>
                    </Form>
                </h1>
            </div>
        )
    }
}

export default Home