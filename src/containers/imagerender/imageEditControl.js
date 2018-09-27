import React from "react";
import { Dimmer, Loader, Card, Icon, Image } from "semantic-ui-react";

const imageControl = props => {
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
            <Loader>โหลดดิ้ง</Loader>
          </Dimmer>
          <Image
            onLoad={props.handleImageLoaded}
            src={data}
            className="imageUploadSize"
          />
        </Card>
      ))}
      {props.images.map((src, index) => (
        <Card key={index}>
          <div>
            <Icon
              circular
              inverted
              name="remove"
              color="red"
              onClick={() => props.DeleteImage(index)}
            />
          </div>
          <Dimmer active={props.imageState}>
            <Loader>โหลดดิ้ง</Loader>
          </Dimmer>
          <Image
            onLoad={props.handleImageLoaded}
            src={src}
            className="imageUploadSize"
          />
        </Card>
      ))}
    </Card.Group>
  );
};
export default imageControl;
