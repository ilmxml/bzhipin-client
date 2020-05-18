//包含多个action
import io from 'socket.io-client'
import {
    reqLogin,
    reqRegister,
    reqUpdate,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'
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

function initIO(dispatch,userid){
    if(!io.socket)
        io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', function (chatMsg) {
        console.log('客户端接收服务器消息', chatMsg)
        if(userid===chatMsg.from||userid===chatMsg.to){
            dispatch(receiveMsg(chatMsg,userid))
        }
    })
}

//授权成功同步action
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
//接收用户的的同步action
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//重置用户的同步action
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
//获取用户列表的同步action
const receiveUserList=(users)=>({type:RECEIVE_USER_LIST,data:users})
//接收消息列表的同步action
const receiveMsgList=({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
//接收一个消息的同步action
const receiveMsg=(chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}})
//读取某个聊天消息的同步action
const msgRead=({count,from,to})=>({type:MSG_READ,data:{count,from,to}})

//注册异步action
export const register=(user)=>{
    const {username,password,confirmPassword,type}=user
    //表单前台检查
    if(!username)   return errorMsg('用户名不能为空！')
    if(!password)   return errorMsg('密码不能为空！')
    if(password!==confirmPassword)   return errorMsg('两次密码不一致！')
    //表单数据合法，发送ajax请求
    return async dispatch=>{
        const response=await reqRegister({username,password,type})
        const result=response.data
        if(result.code===0){
            dispatch(authSuccess(result.data))
            getMsgList(dispatch,result.data._id)
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

//登录异步action
export const login=(user)=>{
    const {username,password}=user
    //表单前台检查
    if(!username)   return errorMsg('用户名不能为空！')
    if(!password)   return errorMsg('密码不能为空！')
    //表单数据合法，发送ajax请求
    return async dispatch=>{
        const response=await reqLogin(user)
        const result=response.data
        if(result.code===0){
            dispatch(authSuccess(result.data))
            getMsgList(dispatch,result.data._id)
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户异步action
export const updateUser=(user)=>{
    return async dispatch => {
        const response = await reqUpdate(user)
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户异步action
export const getUser = ()=>{
    return async dispatch=>{
        const response = await reqUser()
        const result = response.data
        if(result.code===0){//成功
            dispatch(receiveUser(result.data))
            getMsgList(dispatch,result.data._id)
        }else{//失败
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表action
export const getUserList=(type,page)=>{
    return async dispatch=>{
        const response = await reqUserList(type,page)
        const result=response.data
        if(result.code===0)
            dispatch(receiveUserList(result.data))
    }
}

//异步获取消息列表数据
async function getMsgList (dispatch,userid){
    initIO(dispatch,userid)
    const response=await reqChatMsgList()
    const result=response.data
    if(result.code===0){
        const {users,chatMsgs}=result.data
        //分发同步action
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }

}

//发送消息的异步action
export const sendMsg=({from,to,content})=>{
    return dispatch=>{
        console.log('发送消息'+{from,to,content})
        io.socket.emit('sendMsg', {from,to,content})
        console.log('客户端发送消息', {from,to,content})
    }
}

//读取消息的异步action
export const readMsg=(from,to)=>{
    return async dispatch=>{
        const response=await reqReadMsg(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            dispatch(msgRead({count,from,to}))
        }
    }
}