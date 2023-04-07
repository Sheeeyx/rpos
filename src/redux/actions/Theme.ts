import {
    THEME_CHANGE,
    COLLAPSE_CHANGE,
  } from "../constant/Theme";
  
export function onThemeChange(theme:string) {
    return {
      type:  THEME_CHANGE,
      payload: theme,
    };
}

export function onCollapseChange(collapse:boolean) {
    return {
      type:  COLLAPSE_CHANGE,
      payload: collapse,
    };
}