import React,{Component} from 'react'
import Navbar from '../../components/header/header'
import CreateTopicComponent from '../../components/topic/createTopicComponent'
import { Form } from 'formsy-semantic-ui-react'
class CreateTopic extends Component{
    state={
        paragraph:[],
        text:''
    }

    renderParagraph = (e) =>{
        const paragraphs = this.state.paragraph
        const text = this.state.text
        if(e.key==='Enter'){
            paragraphs.push(text)
            
            this.setState({paragraph:paragraphs,text:''})
        }
    }
    handleOnchange = (e) =>{
        this.setState({text:e.target.value})
    }

    handleClick = (e) =>{
        console.log(e.target)
    }

    render(){
        return(
            <div>
            <Navbar/>
            <Form>
            <CreateTopicComponent
            paragraph={this.state.paragraph}
            renderParagraph={this.renderParagraph}
            handleOnchange={this.handleOnchange}
            text={this.state.text}
            handleClick={this.handleClick}
            />
            </Form>
            </div>
        )
    }
}

export default CreateTopic