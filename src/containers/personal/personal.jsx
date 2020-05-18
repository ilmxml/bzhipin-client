//个人路由界面
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import {resetUser} from '../../redux/actions'
import Cookies from 'js-cookie'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    loginOut = () => {
        Modal.alert('退出', '确认退出登录吗？', [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    this.props.resetUser(null)
                    Cookies.remove('userid')
                }
            }]
            )
    }

    render() {
        const {username,info,header,company,post,salary} = this.props.user
        return (
            <div  style={{marginBottom:50,marginTop:50}} >
                <Result img={<img src={require(`../../assets/images/headers/${header}.png`)}
                    style={{ width: 50 }}
                    alt="header" />}
                    title={username}
                    message={company} />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary?<Brief>薪资: {salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace />
                <List> <Button type='warning' onClick={this.loginOut}>退出登录</Button> </List>
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal);