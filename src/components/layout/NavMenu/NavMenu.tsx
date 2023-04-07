import React from 'react'
import { Menu, MenuProps } from 'antd'
import { NavLink } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import {NavMenuTypes} from '../../../configs/NavMenuConfig/NavMenuTypes'


interface propTypes{

    theme?: any,
    isMobile?: boolean,
    collapsed: boolean,
    menus: Array<object>

} 



export const  SiderMenu : React.FC<propTypes> = (props)=> {
  
    const {theme, isMobile,  collapsed, menus} = props;
    

  /* onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }

    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  } */
  
  const generateMenus = (data: object[]) => {
    return data.map((menu: any) => {
      
      if (menu.submenu?.length) {
        console.log(typeof menu.icon)
        return (
          <SubMenu
            key={menu.key}
            title={
              <>
                 {menu.icon ? <menu.icon/> : null}
                <span>{menu.title}</span>
              </>
            }
          >
            {generateMenus(menu.submenu)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={menu.key}>
          <NavLink to={menu.path || '#'}>
          {menu.icon ? <menu.icon/> : null}
            <span>{menu?.title}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

   
    return (
      
        <Menu
        theme={theme}
        mode="inline"
        style={{ height: "100%", borderRight: 0, display: "flex" }}
      >
       {generateMenus(menus)}
      </Menu>
    )
}
