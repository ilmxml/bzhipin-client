import React, { Component } from 'react';
import {
    NavBar,
    WingBlank,
    InputItem,
    List,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    register = () => {
        // console.log(this.state);
        this.props.login(this.state)
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val.trim()
        })
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>Bob&nbsp;直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg?(<div><WhiteSpace /><div className='error-msg'>{msg}</div></div>):null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>this.handleChange('username',val)} >用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>this.handleChange('password',val)} >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister} >未有账户</Button>
                        <WhiteSpace/>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login);