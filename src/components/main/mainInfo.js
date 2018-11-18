import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Button, Segment, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/showdata.css";
import Cookies from "js-cookie";
import "../../static/home.css";
import Slider from "react-slick";
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
const user = Cookies.get("user");
const mainInfo = props => {
  return (
    <div>
      <Segment.Group>
        <Responsive as={Segment} minWidth={0} maxWidth={767}>
          <div className="bannerMobile">
            <p className="headersActivityMobile">"{props.activityText}"</p>
            <center>
              <Slider {...settings}>
                {props.recomendPlace.map((data, index) => (
                  <Card key={index} className="showhotcardMobile">
                    <Link
                      to={{
                        pathname: "/placeInfo/",
                        search: data._id
                      }}
                    >
                      <Image src={data.images[0]} className="showhotimage" />
                      <div class="text-block">
                        <h3 className="showhotname">{data.placeName}</h3>
                        <p className="description">{data.placeDes}</p>
                        <p className="extraDetail">
                          เข้าชม {data.viewCount}
                          แสดงความคิดเห็น {data.comments.length}
                        </p>
                        {user === "admin" ? (
                          <div className="manageBtn">
                            <br />{" "}
                            <Link
                              to={{
                                pathname: "/updatePlace",
                                state: { id: data._id }
                              }}
                            >
                              <Button
                                primary
                                content="แก้ไข"
                                icon="edit"
                                className="homeBtn"
                                size="mini"
                              />
                            </Link>{" "}
                            <Button
                              icon="trash"
                              size="mini"
                              className="homeBtn"
                              color="red"
                              content="ลบ"
                              value={index}
                              onClick={e =>
                                props.removeData(
                                  "place",
                                  data._id,
                                  data.placeName
                                )
                              }
                            />
                          </div>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}
              </Slider>

              <div className="contentMobile">
                <p className="headers">อีเว้นท์ร้อนแรง</p>
                <Slider {...settings}>
                  {props.hotEvents.map((data, index) =>
                    index < 3 ? (
                      <Card key={index} className="showhotcardMobile">
                        <Link
                          to={{
                            pathname: "/eventInfo/",
                            search: data._id
                          }}
                        >
                          <Image
                            src={data.images[0]}
                            className="showhotimage"
                          />
                          <div class="text-block">
                            <h3 className="showhotname">{data.eventName}</h3>
                            <p className="description">{data.eventDes}</p>
                            <p className="extraDetail">
                              เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                              {data.comments.length}
                            </p>
                            {user === "admin" ? (
                              <div className="manageBtn">
                                {" "}
                                <Link
                                  to={{
                                    pathname: "/updateEvent",
                                    state: { id: data._id }
                                  }}
                                >
                                  <Button
                                    primary
                                    content="แก้ไข"
                                    icon="edit"
                                    className="homeBtn"
                                    size="mini"
                                  />
                                </Link>
                                <Button
                                  color="red"
                                  content="ลบ"
                                  icon="trash"
                                  size="mini"
                                  className="homeBtn"
                                  value={index}
                                  onClick={e =>
                                    props.removeData(
                                      "event",
                                      data._id,
                                      data.eventName
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <span />
                            )}
                          </div>
                        </Link>
                      </Card>
                    ) : (
                      <p key={index} />
                    )
                  )}
                </Slider>
              </div>

              <div className="contentMobile">
                  <p className="headers">สถานที่สุดฮอต</p>
                  <Slider {...settings}>
                    {props.hotPlaces.map((data, index) =>
                      index < 3 ? (
                        <Card key={index} className="showhotcardMobile">
                          <Link
                            to={{
                              pathname: "/placeInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.placeName}</h3>
                              <p className="description">{data.placeDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updatePlace",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "place",
                                        data._id,
                                        data.placeName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                      ) : (
                        <p key={index} />
                      )
                    )}
                    </Slider>
                </div>

                      <div className="contentMobile">
                  <p className="headers">อีเว้นท์ใหม่</p>
                  <Slider {...settings}>
                    {props.eventData.map((data, index) =>
                        <Card key={index} className="showhotcardMobile">
                          <Link
                            to={{
                              pathname: "/eventInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.eventName}</h3>
                              <p className="description">{data.eventDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updateEvent",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "event",
                                        data._id,
                                        data.eventName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                    )}
                  </Slider>
                </div>
                
                <div className="contentMobile">
                  <p className="headers">สถานที่ใหม่</p>
                  <Slider {...settings}>
                    {props.placesData.map((data, index) =>
                        <Card key={index} className="showhotcardMobile">
                          <Link
                            to={{
                              pathname: "/placeInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.placeName}</h3>
                              <p className="description">{data.placeDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updatePlace",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "event",
                                        data._id,
                                        data.placeName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                    )}
                 </Slider>
                </div>

            </center>
          </div>
        </Responsive>

        {/* upsize to ipad */}
        <Responsive as={Segment} minWidth={767}>
          <div className="banner">
            <h1 className="bannerHeader">
              ออกไปค้นหาและแบ่งปันประสบการณ์ร่วมกับผู้อื่น
              <br />
            </h1>
            <center>
              <p className="headersActivity">"{props.activityText}"</p>
            </center>
            <Card.Group
              itemsPerRow={4}
              centered
              className="showframe activityItems"
            >
              {props.recomendPlace.map((data, index) => (
                <Card key={index} className="showcard">
                  <Link
                    to={{
                      pathname: "/placeInfo/",
                      search: data._id
                    }}
                  >
                    <Image src={data.images[0]} className="showhotimage" />
                    <div class="text-block">
                      <h3 className="showhotname">{data.placeName}</h3>
                      <p className="description">{data.placeDes}</p>
                      <p className="extraDetail">
                        เข้าชม {data.viewCount}
                        แสดงความคิดเห็น {data.comments.length}
                      </p>
                      {user === "admin" ? (
                        <div className="manageBtn">
                          <br />{" "}
                          <Link
                            to={{
                              pathname: "/updatePlace",
                              state: { id: data._id }
                            }}
                          >
                            <Button
                              primary
                              content="แก้ไข"
                              icon="edit"
                              className="homeBtn"
                              size="mini"
                            />
                          </Link>{" "}
                          <Button
                            icon="trash"
                            size="mini"
                            className="homeBtn"
                            color="red"
                            content="ลบ"
                            value={index}
                            onClick={e =>
                              props.removeData(
                                "place",
                                data._id,
                                data.placeName
                              )
                            }
                          />
                        </div>
                      ) : (
                        <span />
                      )}
                    </div>
                  </Link>
                </Card>
              ))}
            </Card.Group>
            <div className="backgroundContent">
              <div className="component">
                <p className="headers">อีเว้นท์ร้อนแรง</p>
                <Card.Group itemsPerRow={3} centered className="showhotframe">
                  {props.hotEvents.map((data, index) =>
                    index < 3 ? (
                      <Card key={index} className="showhotcard">
                        <Link
                          to={{
                            pathname: "/eventInfo/",
                            search: data._id
                          }}
                        >
                          <Image
                            src={data.images[0]}
                            className="showhotimage"
                          />
                          <div class="text-block">
                            <h3 className="showhotname">{data.eventName}</h3>
                            <p className="description">{data.eventDes}</p>
                            <p className="extraDetail">
                              เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                              {data.comments.length}
                            </p>
                            {user === "admin" ? (
                              <div className="manageBtn">
                                {" "}
                                <Link
                                  to={{
                                    pathname: "/updateEvent",
                                    state: { id: data._id }
                                  }}
                                >
                                  <Button
                                    primary
                                    content="แก้ไข"
                                    icon="edit"
                                    className="homeBtn"
                                    size="mini"
                                  />
                                </Link>
                                <Button
                                  color="red"
                                  content="ลบ"
                                  icon="trash"
                                  size="mini"
                                  className="homeBtn"
                                  value={index}
                                  onClick={e =>
                                    props.removeData(
                                      "event",
                                      data._id,
                                      data.eventName
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <span />
                            )}
                          </div>
                        </Link>
                      </Card>
                    ) : (
                      <p key={index} />
                    )
                  )}
                </Card.Group>
              </div>

              <center>
                <div className="component">
                  <p className="headers">สถานที่สุดฮอต</p>
                  <Card.Group itemsPerRow={3} centered className="showhotframe">
                    {props.hotPlaces.map((data, index) =>
                      index < 3 ? (
                        <Card key={index} className="showhotcard">
                          <Link
                            to={{
                              pathname: "/placeInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.placeName}</h3>
                              <p className="description">{data.placeDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updatePlace",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "place",
                                        data._id,
                                        data.placeName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                      ) : (
                        <p key={index} />
                      )
                    )}
                  </Card.Group>
                </div>
              </center>

              <center>
                <div className="component">
                  <p className="headers">อีเว้นท์ใหม่</p>
                  <Card.Group itemsPerRow={5} centered className="showframe">
                    {props.eventData.map((data, index) =>
                      index < 10 ? (
                        <Card key={index} className="showhotcard">
                          <Link
                            to={{
                              pathname: "/eventInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.eventName}</h3>
                              <p className="description">{data.eventDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updateEvent",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "event",
                                        data._id,
                                        data.eventName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                      ) : (
                        <p />
                      )
                    )}
                  </Card.Group>
                </div>
              </center>

              <center>
                <div className="component">
                  <p className="headers">สถานที่ใหม่</p>
                  <Card.Group itemsPerRow={5} centered className="showframe">
                    {props.placesData.map((data, index) =>
                      index < 10 ? (
                        <Card key={index} className="showhotcard">
                          <Link
                            to={{
                              pathname: "/placeInfo/",
                              search: data._id
                            }}
                          >
                            <Image
                              src={data.images[0]}
                              className="showhotimage"
                            />
                            <div class="text-block">
                              <br />

                              <h3 className="showhotname">{data.placeName}</h3>
                              <p className="description">{data.placeDes}</p>
                              <p className="extraDetail">
                                เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                                {data.comments.length}
                              </p>
                              {user === "admin" ? (
                                <div className="manageBtn">
                                  {" "}
                                  <Link
                                    to={{
                                      pathname: "/updatePlace",
                                      state: { id: data._id }
                                    }}
                                  >
                                    <Button
                                      primary
                                      content="แก้ไข"
                                      icon="edit"
                                      className="homeBtn"
                                      size="mini"
                                    />
                                  </Link>
                                  <Button
                                    color="red"
                                    content="ลบ"
                                    icon="trash"
                                    size="mini"
                                    className="homeBtn"
                                    value={index}
                                    onClick={e =>
                                      props.removeData(
                                        "place",
                                        data._id,
                                        data.placeName
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span />
                              )}
                            </div>
                          </Link>
                        </Card>
                      ) : (
                        <p key={index} />
                      )
                    )}
                  </Card.Group>
                </div>
              </center>
            </div>
          </div>
        </Responsive>
      </Segment.Group>
    </div>
  );
};
export default mainInfo;
