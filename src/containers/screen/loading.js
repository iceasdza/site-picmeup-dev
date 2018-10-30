import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class Loading extends Component{
    render(){
        return(
            <Dimmer active={this.props.open} page>
            <Loader size="massive">
              <p>โหลดดิ้ง...</p>
            </Loader>
          </Dimmer>
        )
    }
}

export default Loading