import React from 'react'

import { Link } from "react-router-dom";
const albumInfoComponent = (props) => {
    return(
        <div>
            <center>
                <h1>{props.albumName}</h1>
            </center>
            {props.renderImages()}
            <p className="albumDes">
            {props.albumDes}
            </p>
            <p>โดยคุณ : 
            <Link
                    to={{
                      pathname: "/user/",
                      search: props.albumOwner
                    }}
                  >{props.albumOwner}</Link>
            </p>
            {props.renderEditButton()}
            {props.renderComment()}
        </div>
        
    )
} 

export default albumInfoComponent;