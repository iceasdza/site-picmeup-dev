import React from "react";
// import { Form, Dropdown } from "formsy-semantic-ui-react";
const createTopicComponent = props => {
  return (
    <div className="container fluid">
      {/* {props.paragraph} */}
      {props.paragraph.map((data,key)=>(
          <p key={key} onClickCapture={key=>props.handleClick(key)} id={key}>{data}</p>
      ))}
      <p><input type="text" onKeyPress={props.renderParagraph} value={props.text} onChange={e=>props.handleOnchange(e)}/></p>
    </div>
  );
};

export default createTopicComponent;
