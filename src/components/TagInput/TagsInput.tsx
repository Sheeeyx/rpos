
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Row } from "antd";
import useCreateTags from "../../services/mutation/food-and-dining/tags/food-type/create/use-create-tags";
import "./TagsInput.sass";
import TagsButton from "./componets/TagsButton";
import { toast } from "react-toastify";
import queryClient from "../../configs/react-query.config";

const TagsInput = ({request, title, data, registerRequest, deleteRequest}:any) => {
   
    const [form] = Form.useForm();
    const CreateTag = request();
    const [tagList, setTagList] = useState<any>([]);

    const {data: dataTags, isLoading} = data();
    
    const handleSumbit = (data: any) => {
    
       if(tagList.includes(data.name.trim())){
            toast.info("This tag already exists");
       }else{
        CreateTag.mutate(data, {
            onSuccess(res: any) {
                setTagList([]) 
                toast.success("Tag created");
                queryClient.invalidateQueries(registerRequest);
                form.resetFields();   

            },
            onError() {
                toast.error("Something went wrong!");
            },
        });
       }
      
    };  

    useEffect(()=>{

        if(!isLoading) dataTags?.results.map((item:any)=> setTagList((prevItems: any)=> [item.name, ...prevItems]))

    },[dataTags?.results, isLoading, dataTags?.count])
    
    return (
        <div>
            <div>
                <h2>{title}</h2>
                <Form onFinish={handleSumbit} className="tag-wrapper" form={form}  >
                    <Form.Item
                        name="name"
                        
                        rules={[
                            {
                                required: true,
                                message: "Please input your tag!",
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter Tag" onChange={(e:any)=>e.target.value.trim()}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                        Save
                    </Button>
                </Form>
            </div>
            <em>press Save to add new tag</em>
            <Row style={{ marginTop: "16px" }}>
                {dataTags?.results &&  dataTags?.results?.map((tag: any) => (
                    <TagsButton 
                        title={tag.name} 
                        id={tag.id} 
                        deleteRequest = {deleteRequest}
                        type = {registerRequest}
                        setTag = {setTagList}/>
                ))}
            </Row>
        </div>
    );
};


export default TagsInput;
