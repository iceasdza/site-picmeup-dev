import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Message,
  Card,
  Image,
  Grid,
  Label,
  Icon,
  Segment,
  Responsive
} from "semantic-ui-react";
import "../../static/home.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
let settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const EventInfo = props => (
  <div>
    <Segment.Group>
      <Responsive as={Segment} minWidth={0} maxWidth={767}>
        <center>
          <h1>{props.eventName}</h1>
          <p>
            สถานที่จัด :
            <Link
              to={{
                pathname: "/placeInfo",
                search: props.placeId
              }}
            >
              {props.placeName}
            </Link>
          </p>
        </center>
        <br />
        <Slider {...settings}>
          {props.images.map((src, index) => (
            <Card key={index} className="showCard">
              <Image
                src={src}
                onClick={() => props.modalImage(src)}
                className="showImage"
              />
            </Card>
          ))}
        </Slider>
        <br />
        <center>
          <p>{props.eventName} [มีอะไร]</p>
          <p className="desc">{props.eventDes}</p>
            <div className="infomationDiv">
              <Message.Header className="topoicHeader">
                ช่วงเวลาจัดงาน
              </Message.Header>
              <p className="topoicData">{props.days}</p>
              <Message.Header className="topoicHeader">
                เวลาจัดงาน
              </Message.Header>
              <p className="topoicData">
                {" "}
                {props.openTime} - {props.closeTime}
              </p>
              {props.tags.map((tag, index) => (
              <Label key={index} as="a" image>
                <Link to={{ pathname: "/searchpage", state: { passtag: tag } }}>
                  <Icon disabled name="tag" />
                  {tag}
                </Link>
              </Label>
            ))}
            </div>
        </center>
        <div>{props.renderComment()}</div>
      </Responsive>

      {/* up size!!!! */}
      <Responsive as={Segment} minWidth={767}>
        <Message.Header className="topHeader">
          <center>
            <p>{props.eventName}</p>
          </center>
        </Message.Header>
        <Message.Header className="topHeader">
          <p>
            สถานที่จัด :
            <Link
              to={{
                pathname: "/placeInfo",
                search: props.placeId
              }}
            >
              {props.placeName}
            </Link>
          </p>
        </Message.Header>
        <div>
          <Card.Group itemsPerRow={4} className="imageInfoCard">
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
              <p>{props.eventName} [มีอะไร]</p>
            </Message.Header>
            <p className="desc">{props.eventDes}</p>
          </div>
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
                      ช่วงเวลาจัดงาน
                    </Message.Header>
                    <p className="topoicData">{props.days}</p>
                    <Message.Header className="topoicHeader">
                      เวลาจัดงาน
                    </Message.Header>
                    <p className="topoicData">
                      {" "}
                      {props.openTime} - {props.closeTime}
                    </p>

                    <Message.List items={props.tags} />
                  </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <div>
                    <Message.Header className="topoicHeader">
                      รายละเอียด
                    </Message.Header>
                    <p className="topoicData">
                      {" "}
                      ค่าบัตรเข้าร่วมงาน :{" "}
                      {props.fee === "-" ? "-" : props.feePrice}
                    </p>
                    <Message.Header className="topoicHeader">
                      การติดต่อ
                    </Message.Header>
                    <p className="topoicData">
                      {" "}
                      ช่องทางการติดต่อ : {props.content}
                    </p>
                  </div>
                </Grid.Column>
              </Grid>
            </Message>
            <Message.Header className="topoicData">
              ประเภทของอีเว้นท์
            </Message.Header>
            {props.tags.map((tag, index) => (
              <Label key={index} as="a" image>
                <Link to={{ pathname: "/searchpage", state: { passtag: tag } }}>
                  <Icon disabled name="tag" />
                  {tag}
                </Link>
              </Label>
            ))}
          </Grid.Column>
        </Grid>
      </Responsive>
    </Segment.Group>
  </div>
);
export default EventInfo;
