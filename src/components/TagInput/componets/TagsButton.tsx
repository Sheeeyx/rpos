import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./TagsButton.sass";
import useDeleteTags from "../../../services/mutation/food-and-dining/tags/food-type/use-delete-food-type";
import { toast } from "react-toastify";
import queryClient from "../../../configs/react-query.config";
interface TagsButtonProps {
    id: number;
    title: string;
    deleteRequest: any;
    type: string;
    setTag?: any
}

const TagsButton: React.FC<TagsButtonProps> = ({ id, title, deleteRequest, type, setTag }) => {

    const deleteTag = deleteRequest();
    const handleDelete = (id:number)=>{
        deleteTag.mutate(id,{
            onSuccess:()=>{
                setTag([])
                queryClient.invalidateQueries(type);
                toast.success("Tag deleted successfully");
            },
            onError:()=>{
                toast.error("Something went wrong. Please try again");
            }
        })
    }

   
    return (
        <div>
        <div className="tag-element" key={id}>
            {title}
            <button 
                onClick={()=>handleDelete(id)} 
                className="deleteBtn" 
                type="submit"
                disabled = {deleteRequest.isLoading}>
                <CloseCircleOutlined />
            </button>
        </div>
        <span className="tag-id">ID: {id}</span>
        </div>
        
    );
};

export default TagsButton;
