import React, { Component } from 'react'
import './Page.sass'


interface propType {
    children: any
    className?: string
}

export const Page: React.FC<propType> = (props)=> {
  
    const { children } = props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div className={props.className ? props.className :"contentInner"}> 
        {children}
      </div>
    )
}
