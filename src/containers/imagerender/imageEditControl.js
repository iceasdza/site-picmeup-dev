import React from "react";
import { Dimmer, Loader, Card, Icon, Image } from "semantic-ui-react";

const imageControl = props => {
  return (
    <Card.Group itemsPerRow={6}>
      {props.files.map((data, index) => (
        <Card key={index}>
          {/* <div>
            <Icon
              circular
              inverted
              name="remove"
              color="red"
              onClick={() => props.DeletePhotoUploaded("files", index)}
            />
          </div> */}
          <Dimmer active={props.imageState}>
            <Loader>โหลดดิ้ง</Loader>
          </Dimmer>
          <div>
            {/* <Button
            color="red"
            onClick={() => props.DeletePhotoUploaded("files", index)}
            className="delImage"
          >
            ลบรูป <Icon name="trash" />
          </Button> */}
            <Image
              onLoad={props.handleImageLoaded}
              src={data}
              className="imageUploadSize"
            />
            <div class="text-block">
              <span
                onClick={() => props.DeletePhotoUploaded("files", index)}
                className="delImageNew"
              >
                ลบรูป <Icon name="trash" />
              </span>
            </div>
          </div>
        </Card>
      ))}
      {props.images.map((src, index) => (
        <Card key={index}>
          <Dimmer active={props.imageState}>
            <Loader>โหลดดิ้ง</Loader>
          </Dimmer>
          <div>
            <Image
              onLoad={props.handleImageLoaded}
              src={src}
              className="imageUploadSize"
            />
            <div class="text-block">
              <span
                color="red"
                onClick={() => props.DeleteImage(index)}
                className="delImageNew"
              >
                ลบรูป <Icon name="trash" />
              </span>
            </div>
          </div>
        </Card>
      ))}
    </Card.Group>
  );
};
export default imageControl;
