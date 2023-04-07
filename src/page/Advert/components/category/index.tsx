import React, { useState } from "react"
import { categoryData } from "../tags/tagsData"
import { Category } from "./Category"


export const CategoryList = ({setCategory, category}:any)=>{

    

    const handleRemoveListValue = (key:string, setSelect:any)=>{

    
        const newSelectedList = [...category];
        
        setSelect(()=>new Set(newSelectedList.filter((item)=>item!==key)));
        
      
    }
    
  return(
    <div style={{display: "flex", flexWrap: "wrap"}}>
    {categoryData.map((item, index)=>
             <Category 
                icon = {item.icon} 
                name = {item.title} 
                setCategory = {setCategory} 
                key = {item.key}
                category = {category}
                handleRemoveListValue = {handleRemoveListValue}
                id = {item.key}
                 onClick ={(e:any)=>{
                setCategory((prevState:any)=>(new Set([...prevState, item.key])))
               
            } 
             }/>
     )}
    </div>
  )


}