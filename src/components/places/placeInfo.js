import React from "react";
import "semantic-ui-css/semantic.min.css";
import "../../static/home.css";
import Modal from "react-responsive-modal";
import { Message, Card, Image, Grid } from "semantic-ui-react";

const PlaceInfo = props => (
  <div>
      <Card.Group itemsPerRow={4}>
        {props.images.map((src, index) => (
          <Card key={index} className="showCard">
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
      <div className="container fluid">
          <p className="desc">{props.placeDes}</p>
    </div>
    <Grid>
      <Grid.Column width={8}>
        <div>{props.renderComment()}</div>
      </Grid.Column>
      <Grid.Column width={8}>
        <Message>
          <Grid>
            <Grid.Column width={8}>
              <div>
                <Message.Header className="topoicHeader">
                  {props.placeName}
                </Message.Header>
                <Message.Header className="topoicHeader">
                  วันเปิดทำการ
                </Message.Header>
                <Message.List items={props.days} className="topoicData" />
                <Message.Header className="topoicHeader">
                  เวลาเปิดทำการ
                </Message.Header>
                <p className="topoicData"> {props.openTime}</p>
                <Message.Header className="topoicHeader">
                  เวลาปิดทำการ
                </Message.Header>
                <p className="topoicData"> {props.closeTime}</p>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <Message.Header className="topoicHeader">
                  รายละเอียด
                </Message.Header>
                <p className="topoicData"> ค่าเข้า : {props.fee}</p>
                <p className="topoicData"> ที่จอดรถ : {props.carParking}</p>
                <Message.Header className="topoicHeader">
                  การติดต่อ
                </Message.Header>
                <p className="topoicData"> เบอร์ติดต่อ : {props.tel}</p>
                <Message.Header className="topoicHeader">
                  ประเภทของอีเว้นท์
                </Message.Header>
                <Message.List items={props.tags} />
                <Message.Header className="topoicHeader">
                  สถานที่จัด
                </Message.Header>
                <div>{props.renderMap()}</div>
              </div>
            </Grid.Column>
            {/* <Message className="showData">{props.placeDes}</Message> */}
            {/* <p>{props.placeDes}</p> */}
          </Grid>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
 
);
export default PlaceInfo;
