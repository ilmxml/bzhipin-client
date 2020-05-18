//大神路由界面
import React, { Component } from 'react';
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Dashen extends Component {

    componentDidMount(){
        this.props.getUserList('laoban',1)
        
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
)(Dashen);