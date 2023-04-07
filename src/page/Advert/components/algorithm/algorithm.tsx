import CheckableTag from "antd/lib/tag/CheckableTag";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { tagsData } from "../tags/tagsData";
import "./algorithm.sass"

export const AlgorithmList = ({setStatus, defaultValue}: any)=>{

    const [selectedTag, setSelectedTag] = useState<any>(defaultValue || tagsData[0].status);

    useEffect(()=>{
        
        setStatus(selectedTag);

    }, []);
    
    const handleClick = (status: string)=>{
        setSelectedTag(status);
        setStatus(status);
    }


    return(
        <div className="algorithm-container">
        {tagsData.map(tag => (
         <div className="algorithm-item" onClick={()=>handleClick(tag.status)} 
                style = 
                {tag.status === selectedTag  ? 
                    {background: "rgba(30, 144, 255, .1)"}: {}}>
             <div className = "algorithm-item__heading">
                <span><img src={tag.icon} alt="Tag icon" /></span>
                <h3>{tag.title}</h3>
             </div>
             <div className = "algorithm-item__description">
                <p>{tag.description}</p>
             </div>
            
         </div>
        ))}
        </div>
    );


}