import { combineReducers } from "redux";
import Theme from "./Theme";
import Auth from "./Auth";
import userData from "./userData";


const appReducer = combineReducers({
  theme: Theme,
  auth: Auth,
  userData,
});

const rootReducer = (state : any, action :any) => {
  
  return appReducer(state, action);
};

export default rootReducer;
