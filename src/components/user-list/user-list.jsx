//显示指定类型用户列表
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const { userList } = this.props
        
        return (
            <WingBlank style={{marginBottom:50,marginTop:50}} >
                <QueueAnim type='scale' delay={100}>
                {
                    userList.map((user, index) =>{
                        var {_id,username,header,post,company,salary,info}=user
                        return (<div key={_id}>
                            <WhiteSpace />
                            <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                                <Header thumb={require(`../../assets/images/headers/${header}.png`)}
                                    extra={username} />
                                <Body>
                                    <div>职位: {post}</div>
                                    {company?<div>公司: {company}</div>:null}
                                    {salary?<div>月薪: {salary}</div>:null}
                                    <div>描述: {info}</div>
                                </Body>
                            </Card>
                        </div>)})
                }
                </QueueAnim>
            </WingBlank>
        );
    }
}

export default withRouter(UserList);