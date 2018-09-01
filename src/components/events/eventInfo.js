import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Message,
  Card,
  Container,
  Header,
  Image,
  Button
} from "semantic-ui-react";
import "../../static/home.css";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";

const EventInfo = props => (
  <div className="EventInfo">
    <Container textAlign="center">
      <Header as="h2">{props.eventName}</Header>
      <p>{props.eventDes}</p>
      <Card.Group itemsPerRow={6}>
        {props.images.map((src, index) => (
          <Card key={index}>
            <Image
              src={src}
              onClick={() => props.onOpenModal(index)}
              className="showImage"
            />
          </Card>
        ))}
        <Modal
          open={props.open}
          onClose={props.onCloseModal}
          center
          animationDuration={500}
        >
          <Image src={props.images[props.index]} />
        </Modal>
      </Card.Group>
      <Message>
        <Message.Header>open day</Message.Header>
        <Message.List items={props.days} />
        <p> Tel. : {props.tel}</p>
        <p> Open time : {props.openTime}</p>
        <p> Close time : {props.closeTime}</p>
        <p> Fee : {props.fee}</p>
        <p> Car parking : {props.carParking}</p>
        <Message.Header>Place</Message.Header>
        <Card>
          <Image src={props.placeImage} />
          {props.placeName}
          <Card.Content>
            <Link
              to={{
                pathname: "/placeInfo",
                state: { id: props.placeId }
              }}
            >
              <Button primary content="View" />
            </Link>
          </Card.Content>
        </Card>
        <Message.Header>Tags</Message.Header>
        <Message.List items={props.tags} />
      </Message>
    </Container>
  </div>
);
export default EventInfo;
