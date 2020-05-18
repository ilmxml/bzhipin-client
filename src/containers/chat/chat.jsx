import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state={
        content:'',
        isShowEmoji:false
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate() {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        //发送请求更新消息的未读状态
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }
    
    componentWillMount(){
        const emojis=['😀','😃','😄','😁','😆','😅','🤣','😂','🙂',
        '😀','😃','😄','😁','😆','😅','🤣','😂','🙂',
        '😀','😃','😄','😁','😆','😅','🤣','😂','🙂',
        '😀','😃','😄','😁','😆','😅','🤣','😂','🙂',
        '😀','😃','😄','😁','😆','😅','🤣','😂','🙂'
    ]
        this.emojis=emojis.map(emoji=>({text:emoji}))
    }

    // 切换表情列表的显示
    toggleShow = () => {
        const isShowEmoji = !this.state.isShowEmoji
        this.setState({ isShowEmoji })
        if (isShowEmoji) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    handleSend=()=>{
        //收集数据
        const from=this.props.user._id
        const to=this.props.match.params.userid
        const content=this.state.content.trim()
        if (content) {
            //发送请求(发消息)
            this.props.sendMsg({ from, to, content })
            //清除输入数据
            this.setState({ content: '' ,isShowEmoji:false})
        }

    }

    render() {
        const {user}=this.props
        const {users,chatMsgs}=this.props.chat
        const meId=user._id
        if(!users[meId]){//若没得到数据，直接不做任何显示
            return null
        }
        const targetId=this.props.match.params.userid
        const chatId=[meId,targetId].sort().join('_')
        //对chatMsgs进行过滤
        const msgs=chatMsgs.filter(msg=>(msg.chat_id===chatId))
        return (
            <div id='chat-page'>
                <NavBar 
                    icon={<Icon type='left'></Icon>} 
                    className='sticky-header'
                    onLeftClick={()=>this.props.history.goBack()}>
                    {users[targetId].username}
                </NavBar>
                <List style={{marginBottom:50,marginTop:50}}>
                    {
                        <QueueAnim type='left' delay={100}>
                            {msgs.map(msg => (
                                <Item key={msg._id}
                                    className={targetId === msg.to ? 'chat-me' : ''}
                                    extra={targetId !== msg.to ? '' : '我'}
                                    thumb={targetId !== msg.to ? (users[msg.from].header ? require(`../../assets/images/headers/${users[msg.from].header}.png`) : null) : null}
                                >
                                    {msg.content}
                                </Item>
                            ))}
                        </QueueAnim>
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        extra={
                            <div>
                                <span onClick={this.toggleShow}>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </div>
                        }
                        value={this.state.content}
                        onChange={val=>this.setState({content:val})}
                        onFocus={()=>this.setState({isShowEmoji:false})}
                    />
                    {
                        this.state.isShowEmoji ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({ content: this.state.content + item.text })
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat);