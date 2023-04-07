import {
   
    REFRESH_ACCESS_TOKEN,
    SET_AUTH_TOKENS,
    CLEAR_ON_SIGNOUT,
    SET_USER_DATA
  } from "../constant/Auth";
  
  const INITIAL_STATE = {
    accessToken: "",
  };
  
const auth= (state = INITIAL_STATE, action:any)=> {
    switch (action.type) {

      case SET_AUTH_TOKENS:
        console.log(action.payload)
        return {
          ...state,
          accessToken: action.payload.token,
        };
      case CLEAR_ON_SIGNOUT:
        return INITIAL_STATE;
      case SET_USER_DATA:
        return action.payload.data;
      default:
        return state;
    }
  }

export default auth;
  