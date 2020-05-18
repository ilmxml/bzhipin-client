//大神信息完善页面
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, WingBlank, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'

import HanderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'
import {formatErrMsg} from '../../utils/index'

class DashenInfo extends Component {

    state = {
        header: '', //头 像 名 称
        post: '', //职 位 名 称 
        info: '', //个人介绍
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value.trim()
        })
    }

    save = () => {
        const info_ch = ['头像', '求职岗位', '个人介绍']
        const msg=formatErrMsg(this.state,info_ch)
        if(msg===[]){
            Toast.info(formatErrMsg(this.state,info_ch)+'不能为空！')
            return
        }
        this.props.updateUser(this.state)
    }

    render() {
        const { header, type } = this.props.user
        if (header) {
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <WingBlank>
                    <HanderSelector setHeader={this.setHeader} ></HanderSelector>
                    <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange('post', val)} >求职岗位：</InputItem>
                    <TextareaItem title='个人介绍：' rows={3} placeholder='请输入个人介绍' onChange={val => this.handleChange('info', val)} />
                    <Button type='primary' onClick={this.save} >保&nbsp;&nbsp;&nbsp;存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(DashenInfo);