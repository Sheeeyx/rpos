import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Table, Tabs, Row, Form, Col, Input, Typography } from 'antd'
import { useGetRestaurantMenuList } from "../../../../services/queries/use-get-restaurant-meal";
import useGetRestaurantMealList from "../../../../services/mutation/use-get-meal";
import { SpinLoader } from "../../../../components/Spin/spin";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import UploadImg from "../../../../components/Upload/UploadImg";
import useCreateRestaurantMenu from "../../../../services/mutation/use-create-menu";
import useCreateRestaurantMeal from "../../../../services/mutation/use-create-meal";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { Data } from "@react-google-maps/api";
const { Title } = Typography;

export const MenuCreate = ({setCurrentStep, restaurantId, useCreateMenu, useCreateMeal, itemName}:any)=>{


    const [menuId, setMenuId] = useState();

    const [showMeal, setShowMeal] =  useState(false);

    const createMenu = useCreateMenu();

    const createMeal = useCreateMeal(restaurantId);

    

    const [imgIdList, setImgIdList] = useState([]); 
    
    const handleAddMenu = (data:any)=>{
        createMenu.mutate({
            ...data,
            [itemName]: restaurantId
        }, {
        onSuccess: (res:any)=>{
            setShowMeal(()=>true);
            setMenuId(res.id);
            toast.success("Menu created")
            setCurrentStep((prevState:number)=>prevState-1);
            queryClient.invalidateQueries(`menu-${itemName}-${restaurantId}`);
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
                   marginBottom: 20
                }}>
                     <Title level={3}>Create menu</Title>
                        <Button
                        onClick={()=>setCurrentStep((prevState:number)=>prevState-1)}
                        type="default"
                        size="large"
                    >
                        Go Back
                        </Button>
                </Row>
        <Form onFinish={handleAddMenu}>
        <Row justify="start">
        <Col span={9}>
            <FormItem
                label={"Menu type"}
                name="name" 
                rules={[
                    {
                        required: true,
                        message:
                            "Please enter menu type",
                    },
                ]}
            >
                <Input disabled={showMeal}/>
            </FormItem>
        </Col>
        </Row>
        {!showMeal && 
          <Row justify="end" style={{marginTop: 82}}>
          <Button
              type="primary"
              htmlType="submit"
              style={{ width: 120, fontSize: 18 }}
          >
              Save
          </Button>
      </Row>}
        
      
    </Form> 
    
    
        </div>
     
    )


}