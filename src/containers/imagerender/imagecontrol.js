import React from "react";
import { Dimmer, Loader, Card, Icon, Image } from "semantic-ui-react";

const  imageControl = props => {
            return (
            <Card.Group itemsPerRow={6}>
                {props.files.map((data, index) => (
                    <Card key={index}>
                        <div>
                            <Icon
                                circular
                                inverted
                                name="remove"
                                color="red"
                                onClick={() => props.DeletePhotoUploaded("files", index)}
                            />
                        </div>
                        <Dimmer active={props.imageState}>
                <Loader >
                  โหลดดิ้ง
                </Loader>
              </Dimmer>
            <Image
              onLoad={props.handleImageLoaded}
              src={data}
              className="imageUploadSize"
            />
                    </Card>
                ))}
            </Card.Group>
            // <div>
            //     {props.files.map((data,index)=>(
            //         <div>
            //             <img 
            //             src={data}
            //             />
            //         </div>
            //     ))}
            // </div>
        )
        
    
}
export default imageControl;

