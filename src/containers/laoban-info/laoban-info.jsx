//老板信息完善界面
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, WingBlank, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'

import HanderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'
import {formatErrMsg} from '../../utils/index'

class LaobanInfo extends Component {

    state = {
        header: '', //头 像 名 称
        info: '', //职 位 简 介
        post: '', //职 位 名 称 
        company: '', // 公 司 名 称 
        salary: '' //工资
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
        const info_ch = ['头像', '职位简介', '公司名称','工资']
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
                <NavBar>老板信息完善</NavBar>
                <WingBlank>
                    <HanderSelector setHeader={this.setHeader}></HanderSelector>
                    <InputItem placeholder='请输入招聘职位' onChange={val => this.handleChange('post', val)} >招聘职位：</InputItem>
                    <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange('company', val)} >公司名称：</InputItem>
                    <InputItem placeholder='请输入职位薪资' onChange={val => this.handleChange('salary', val)} >职位薪资：</InputItem>
                    <TextareaItem title='职位要求：' rows={3} placeholder='请输入职位要求' onChange={val => this.handleChange('info', val)} />
                    <Button type='primary' onClick={this.save} >保&nbsp;&nbsp;&nbsp;存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(LaobanInfo);