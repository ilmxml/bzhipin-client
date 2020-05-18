import React, { Component } from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {

    static propTypes = {
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }

    render() {
        let {navList,unReadCount} = this.props
        navList=navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map((nav,index)=>(
                        <Item key={nav.path} 
                        badge={nav.path==='/message'?unReadCount:0}
                        title={nav.text} 
                        icon={{uri:require(`../../assets/images/nav/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`../../assets/images/nav/${nav.icon}-selected.png`)}}
                        selected={nav.path===path}
                        onPress={()=>this.props.history.replace(nav.path)} ></Item>
                    ))
                }
            </TabBar>
        );
    }
}

//向外暴露withrouter包装产生的组件
//会传入路由特有属性location,history
export default withRouter(NavFooter);