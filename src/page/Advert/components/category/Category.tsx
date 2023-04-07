import React, { useState } from "react";
import './Category.sass'
import { Checkbox } from 'antd';


export const Category = (
    {icon, 
    name, 
    onClick, 
    id, 
    handleRemoveListValue, 
    setCategory,
    category}:any)=>{

    const [isChecked, setChecked] = useState<boolean>();
    return (
        <> 
            <label
                htmlFor={`category-${id}`}
                className = {isChecked || [...category].includes(id)  ? "category-wrapper-select" :"category-wrapper"} 
                onClick={onClick}>
                <div className="category-tag">
                <span className="category-icon"><img src={icon} alt="icon" /></span>
                <h4>{name}</h4>
                <span 

                    className="category-remove" 
                    ><Checkbox 

                    checked = {isChecked || [...category].includes(id)}
                    
                    onChange={(e:any)=>{
                        if(!e.target.checked){
                            handleRemoveListValue(id, setCategory)
                        }
                        setChecked(e.target.checked)
                    }
                    } id = {`category-${id}`}/></span>
                </div>
            </label>
        </>
    );

}