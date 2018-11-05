import React from 'react'

const galleryComponent = (props) => {
    return(
        <div>
            {props.renderCreateAlbumButton()}
            {props.renderGalleryList()}
        </div>
        
    )
} 

export default galleryComponent;