import React from 'react'

const galleryComponent = (props) => {
    return(
        <div>
            {props.renderGalleryList()}
        </div>
        
    )
} 

export default galleryComponent;