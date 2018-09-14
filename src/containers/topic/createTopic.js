import React,{Component} from 'react'
import Navbar from '../../components/header/header'
import CreateTopicComponent from '../../components/topic/createTopicComponent'
class CreateTopic extends Component{
    constructor(props) {
        super(props)
        this.state = { text: '' }
      }
    
      handleChange = (value) =>{
        this.setState({ text: value })
        console.log(value)
      }
    render(){
        return(
            <div>
            <Navbar/>
            <CreateTopicComponent
            text={this.state.text}
            handleChange={this.handleChange}
            />
            </div>
        )
    }
}

export default CreateTopic