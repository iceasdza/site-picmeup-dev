import React , {Component} from 'react'
import Header from '../../components/header/header'
import ChatComponent from '../../components/chat/chatComponent'
class ChatList extends Component{
    render(){
        return(
            <div>
            <Header/>
            <ChatComponent/>
            </div>
        )
    }
}

export default ChatList