import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import TopicsListComponent from "../../components/topic/topicsListComponent";
import axios from "../../lib/axios";
import Cookies from "js-cookie";
import { Pagination } from 'semantic-ui-react'
import LoadingScreen from '../screen/loading'
import '../../static/topic.css'
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicsData: [],
      open:true,
      page:[],
      activePage:1
    };
  }

  componentDidMount = () => {
    this.getAllTopics();
    this.renderTopic()
  };

  getAllTopics = async () => {
    const resp = await axios.get("/api/getalltopics");
    if(resp.status === 200 ){
      const data = this.split(resp.data,10)
      this.setState({ topicsData: resp.data,open:false,page:data});
    }
  };

  split = (arr,chunk) =>{
    const data  =[]
    for(let i= 0;i<arr.length;i+= chunk){
      data.push(arr.slice(i,i+chunk))
    }
    return data
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage })   
}

renderTopic = () =>{
  const page = this.state.page
  const activePage = this.state.activePage
  const data = page[activePage-1]
  if(data){
    return data.map((data,index)=>(
      <Card fluid key={index}>
      <Link
        to={{
          pathname: "/topic/",
          search: data._id
        }}
      >
        <Card.Content header={data.topicName} />
      </Link>
      <Card.Content description={data.creator + " : " + data.create_date} />
    </Card>
    ))
  }
//   const {page,activePage} = this.state
//   if(page[activePage-1]){ 
//   return page[activePage-1].map((data,index)=>{
// (
//   <p>aaaa</p>
// )
//   })
//   }else{
//     return(
//       <p>loading...</p>
//     )
//   }
}

  renderTopicList = () => {
    const data = this.state.topicsData;
    return data.map((data, index) => (
      <Card fluid key={index}>
        <Link
          to={{
            pathname: "/topic/",
            search: data._id
          }}
        >
          <Card.Content header={data.topicName} />
        </Link>
        <Card.Content description={data.creator + " : " + data.create_date} />
      </Card>
    ));
  };

  CreateTopicButton = () => {
    let button = "";
    if (Cookies.get("user") === undefined) {
      
    } else {
      button = <Button href="/createtopic">สร้างกระทู้</Button>;
    }

    return button;
  };
  

  render() {
    return (
      <div className="container fluid"> 
        <LoadingScreen
        open={this.state.open}
        />
        {/* <TopicsListComponent
          topics={this.state.topicsData}
          CreateTopicButton={this.CreateTopicButton}
          renderTopicList={this.renderTopicList}
        /> */}
          {this.renderTopic()}
        {/* {this.renderTopic()} */}
        <Pagination className="pagination" defaultActivePage={1} totalPages={this.state.page.length} onPageChange={this.handlePaginationChange}/>
      </div>
    );
  }
}

export default TopicList;
