//老板路由界面
import React, { Component } from 'react';
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Laoban extends Component {

    componentDidMount(){
        this.props.getUserList('dashen',1)
        
    }

    render() {
        return (
            <div type='scale' delay={100}>
                <UserList userList={this.props.userList}></UserList>
            </div>
        );
    }
}

export default connect(
    state =>({userList:state.userList}),
    {getUserList}
)(Laoban);