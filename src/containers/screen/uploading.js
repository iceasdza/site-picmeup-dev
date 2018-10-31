import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class UpLoading extends Component{
    render(){
        return(
            <Dimmer active={this.props.loading} page>
            <Loader size="massive">
              <p>รอแป๊ปกำลังอัพโหลดรูป...</p>
            </Loader>
          </Dimmer>
        )
    }
}

export default UpLoading