import {
  
    THEME_CHANGE,
    COLLAPSE_CHANGE
  } from "../constant/Theme";
  
const initialState = {
    theme: "light",
    collapsed: false
}
  const theme = (state = initialState, action:any) => {

    switch (action.type) {
        case THEME_CHANGE:
            return{
                ...state,
                theme:  action.payload

            } 
        case COLLAPSE_CHANGE:
            return{
                ...state,
                 collapsed:  action.payload

            } 
      default:
        return state;
    }
  };
  
  export default theme;
  