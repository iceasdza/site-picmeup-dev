import React from "react";
import { Image, Card, Icon} from "semantic-ui-react";
import "../../../static/Form.css";

const RenderImange = (props) =>{
return(
    <Card.Group itemsPerRow={6}>
    {props.files.map((data, index) => (
      <Card>
        <div>
          <Icon
            circular
            inverted
            name="remove"
            color="red"
            onClick={() => props.DeletePhotoUploaded("files", index)}
          />
        </div>
        <Image
        src={data} className="imageUploadSize" />
      </Card>
    ))}
  </Card.Group>
)
}