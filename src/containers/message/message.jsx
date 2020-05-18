//消息路由界面
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

//对chatMsgs按chat_id分组,返回数组
function getLastMsgs(chatMsgs,userid) {
    // 1. 使用{}进行分组(chat_id), 只保存每个组最后一条 msg:{chat_id1: lastMsg1,chat_id2: lastMsg2}
    const lastMsgsObjs = {}
    chatMsgs.forEach(msg => {
        //对msg进行个体统计未读
        if(msg.to===userid&&!msg.read)
            msg.unReadCount=1//未读
        else
            msg.unReadCount=0
        //得到msg的聊天标识id
        const chatId=msg.chat_id
        //获取已经保存的当前组件的lastMsg
        const lastMsg = lastMsgsObjs[msg.chat_id]
        if (!lastMsg)
            lastMsgsObjs[chatId] = msg
        else {
            //累加unReadCount=已经统计+当前msg read
            const unReadCount = lastMsg.unReadCount+msg.unReadCount
            if(lastMsg.create_time < msg.create_time){
                lastMsgsObjs[chatId] = msg
            }
            //将unReadCount保存在最新的lastMsg
            lastMsgsObjs[chatId].unReadCount=unReadCount
        }
    })
    const lastMsgs=Object.values(lastMsgsObjs)
    lastMsgs.sort((m1,m2)=>{
        return m2.create_time-m1.create_time
    })
    return lastMsgs
}

class Message extends Component {

    

    render() {
        const {user}=this.props
        const {users,chatMsgs}=this.props.chat
        //对chatMsgs按chat_id分组
        const lastMsgs=getLastMsgs(chatMsgs,user._id)
        return (
            <List style={{marginBottom:50,marginTop:50}}>
                {
                    lastMsgs.map(msg => {
                        const targetUserId=msg.to===user._id?msg.from:msg.to
                        const targetUser=users[targetUserId]
                            return (
                        <Item
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount} />}
                            thumb={targetUser.header?require(`../../assets/images/headers/${targetUser.header}.png`):null}
                            arrow='horizontal'
                            onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
                        >
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>

                    )})

                        }
            </List>
        );
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Message);