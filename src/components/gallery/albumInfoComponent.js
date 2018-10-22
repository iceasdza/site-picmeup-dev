import React from 'react'

const albumInfoComponent = (props) => {
    return(
        <div>
            {props.renderImages()}
            {props.renderComment()}
        </div>
        
    )
} 

export default albumInfoComponent;