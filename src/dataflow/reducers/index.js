import {combineReducers} from 'redux'
import{setnameuserinstore}from '../reducers/setnameuserinsrore'

export const rootReducer = combineReducers({
    nameUser:setnameuserinstore,
})

