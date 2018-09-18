import React , {Component} from 'react'
import HeaderControl from '../header/headercontrol'
import ChatComponent from '../../components/chat/chatComponent'
class ChatList extends Component{
    render(){
        return(
            <div>
            <HeaderControl/>
            <ChatComponent/>
            </div>
        )
    }
}

export default ChatList