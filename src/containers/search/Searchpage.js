import React, { Component } from "react";
import { Input, Form, Card } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import '../../static/Scarch.css'
import axios from "../../lib/axios";

class Searchpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            results: [],
            value: ""
        };
    }

    inputScarch = () => {
        return (
            <Input action='Search' placeholder='Search...' value={this.state.value} onChange={this.handleOnChange('value')} />
        )
    }
    getDataForSearch = async () => {
        const resp = await axios.get(
            "/api/getDataForSearch/" + this.state.value
        );
        this.setState({ isLoading: true })
        if (resp.status === 200) {
            this.setState({
                isLoading: false,
                results: resp.data
            });
        }
    };



    handleOnChange = key => e => {
        this.setState({ [key]: e.target.value })
    }
    render() {
        console.log(this.state)
        return (
            <div >
                <Form className="inputScarch" onSubmit={this.getDataForSearch}>
                    {this.inputScarch()}
                </Form>
                <div>
                    <Card.Group itemsPerRow={4} centered >
                        { this.state.results.map((data, index) => (
                            <Card key={index} >
                                <Card.Content>
                                    <Link
                                        to={{
                                            pathname: "/placeInfo/",
                                            search: data._id
                                        }}
                                    >
                                        <h3 className="showhotname">{data.placeName}</h3>
                                        <p className="description">{data.placeDes}</p>
                                    </Link>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </div>
            </div>
        )
    }
}
export default Searchpage
