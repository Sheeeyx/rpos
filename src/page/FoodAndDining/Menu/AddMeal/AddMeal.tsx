import React, { useState } from "react";
import { Button, Row, Form, Col, Input, Typography } from 'antd'
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import UploadImg from "../../../../components/Upload/UploadImg";
import { toast } from "react-toastify";
const { Title } = Typography;

export const AddMeal = ({setCurrentStep, menuId, AddMealItem}:any)=>{


    const createMeal = AddMealItem(menuId);

    const [imgIdList, setImgIdList] = useState([]); 

    const handleAddMeal = (data:any)=>{

        createMeal.mutate({
            ...data,
             menu:menuId,
             photo: imgIdList[0]
            
        }, {
        onSuccess: (res:any)=>{
            toast.success("Meal created")
            setCurrentStep((prevState:number)=>prevState-2);
            /* queryClient.invalidateQueries(`menu-restaurant-${restaurantId}`); */
        },
        onError: ()=>{
            toast.error("Something went wrong. Please try again")
        }
    })
        
    }
    return(
        <div>
               <Row style={{
                   display: "flex", 
                   alignItems: "center", 
                   justifyContent: "space-between",
                }}>
                     <Title level={3}>Add meal</Title>
                        <Button
                        onClick={()=>setCurrentStep((prevState:number)=>prevState-2)}
                        type="default"
                        size="large"
                    >
                        Go Back
                        </Button>
                </Row>
        <Row style={{marginTop: 20}}>
        <Form style={{width: "100%"}} onFinish={handleAddMeal}>
        <Row gutter={[20, 20]}>
        <Col span={9}>
            <FormItem
                label={"Name"}
                name="name" 
                rules={[
                    {
                        required: true,
                        message:
                            "Please enter name",
                    },
                ]}
            >
                <Input />
            </FormItem>
        </Col>
        <Col span={9}>
            <FormItem
                label={"Price $"}
                name="price" 
                rules={[
                    {
                        required: true,
                        message:
                            "Please enter price",
                    },
                ]}
            >
                <Input   type = "number"/>
            </FormItem>
        </Col>
        </Row>
             <Row style = {{margin: "18px 0"}}>
                        <FormItem>
                            <Title level={4}>Add image</Title>
                           <UploadImg setImgIdList = {setImgIdList} onesType cropSize = {1.23 / 1}/>
                        </FormItem>
                    </Row>
        <Row>
            
        <Col span={18}>
            <FormItem
                label={"Description"}
                name="description" 
                rules={[
                    {
                        required: true,
                        message:
                            "Please enter description",
                    },
                ]}
            >
                <TextArea showCount maxLength={300} />
            </FormItem>
        </Col>
        </Row>
        <Row justify="end" style={{marginTop:40}}>
        <Button
            type="primary"
            htmlType="submit"
            disabled = {createMeal.isLoading}
            style={{ width: 120, fontSize: 18 }}
        >
           Save
        </Button>
    </Row>
        </Form>
    </Row>
        </div>
     
    )
}