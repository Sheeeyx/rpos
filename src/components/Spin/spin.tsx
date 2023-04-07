import React from 'react';
import { Spin } from 'antd';
import "./spin.style.sass";



export const SpinLoader = () =>
    <div className='spin-container'>
        <Spin tip="Loading..." />
    </div>