import React, {Fragment } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import logoRpos from "../../../assets/svg/logoo.png";
import   './Header.sass'
import { onCollapseChange } from '../../../redux/actions/Theme';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/Auth';
import { Sider } from '../../../components/layout/Sider/Sider';
import { SiderMenu } from '../NavMenu/NavMenu';
import { companyAdminNavigationConfig } from '../../../configs/NavMenuConfig/NavMenuConfig';
import MenuComponent from '../Menu/Menu';

const { SubMenu } = Menu


interface propType{
   sider: any;
   collapsed: boolean,
    
}

export const Header:React.FC<propType> = (props)=> {

    const {collapsed} = props;
    const {sider} = props;
    const menus = companyAdminNavigationConfig;



    const dispatch = useDispatch();
    const navigate = useNavigate()
    const rightContent = [
        
      <Menu key="user" mode="horizontal" style={{ width: '100%', height: '100%'}} >
        <SubMenu title={<LogoutOutlined />}>
          <Menu.Item key="SignOut" onClick={() =>{ 
              navigate("/login")
              dispatch(logout())}}>
            <div>Sign out</div>
          </Menu.Item>
        </SubMenu>
      </Menu>
    ]

    return (
      <Layout.Header

        className={`header fixed ${collapsed? "collapsed" : "no-collapsed"}`}
        id="layoutHeader"
      >
        <div
          className="leftContainer"
        >
          <div
          className="logo" style={{width: "200px"}}>
            <img style={{width: "60px", marginLeft:"22px"}} src={logoRpos} />
          </div>
          <div>
            <MenuComponent menus={menus} />
          </div>
        </div>
        <div className="rightContainer">{rightContent}</div>
      </Layout.Header>
    )
  }
