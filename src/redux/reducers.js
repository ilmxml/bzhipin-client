//reducer函数
import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'
import {getRedirectTo} from '../utils'

const initUser = {
    username: '',//用户名
    type: '',//用户类型 dashen/laoban
    msg: '',//错误信息
    redirectTo: ''//需要自动重定向的路径
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type,header}=action.data
            return { ...action.data, redirectTo:getRedirectTo(type,header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return {...action.data}
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}

const initUserList=[]
//产生userlist状态的reducer
function userList(state = initUserList,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state

    }
}

const initchat = {
    users:{},//所有用户信息的对象 属性名userid,属性值是{username,header}
    chatMsgs:[],
    unReadCount:0
}
//产生聊天状态的reducer
function chat(state=initchat,action){
    switch (action.type){
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,userid}=action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg}=action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const { from, to, count } = action.data
            console.log(state.unReadCount - count,state.unReadCount,count);
            
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map((msg) => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})
