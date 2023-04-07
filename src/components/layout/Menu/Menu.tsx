import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { SubMenu } from 'rc-menu';

interface propTypes{
    menus: any
} 

const MenuComponent:React.FC<propTypes> = (props)=> {
    const menus = props.menus;
    const menuItems = (data:any)=>{
        console.log(data,'ll')
        return (
            <Menu>
                {
                data.map((item:any)=>
                <Menu.Item key={item.key}>
                    <NavLink to={item.path}>
                        {item.title}
                    </NavLink>
                </Menu.Item>
                )
                }
            </Menu>
        )
    }
    return(
        <>
            {
                menus.map((data:any)=>{
                    console.log(data)
                    if(data.submenu?.length){
                        return(
                                <Dropdown overlay={menuItems(data.submenu)}>
                                    <a onClick={e => e.preventDefault()}>
                                        <Space style={{margin: "0 16px"}}>
                                            {data.title}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                                )
                            }
                            return <NavLink to={data.path}>{data.title}</NavLink>
                        })
            }
        </>
    )
}

export default MenuComponent;