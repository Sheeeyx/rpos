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

export const MenuUpdate = ({setCurrentStep, useUpdateMenu,menuId,itemName, Id}:any)=>{

    const [showMeal, setShowMeal] =  useState(false);
    const updateMenu = useUpdateMenu(menuId);

    const handleAddMenu = (data:any)=>{
        updateMenu.mutate({
            ...data,
            [itemName]: Id
        }, {
        onSuccess: (res:any)=>{
            toast.success("Menu updated");
            setCurrentStep((prevState:number)=>prevState-4);
            queryClient.invalidateQueries(`menu-${itemName}-${Id}`);
        },
        onError(){
            toast.error("Something went wrong. Please try again");
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
                     <Title level={3}>Edit menu</Title>
                        <Button
                        onClick={()=>setCurrentStep((prevState:number)=>prevState-4)}
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
          <Row justify="end" style={{marginTop:82}}>
          <Button
              type="primary"
              htmlType="submit"
              style={{ width: 120, fontSize: 18 }}
          >
              Save
          </Button>
      </Row>
    </Form> 
        </div>
     
    )


}