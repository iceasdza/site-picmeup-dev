import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../static/showdata.css";

const mainInfo = props => {
    return (
        <div>
            <div>
                <Divider horizontal > <p className="headers">อีเว้นท์</p></Divider>
                <Card.Group itemsPerRow={3} centered className="showhotframe">
                    {props.eventData.map((data, index) => index < 3 ? (
                        <Card key={index} className="showhotcard">
                            <Image src={data.images[0]}
                                className="showhotimage"
                            />
                            <Card.Content>
                                <Link
                                    to={{
                                        pathname: "/eventInfo/",
                                        search: data._id
                                    }}
                                >
                                    <h3 className="showhotname">{data.eventName}</h3>
                                </Link>
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
                                    onClick={props.deleteEvent}
                                />
                            </Card.Content>
                        </Card>
                    ) : (<p key={index}></p>))}
                </Card.Group>
            </div>
            <br />
            <div>
                <Divider horizontal> <p className="headers">สถานที่</p></Divider>
                <Card.Group itemsPerRow={3} centered className="showhotframe">
                    {props.placesData.map((data, index) => index < 3 ? (
                        <Card key={index} className="showhotcard">
                            <Image
                                src={data.images[0]}
                                className="showhotimage"
                            />
                            <Card.Content>
                                <Link
                                    to={{
                                        pathname: "/placeInfo/",
                                        search: data._id
                                    }}
                                >
                                    <h3 className="showhotname">{data.placeName}</h3>
                                </Link>
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
                                    onClick={props.deletePlace}
                                />
                            </Card.Content>
                        </Card>
                    ) : (<p key={index}></p>))}
                </Card.Group>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <Divider horizontal > <p className="headers">อีเว้นท์</p></Divider>
                <Card.Group itemsPerRow={4} centered className="showframe">
                    {props.eventData.map((data, index) => index < 10 ? (
                        <Card key={index} className="showcard">
                            <Image src={data.images[0]}
                                className="showimage"
                            />
                            <Card.Content>
                                <Link
                                    to={{
                                        pathname: "/eventInfo/",
                                        search: data._id
                                    }}
                                >
                                    <h3 className="showname">{data.eventName}</h3>
                                </Link>
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
                                    onClick={props.deleteEvent}
                                />
                            </Card.Content>
                        </Card>
                    ) : (<p></p>))}
                </Card.Group>
            </div>
            <br />
            <div>
                <Divider horizontal> <p className="headers">สถานที่</p></Divider>
                <Card.Group itemsPerRow={4} centered className="showframe">
                    {props.placesData.map((data, index) => index < 10 ? (
                        <Card key={index} className="showcard">
                            <Image
                                src={data.images[0]}
                                className="showimage"
                            />
                            <Card.Content>
                                <Link
                                    to={{
                                        pathname: "/placeInfo/",
                                        search: data._id
                                    }}
                                >
                                    <h3 className="showhotname">{data.placeName}</h3>
                                </Link>
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
                                    onClick={props.deletePlace}
                                />
                            </Card.Content>
                        </Card>
                    ) : (<p key={index}></p>))}
                </Card.Group>
            </div>
        </div>
    )
}
export default mainInfo