import React from 'react'
import { BackTop, Layout, Drawer } from 'antd'
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { onCollapseChange } from '../../redux/actions/Theme';
import { GlobalFooter } from '../../components/layout/Footer/Footer';
import './PrimaryLayout.sass'
import { companyAdminNavigationConfig } from "../../configs/NavMenuConfig/NavMenuConfig";
import {Header, Sider, Bread} from "../../components/layout/";
import {MainContent} from "../main-content/MainContent"
import { useLocation } from 'react-router-dom';
import { NotFound } from '../../page/NotFound/NotFound';


interface propTypes {
    children: any,
    location: object,
    dispatch: Function,
    app: object,
    loading: object,
}


const { Content } = Layout;

export const PrimaryLayout/* : React.FC<propTypes> */ = ()=>{
 
    const theme = useSelector<any>(state => state.theme) as any;

    const navMenu = companyAdminNavigationConfig;
    
    const location = useLocation()

    const currentRoute = navMenu.find(
      (item) => item.path && (item.path) === (location.pathname) ? true : false
    )
    const siderProps = {
      theme: theme.theme,
      isMobile,
      collapsed: theme.collapsed,
    }
    const headerProps = {
        collapsed:  theme.collapsed
      }
   
    return (
      <>
        <Layout>
          <div
            className="container"
            id="primaryLayout"
          >
            <Header {...headerProps} sider = {siderProps}/>
            <Content className="content">
              <Bread routeList={navMenu} /> 
              <MainContent/>
            </Content> 
           
            <BackTop
              className={"backTop"}
              target={()=>document?.querySelector('#primaryLayout') as HTMLElement}
            />
           <GlobalFooter
              copyright={`© ${new Date().getFullYear()} Goplaciz travelling Agency. All Rights Reserved.`}
            />
          </div>
        </Layout>
      </>
    )

}

export default Layout
