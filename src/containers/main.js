import React, { Component } from "react";
import Navbar from "./header/headercontrol";
import Register from "../containers/users/register/register";
import Login from "../containers/users/login/login";
import Topics from "../containers/topic/topicList";
import Home from "./Home";
class Main extends Component {
  state = {
    renderItem: <Home getComponent={this.getComponent} />
  };

  getComponent = e => {
    switch (e) {
      case "place":
        console.log("place");
        break;
      case "event":
        console.log("event");
        break;
      case "meeting":
        this.setState({
          renderItem: <Topics getComponent={this.getComponent} />
        });
        break;
      case "login":
        this.setState({
          renderItem: <Login getComponent={this.getComponent} />
        });
        break;
      case "register":
        this.setState({
          renderItem: <Register getComponent={this.getComponent} />
        });
        break;
      case "home":
        this.setState({
          renderItem: <Home getComponent={this.getComponent} />
        });
        break;
        default :
        this.setState({
            renderItem: <Home getComponent={this.getComponent} />
          });
    }
  };

  render() {
    return (
      <div>
        <Navbar getComponent={this.getComponent} />
        {this.state.renderItem}
      </div>
    );
  }
}

export default Main;
