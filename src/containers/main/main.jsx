import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'
import AnimatedRouter from 'react-animated-router'; //我们的AnimatedRouter组件
import 'react-animated-router/animate.css'; //引入默认的动画样式定义

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Chat from '../chat/chat'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import NavFooter from '../../components/nav-footer/nav-footer'

class Main extends Component {

    //给组件对象添加属性
    navList = [{//导航组件相关信息数据
        path: '/laoban', //路 由 路 径
        component: Laoban, 
        title: '老板列表', 
        icon: 'laoban', 
        text: '老板',
    }, {
        path: '/dashen', //路 由 路 径
        component: Dashen, 
        title: '大神列表', 
        icon: 'dashen', 
        text: '大神',
    }, {
        path: '/message', //路 由 路 径
        component: Message, 
        title: '消息列表', 
        icon: 'message', 
        text: '消息',
    }, {
        path: '/personal', //路 由 路 径
        component: Personal, 
        title: '用户中心', 
        icon: 'personal', 
        text: '个人',
    }
    ]

    componentDidMount(){
        //登录过（cookie中有userid），但还没登录（redux管理的user中没有_id），发请求获取对应user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            // console.log('ajax请求user')
            this.props.getUser()
        }
    }

    render() {
        //读取cookie中的userid
        const userid=Cookies.get('userid')
        //如果没有，自动重定向到登录页面
        if(!userid)
            return <Redirect to='/login' />
        //如果有，读取redux的user状态
        const {user,unReadCount} = this.props
        //如果user没有_id，返回null不做任何处理
        if(!user._id)
            return null
        else{
            let path=this.props.location.pathname
            if(path==='/'){
                path=getRedirectTo(user.type,user.header)
                return <Redirect to={path} />
            }
        }
        const {navList} = this
        const path = this.props.location.pathname//请求的路径
        const currentNav = navList.find(nav=>nav.path===path)//得到当前的nav
        if(currentNav){
            //决定哪个路由需要隐藏
            if(user.type==='laoban'){
                //隐藏数组第二个
                navList[1].hide=true
            }else{
                //隐藏数组第一个
                navList[0].hide=true
            }
        }
        return (
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                <AnimatedRouter>
                    {
                        navList.map(nav=><Route key={nav.path} path={nav.path} component={nav.component} ></Route>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo} ></Route>
                    <Route path='/dasheninfo' component={DashenInfo} ></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound} ></Route>
                </AnimatedRouter>
                {currentNav?<NavFooter navList={navList} unReadCount={unReadCount} >底部</NavFooter>:null}
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main);

/*
componentDidMont()
    登录过（cookie中有userid），但还没登录（redux管理的user中没有_id），发请求获取对应user
render()
    如果没有userid，自动进入login
    判断redux管理中是否有_id,如果没有暂时不做任何显示
    如果有说明已经登录显示对应的界面
    如果请求根路径：
    根据type，header计算重定向的路由路径，并自动重定向
*/