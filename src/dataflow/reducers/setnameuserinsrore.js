export const setnameuserinstore=(state="",action)=>{
    switch(action.type){
        case 'GET_NAMEUSER':
        return action.text
        default:
        return ""
    }
}