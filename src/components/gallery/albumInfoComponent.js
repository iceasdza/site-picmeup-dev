import React from 'react'

const albumInfoComponent = (props) => {
    return(
        <div>
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