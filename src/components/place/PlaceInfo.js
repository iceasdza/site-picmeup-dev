import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form } from 'formsy-semantic-ui-react'

const PlaceInfo = (props) => (
    <div className = "PlaceInfo">
            TEST
            {props.placeName}
            {props.placeDes}
    </div>
)
export default PlaceInfo