import React from 'react'
import { Switch, Layout } from 'antd';
import logoPath from "../../../assets/svg/logo.svg";
import LogoMobile from "../../../assets/svg/logo-mobile.svg"
import './Sider.sass';
import {useDispatch} from 'react-redux';
import {onThemeChange} from "../../../redux/actions/Theme"
import logoMinPath from "../../../assets/svg/logo2.svg";
import { companyAdminNavigationConfig } from "../../../configs/NavMenuConfig/NavMenuConfig";
import {SiderMenu} from '../NavMenu/NavMenu';
import LogoIcon from '../../Logo/Logo';
import LogoMobileIcon from '../../Logo/LogoMobile';



interface propTypes{
  theme: any,
  isMobile: boolean,
  collapsed: boolean
}

export const Sider: React.FC<propTypes> = (props)=>{
  const {theme, collapsed, isMobile} = props;
  const dispatch = useDispatch();

  const menus = companyAdminNavigationConfig;
 
  return (
    <Layout>
        <div className="menuContainer">
            <SiderMenu
              theme={theme}
              isMobile={isMobile}
              collapsed={collapsed}
              menus = {menus}
            />
         
        </div>
        {(
          <div className="switchTheme">
            <Switch
              onChange={()=> dispatch(
                  onThemeChange(theme === "dark" ? "light" : "dark")
              )}
              defaultChecked={ theme === 'dark'}
              checkedChildren={`Dark`}
              unCheckedChildren={`Light`}
            />
          </div>
        )}
      </Layout>
    )

}