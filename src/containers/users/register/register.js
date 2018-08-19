import React,{Component} from 'react'
import RegisterForm from '../../../components/users/register/registerForm'
import Header from '../../../components/header/header'
class Register extends Component{

    constructor(props){
        super(props)
        this.state={
            active:'uploadButton',
            files:[]
        }
    }

 handleOver=()=>{
    this.setState({active:"uploadButton-active"})
}  

 handleOut=()=>{
    this.setState({active:"uploadButton"})
}  

handleSelectImage=(event)=>{
    const files  = event.target.files
    const arr =[]
    for(var x = 0; x < files.length; x++){
        arr.push(URL.createObjectURL(files[x]))
    }    
    this.setState({
        files:arr
    })
}

DeletePhotoUploaded =(field,index)=>{
    let arr = []
    arr = this.state.files
    arr.splice(index,1)
    this.setState({files:arr})
    }


    render(){
        return(
            <div>
            <Header/>
            <RegisterForm
            handleOver={this.handleOver}
            handleOut={this.handleOut}
            handleSelectImage={this.handleSelectImage}
            DeletePhotoUploaded={this.DeletePhotoUploaded}
            
            isActive={this.state.active}
            files={this.state.files}
            />
            </div>
        )
    }
}

export default Register