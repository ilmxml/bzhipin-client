//包含多个ajax请求方法
import ajax from './ajax'

//注册接口
export const reqRegister = (user)=>ajax('api/register',user,'POST')
//登录接口
export const reqLogin = ({username,password})=>ajax('api/login',{username,password},'POST')
//更新用户接口
export const reqUpdate = (user)=>ajax('api/update',user,'POST')
//获取用户信息
export const reqUser = ()=>ajax('api/user')
//获取用户列表
export const reqUserList = (type,page)=>ajax('api/userlist',{type,page})
//获取当前用户的聊天消息列表
export const reqChatMsgList = ()=>ajax('api/msglist')
//修改指定消息为已读
export const reqReadMsg = (from)=>ajax('api/readMsg',{from},'POST')