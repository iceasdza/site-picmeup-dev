import React, { Component } from 'react';
import PlaceForm from '../components/place/PlaceFrom'
import { Form } from 'semantic-ui-react'
class AddPlace extends Component {

    state = {
        data :"",
        test :""
    }

    CreatePlace = () => (
        alert(this.state.data)
    )

    handleChange = (field,value) => {
        this.setState({[field]:value})
        console.log(this.state.data)
    }
    componentDidMount(){
      }
    render() {
        return (
            <div>
                <Form onSubmit={this.CreatePlace}>
                    <PlaceForm
                    data = {this.state.data}
                    test = {this.state.test}
                    handleChange={this.handleChange}
                    />
                </Form>
            </div>
        )
    }
}

export default AddPlace