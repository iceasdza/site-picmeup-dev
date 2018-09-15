import React,{Component} from 'react'
import Navbar from '../../components/header/header'
import CreateTopicComponent from '../../components/topic/createTopicComponent'
import axios from '../../lib/axios'
class CreateTopic extends Component{
    constructor(props) {
        super(props)
        this.state = { text: '' }
      }
    
      handleChange = (value) =>{
        this.setState({ text: value })
      }
      handleSubmit = async () =>{
          const resp = await axios.post("/api/creatplace",{
            topicName:'test',
            content:this.state.text
          })
          console.log(resp)
      }
    render(){
        return(
            <div>
            <Navbar/>
            <CreateTopicComponent
            text={this.state.text}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
            </div>
        )
    }
}

export default CreateTopic