import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import "../../static/home.css";
import { Message, Card, Image, Grid,Label,Icon } from "semantic-ui-react";

const PlaceInfo = props => (
  <div>
    <Message.Header className="topHeader">
                  <p>{props.placeName}</p>
                </Message.Header>
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
    </Card.Group>
    <div className="container fluid">
    <Message.Header className="topoicMainHeader">
                  [ทำความรู้จัก]{props.placeName}
                </Message.Header>
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
                  เปิดทำการ
                </Message.Header>
                <p>{props.days}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.openTime} - {props.closeTime}</p>
                <Message.Header className="topoicHeader">
                  รายละเอียด
                </Message.Header>
                {props.fee === 'yes' ? (
                 <p className="topoicData"> ค่าเข้าชม : {props.feePrice}</p>
                ) : (<p className="topoicData"> ค่าเข้าชม : {props.fee}</p>)}               
                {props.carParking === 'yes' ? (
                  <p/>
                ) : <p className="topoicData"> ที่จอดรถ : {props.carParking}</p>}                
                {props.carParking === 'yes' ? (
                  <p className="topoicData"> ขนาดลานจอดรถ : {props.parkingSize}</p>
                ) : (<p />)}
                {props.carParking === 'yes' ? (
                  <p className="topoicData"> ค่าจอดรถ : {props.parkingPrice}</p>
                ) : (<p />)}
                <Message.Header className="topoicHeader">
                  ช่องทางการติดต่อ
                </Message.Header>
                <p className="desc">{props.contact}</p>        
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div>{props.renderMap()}</div>
            </Grid.Column>
          </Grid>
        </Message>
        <Message.Header className="topoicData">ประเภทของสถานที่</Message.Header>
        {props.tags.map((tag, index) => (
          <Label key={index} as='a' image>
          <Link to={{ pathname: "/searchpage", state: { passtag: tag }}}  >             
          <Icon disabled name='tag' />          
        {tag}
        </Link>
      </Label>
      
        ))}        
      </Grid.Column>
    </Grid>
  </div>

);
export default PlaceInfo;
