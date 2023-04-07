import React from 'react'
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Bread.sass'


interface propTypes {
  routeList: Array<any>
}
export const  Bread :React.FC<propTypes> = (props)=> {

  const location = useLocation();
  const {routeList} = props;
  const generateBreadcrumbs = (paths:any) => {
   
    return paths.map((item:any, key:any) => {
      const content = item && (
        <>
          {item.icon && (
            <span style={{ marginRight: 4 }}>{<item.icon/>}</span>
          )}
          {item.title}
        </>
      )

      return (
        item && (
          <Breadcrumb.Item key={key}>
            {paths.length - 1 !== key ? (
              <Link to={item.path || '#'}>{content}</Link>
            ) : (
              content
            )}
          </Breadcrumb.Item>
        )
      )
    })
  }

  const currentRoute = routeList.find(
    (item) => item.path && (item.path) === (location.pathname)
  )
  
  
    return (
      <Breadcrumb className="bread">
        {generateBreadcrumbs([currentRoute])}
      </Breadcrumb>
    )
}