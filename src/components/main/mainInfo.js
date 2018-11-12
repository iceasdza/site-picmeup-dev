import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/showdata.css";
import Cookies from "js-cookie";
import "../../static/home.css";
const user = Cookies.get("user");
const mainInfo = props => {
  return (
    <div>
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
          {props.recomendPlace.map(
            (data, index) =>
              index < 10 ? (
                <Card key={index} className="showcard">
                  <Image src={data.images[0]} className="showimage" />
                  <Card.Content>
                    <Link
                      to={{
                        pathname: "/placeInfo/",
                        search: data._id
                      }}
                    >
                      <h3 className="showhotname" title={data.placeName}>
                        {data.placeName}
                      </h3>
                      <p className="description">{data.placeDes}</p>
                    </Link>
                    <Card.Content extra>
                      <p className="extraDetail">
                        เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                        {data.comments.length}
                      </p>
                    </Card.Content>
                    {user === "admin" ? (
                      <div>
                        {" "}
                        <Link
                          to={{
                            pathname: "/updatePlace",
                            state: { id: data._id }
                          }}
                        >
                          <Button primary content="Edit" />
                        </Link>
                        <Button
                          color="red"
                          content="DELETE"
                          value={index}
                          onClick={e =>
                            props.removeData("place", data._id, data.placeName)
                          }
                        />
                      </div>
                    ) : (
                      <p />
                    )}
                  </Card.Content>
                </Card>
              ) : (
                <p key={index} />
              )
          )}
        </Card.Group>
        <div className="backgroundContent">
        <center>
          <div className="component">
            <p className="headers">อีเว้นท์</p>
            <Card.Group itemsPerRow={3} centered className="showhotframe">
              {props.hotEvents.map(
                (data, index) =>
                  index < 3 ? (
                    <Card key={index} className="showhotcard">
                      <Image src={data.images[0]} className="showhotimage" />
                      <Card.Content>
                        <Link
                          to={{
                            pathname: "/eventInfo/",
                            search: data._id
                          }}
                        >
                          <h3 className="showhotname">{data.eventName}</h3>
                          <p className="description">{data.eventDes}</p>
                        </Link>
                        <Card.Content extra>
                          <p className="extraDetail">
                            เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                            {data.comments.length}
                          </p>
                        </Card.Content>
                        {user === "admin" ? (
                          <div>
                            {" "}
                            <Link
                              to={{
                                pathname: "/updateEvent",
                                state: { id: data._id }
                              }}
                            >
                              <Button primary content="Edit" />
                            </Link>
                            <Button
                              color="red"
                              content="DELETE"
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
                          <p />
                        )}
                      </Card.Content>
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
            <p className="headers">สถานที่</p>
            <Card.Group itemsPerRow={3} centered className="showhotframe">
              {props.hotPlaces.map(
                (data, index) =>
                  index < 3 ? (
                    <Card key={index} className="showhotcard">
                      <Image src={data.images[0]} className="showhotimage" />
                      <Card.Content>
                        <Link
                          to={{
                            pathname: "/placeInfo/",
                            search: data._id
                          }}
                        >
                          <h3 className="showhotname">{data.placeName}</h3>
                          <p className="description">{data.placeDes}</p>
                        </Link>
                        <Card.Content extra>
                          <p className="extraDetail">
                            เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                            {data.comments.length}
                          </p>
                        </Card.Content>
                        {user === "admin" ? (
                          <div>
                            {" "}
                            <Link
                              to={{
                                pathname: "/updatePlace",
                                state: { id: data._id }
                              }}
                            >
                              <Button primary content="Edit" />
                            </Link>
                            <Button
                              color="red"
                              content="DELETE"
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
                          <p />
                        )}
                      </Card.Content>
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
            <p className="headers">อีเว้นท์</p>
            <Card.Group itemsPerRow={4} centered className="showframe">
              {props.eventData.map(
                (data, index) =>
                  index < 10 ? (
                    <Card key={index} className="showcard">
                      <Image src={data.images[0]} className="showimage" />
                      <Card.Content>
                        <Link
                          to={{
                            pathname: "/eventInfo/",
                            search: data._id
                          }}
                        >
                          <h3 className="showname">{data.eventName}</h3>
                          <p className="description">{data.eventDes}</p>
                        </Link>
                        <Card.Content extra>
                          <p className="extraDetail">
                            เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                            {data.comments.length}
                          </p>
                        </Card.Content>
                        {user === "admin" ? (
                          <div>
                            {" "}
                            <Link
                              to={{
                                pathname: "/updateEvent",
                                state: { id: data._id }
                              }}
                            >
                              <Button primary content="Edit" />
                            </Link>
                            <Button
                              color="red"
                              content="DELETE"
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
                          <p />
                        )}
                      </Card.Content>
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
            <p className="headers">สถานที่</p>
            <Card.Group itemsPerRow={4} centered className="showframe">
              {props.placesData.map(
                (data, index) =>
                  index < 10 ? (
                    <Card key={index} className="showcard">
                      <Image src={data.images[0]} className="showimage" />
                      <Card.Content>
                        <Link
                          to={{
                            pathname: "/placeInfo/",
                            search: data._id
                          }}
                        >
                          <h3 className="showhotname">{data.placeName}</h3>
                          <p className="description">{data.placeDes}</p>
                        </Link>
                        <Card.Content extra>
                          <p className="extraDetail">
                            เข้าชม {data.viewCount} แสดงความคิดเห็น{" "}
                            {data.comments.length}
                          </p>
                        </Card.Content>
                        {user === "admin" ? (
                          <div>
                            {" "}
                            <Link
                              to={{
                                pathname: "/updatePlace",
                                state: { id: data._id }
                              }}
                            >
                              <Button primary content="Edit" />
                            </Link>
                            <Button
                              color="red"
                              content="DELETE"
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
                          <p />
                        )}
                      </Card.Content>
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
    </div>
  );
};
export default mainInfo;
