import React from 'react'

const albumInfoComponent = (props) => {
    return(
        <div>
            {props.renderImages()}
            {props.albumDes}
            {props.renderComment()}
        </div>
        
    )
} 

export default albumInfoComponent;