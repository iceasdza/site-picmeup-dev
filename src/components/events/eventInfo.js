import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Message,
  Card,
  Image,
  Grid,
  Label,
  Icon
} from "semantic-ui-react";
import "../../static/home.css";
// import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";

const EventInfo = props => (
  <div>
    <Message.Header className="topHeader">
    <center>
    <p>
        {props.eventName}
      </p>
    </center>

    </Message.Header>
    <Message.Header className="topHeader">
      <p>สถานที่จัด :
                    <Link
          to={{
            pathname: "/placeInfo",
            search: props.placeId
          }}
        >{props.placeName}</Link>
      </p>
    </Message.Header>

    <div>
      <Card.Group itemsPerRow={4}>
        {props.images.map((src, index) => (
          <Card key={index} className="showCard">
            <Image
              src={src}
              onClick={() => props.modalImage(src)}
              className="showImage"
            />
          </Card>
        ))}
        {/* <Modal
          open={props.open}
          onClose={props.onCloseModal}
          center
          animationDuration={500}
        >
          <Image src={props.images[props.index]} />
        </Modal> */}
      </Card.Group>
      <div className="container fluid">
        <Message.Header className="topoicMainHeader">
          <p>{props.eventName} [มีอะไร]</p>
        </Message.Header>
        <p className="desc">{props.eventDes}</p>
      </div>
    </div>
    <Grid>
      <Grid.Column width={8}>
        <div>
          {props.renderComment()}
        </div>
      </Grid.Column>
      <Grid.Column width={8}>
        <Message>
          <Grid>
            <Grid.Column width={8}>
              <div>
                <Message.Header className="topoicHeader">ช่วงเวลาจัดงาน</Message.Header>
                <p className="topoicData">{props.days}</p>
                <Message.Header className="topoicHeader">เวลาจัดงาน</Message.Header>
                <p className="topoicData"> {props.openTime} - {props.closeTime}</p>
                
                <Message.List items={props.tags} />
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <Message.Header className="topoicHeader">รายละเอียด</Message.Header>
                <p className="topoicData"> ค่าบัตรเข้าร่วมงาน : {props.fee === '-' ? '-' : props.feePrice}</p>
                <Message.Header className="topoicHeader">การติดต่อ</Message.Header>
                <p className="topoicData"> ช่องทางการติดต่อ : {props.content}</p>
              </div>
            </Grid.Column>
          </Grid>
        </Message>
        <Message.Header className="topoicData">ประเภทของอีเว้นท์</Message.Header>
        {props.tags.map((tag, index) => (
          <Label key={index} as='a' image>
          <Link to={{ pathname: "/searchpage" }}>             
          <Icon disabled name='tag' />          
        {tag}
        </Link>
      </Label>         
        ))}          
      </Grid.Column>
    </Grid>    
  </div>
);
export default EventInfo;
