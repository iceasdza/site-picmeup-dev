import React from "react";
import { Dimmer, Loader, Card, Icon, Image, Button } from "semantic-ui-react";
import '../../static/image.css'
const imageControl = props => {
  return (
    <Card.Group itemsPerRow={6}>
      {props.files.map((data, index) => (
        <Card key={index}>
          <Dimmer active={props.imageState}>
            <Loader>โหลดดิ้ง</Loader>
          </Dimmer>
          <div>
          <Image
            onLoad={props.handleImageLoaded}
            src={data}
            className="imageUploadSize"
          />
           <div class="text-block">
           <Button
            color="red"
            onClick={() => props.DeletePhotoUploaded("files", index)}
            className="delImage"
          >
            ลบรูป <Icon name="trash" />
          </Button>
          </div>
          </div>
        </Card>
      ))}
    </Card.Group>
  );
};
export default imageControl;
