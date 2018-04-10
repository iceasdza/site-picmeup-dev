import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Form } from 'semantic-ui-react'

const PlaceForm = (props) => {
    return (
        <div>
            <Form.Group>
                <Form.Input label='DATA' value={props.data} onChange={(e,{value})=> props.handleChange("data",value)} />
                <Form.Input label='TEST' value={props.test} onChange={(e,{value})=> props.handleChange("test",value)}/>
            </Form.Group>
        </div>
        //     <Form>
        //     </Form>
    )
}

export default PlaceForm;