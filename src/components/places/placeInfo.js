import React from "react";
import "semantic-ui-css/semantic.min.css";
import '../../static/home.css'
import Modal from "react-responsive-modal";
import { Message, Card, Container, Header, Image } from "semantic-ui-react";

const PlaceInfo = props => (
  <div>
    <Container textAlign="center">
      <Header as="h2">{props.placeName}</Header>
      <p>{props.placeDes}</p>
      <Card.Group itemsPerRow={3}>
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
          <Image src={props.images[props.index]}/>
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
        <Message.Header>Tags</Message.Header>
        <Message.List items={props.tags} />
      </Message>
    </Container>
  </div>
);
export default PlaceInfo;
