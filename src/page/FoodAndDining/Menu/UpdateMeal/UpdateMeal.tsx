import React, { useState, useEffect } from "react";
import { Button, Row, Form, Col, Input, Typography } from 'antd'
import queryClient from "../../../../configs/react-query.config";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import UploadImg from "../../../../components/Upload/UploadImg";
import { toast } from "react-toastify";
const { Title } = Typography;

export const UpdateMeal = ({setCurrentStep, menuId, mealId, updateMealItem,updateDetail,itemName}:any)=>{

    const updateMeals  = updateMealItem(menuId,mealId)
    const { data: resList, isLoading } = updateDetail(mealId);


    const [imgIdList, setImgIdList] = useState([]); 

    
    useEffect(()=>{

        if(resList?.photo.id){
            setImgIdList([resList?.photo.id] as any);
        }

    }, [resList?.photo])
    
    const handleAddMeal = (data:any)=>{

        updateMeals.mutate({
            ...data,
             menu:menuId,
             photo: imgIdList[0]
            
        }, {
        onSuccess: (res:any)=>{
            queryClient.invalidateQueries(`meal-${itemName}-${mealId}`);
            toast.success("Meal updated")
            setCurrentStep((prevState:number)=>prevState-3);
        },
        onError: ()=>{
            toast.error("Something went wrong. Please try again")
        }
    })
        
    }
    return(
        <>
            {
                !isLoading &&
                <div>
                    <Row style={{
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        }}>
                            <Title level={3}>Update meal</Title>
                                <Button
                                onClick={()=>setCurrentStep((prevState:number)=>prevState-3)}
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
                        initialValue={resList?.name}
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
                        initialValue={resList?.price}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter price",
                            },
                        ]}
                    >
                        <Input type = "number"/>
                    </FormItem>
                </Col>
                </Row>
                    <Row style = {{margin: "18px 0"}}>
                                <FormItem>
                                    <Title level={4}>Add image</Title>
                                <UploadImg setImgIdList = {setImgIdList} files = {[resList?.photo]} onesType cropSize = {1.23 / 1}/>
                                </FormItem>
                            </Row>
                <Row>
                    
                <Col span={18}>
                    <FormItem
                        label={"Description"}
                        name="description" 
                        initialValue={resList?.description}
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
                    disabled = {updateMeals.isLoading}
                    style={{ width: 120, fontSize: 18 }}
                >
                Save
                </Button>
            </Row>
                </Form>
            </Row>
                </div>
            }
        </>
     
    )
}