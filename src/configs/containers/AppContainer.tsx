import React from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate 
} from 'react-router-dom';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { baseRoutes } from '../routes/routes';
import { useEffect } from 'react';
import { store } from '../../redux/store';

export const AppContainer = ()=>{

    const location = useLocation()
    const navigate = useNavigate();
    const authToken = store.getState().auth.accessToken;

    useEffect(()=>{
      if(authToken && location.pathname === "/"){
          navigate("/dashboard");
      } 

       if(!authToken){
        navigate("/login");
      }
  }, [location.pathname]);
  
  return (
    <>      
          <Routes>
            {baseRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component/>}
              />
            ))}
          </Routes>
         {/*  {!authToken && <Redirect to="/login" />} */}
    </>   
  );
}
function useHistory() {
    throw new Error('Function not implemented.');
}

