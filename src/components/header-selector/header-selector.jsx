import React, { Component } from 'react';
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class HeaderSelector extends Component {

    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }

    state={
        icon:null
    }

    constructor(props){
        super(props)
        this.headerList=[]
        for(let i=0;i<20;i++){//准备需要的列表数据
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/images/headers/头像${i+1}.png`)
            })
        }
    }

    handleClick=({text,icon})=>{
        this.setState({
            icon
        })
        this.props.setHeader(text)
    }

    render() {
        const {icon}=this.state
        const listHeader = !icon?'请选择头像':<div>已选择头像:<img src={icon} /></div>
        return (
            <div>
                <List renderHeader={()=>listHeader}></List>
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick} ></Grid>
            </div>
        );
    }
}

export default HeaderSelector;