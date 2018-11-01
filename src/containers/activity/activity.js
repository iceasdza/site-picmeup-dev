import React, { Component } from "react";
import axios from "../../lib/axios";
import { Form } from "formsy-semantic-ui-react";
import { Link } from "react-router-dom";
import { Card, Divider, Image } from "semantic-ui-react";
import Autocomplete from "react-autocomplete";
import '../../static/autocomplete.css'
class Activity extends Component {
  state = {
    recomendPlace: [],
    activitiesData: [],
    activityName: "",
    value: ""
  };

  componentDidMount() {
    this.getActivityDetail();
  }

  TagSelected = (field, value) => {
    this.setState({ activityName: value });
  };

  getActivityDetail = async () => {
    const arr = [];
    const resp = await axios.get("/api/getAllActivity");
    resp.data.map((data, index) => {
      arr.push({
        id:index,
        label:data.activityName
      });
    });
    this.setState({ activitiesData: arr });
  };

  getPlaceFromActivity = async () => {
    const resp = await axios.get(
      "/api/getPlaceFromActivity/" + this.state.value
    );
    if (resp.status === 200) {
      this.setState({
        recomendPlace: resp.data
      });
    }
  };

  renderAutoComplete = () => {
    return (
      <Autocomplete
      className="test"
      items={this.state.activitiesData}
      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.label}
      renderItem={(item,isHighlighted) => (
        <div key={item.id} className="itemSearch"  style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item.label}
        </div>
      )}
      value={this.state.value}
      onChange={e => this.setState({ value: e.target.value })}
      onSelect={value => this.setState({ value })}
    />
    );
  };

  render() {
    return (
      <div className="container fluid">
        <Form onSubmit={this.getPlaceFromActivity}>
          <br />
          <h1>คุณกำลังหา : {this.state.value}</h1>
          {this.renderAutoComplete()}
          {/* <Dropdown
            selection
            options={this.state.activitiesData}
            placeholder="แท็ก"
            require="true"
            name="place_open"
            errorLabel={<Label color="red" pointing />}
            value={this.state.activityName}
            validations={{
              customValidation: (values, value) => !(!value || value.length < 1)
            }}
            validationErrors={{ customValidation: "เลือกแท็ก" }}
            onChange={(e, { value }) => this.TagSelected("newTag", value)}
          /> */}
          <br/>
          <br/>
          <Form.Button content="Submit" />
        </Form>

        <div>
          <Divider horizontal>
            {" "}
            <p className="headers">
              ไปถ่ายรูป
              {this.state.value}
              ที่ไหนดี | พบ {this.state.recomendPlace.length} การค้นหา
            </p>
          </Divider>
          <Card.Group itemsPerRow={4} centered className="showframe">
            {this.state.recomendPlace.map((data, index) => (
              // console.log(data)
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
                </Card.Content>
              </Card>
            ))}
            {/* {props.recomendPlace.map(
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
                      <p className='description'>{data.placeDes}</p>
                    </Link>
                    {user === 'admin' ? (
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
                      onClick={props.deletePlace}
                    />
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </Card.Content>
                </Card>
              ) : (
                <p key={index} />
              )
          )} */}
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default Activity;
