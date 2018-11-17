import React from 'react'

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
            {props.renderEditButton()}
            {props.renderComment()}
        </div>
        
    )
} 

export default albumInfoComponent;