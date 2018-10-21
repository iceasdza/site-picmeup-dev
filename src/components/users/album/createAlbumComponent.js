import React from "react";
import Imagecontrol from "../../../containers/imagerender/imagecontrol"
const createAlbumComponent = (props) => {
    return (
        <div className="container fluid">
            {props.renderForm}
            <Imagecontrol files={props.files} DeletePhotoUploaded={props.DeletePhotoUploaded} imageState={props.imageState} handleImageLoaded={props.handleImageLoaded}/>
     
        </div>
    )
}

export default createAlbumComponent