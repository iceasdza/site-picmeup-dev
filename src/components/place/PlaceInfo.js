import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Modal from 'react-responsive-modal';
import { Message, Card, Container, Header, Image } from 'semantic-ui-react'

const PlaceInfo = (props) => (
    <div>
        <Container textAlign='center'>
            <Header as='h2'>{props.placeName}</Header>
            <p>{props.placeDes}</p>
            <Card.Group itemsPerRow={6}>
                {props.FileList.map((src, index) => (
                    <Card>
                        <Card raised image={src} onClick={() => props.onOpenModal("index", index)} />
                        <Modal open={props.open} onClose={props.onCloseModal} center animationDuration={500} >
                            <Image src={props.FileList[props.index]}/>
                        </Modal>

                    </Card>
                ))}
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
)
export default PlaceInfo