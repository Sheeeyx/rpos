import React from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import { Layout } from 'antd';
import { dashboardRoutes } from '../../configs/routes/routes';

const { Content } = Layout;


export const  MainContent = ()=> {
    
  return (
        <Content>
          <Routes>
            {dashboardRoutes.map((route:any) => (
               <>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component/>}
                >
                    
               </Route>
               </> 
            ))}
          </Routes>
        </Content>
    
   
  );
}


