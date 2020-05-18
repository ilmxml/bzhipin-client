import React from 'react';
import './logo.less'

import logo from './logo.png'

const Logo = () => {
    return (
        <div className='logo-container'>
            <img src={logo} alt='logo' className='logo-img' />
        </div>
    );
};

export default Logo;