import { SET_USER_DATA } from "../constant/Auth";

const INITIAL_STATE = {
    userData: "",
  };

  
const auth= (state = INITIAL_STATE, action:any)=> {
    switch (action.type) {
      case SET_USER_DATA:
        return action.payload.data.user;
      default:
        return state;
    }
  }

export default auth;
  