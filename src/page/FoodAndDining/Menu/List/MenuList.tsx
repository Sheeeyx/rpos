import React, { useEffect, useState } from "react";
import { Button, Image, Table, Tabs, Row, Empty, Col, Input} from 'antd'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { SpinLoader } from "../../../../components/Spin/spin";
import useDeleteMenu from "../../../../services/mutation/use-delete-menu";
import queryClient from "../../../../configs/react-query.config";
import { toast } from "react-toastify";
import useDeleteMeal from "../../../../services/mutation/use-delete-meal";
 

const { TabPane } = Tabs;

export const MenuList = ({
        setInitialTab, 
        mutate, 
        isLoading, 
        data, 
        initialTab, 
        mealLoading,
        setCurrentStep,
        step,
        restaurantId,
        deleteMeal,
        deleteMenu,
        itemName,
        setMealId,
    setMenuId}:any)=>{

    const handleDeleteMeal = (id: any) => {
        deleteMeal(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`menu-${itemName}-${restaurantId}`);
                toast.success("Meal deleted successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    const handleUpdateMeal = (id:any) => {
        setCurrentStep((prevState:number)=>prevState+3);
        setMealId(id);
    };

    const columns = [
        {
          title: 'Image',
          dataIndex: 'photo',
          key: 'img',
          width: 100,
          render:(photo:any)=> <Image src={photo.file}/>
        },
        {
          title: 'Meal name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:(price:string)=> <span>{price} $</span>
          },
          {
            title:'Actions',
            dataIndex:'id',
            render:(dataIndex:any) =>{
                return (
                    <>
                        <EditOutlined onClick={()=>handleUpdateMeal(dataIndex)} style={{color: "#1890ff", cursor: "pointer"}}/>
                        <DeleteOutlined onClick={() =>handleDeleteMeal(dataIndex)} style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                    </>
                )
            }
        }
      ];

 


    const onChange = (key: any) => {
      
        mutate(key, {
            onSuccess: (res:any)=>{
                setInitialTab(res.results);
                setMenuId(key);
            }
        })
      };

      const handleEditMenu = (id:any)=>{
        setCurrentStep((prevState:number)=>prevState+4);
      }

      const handleDeleteMenu = (id: any) => {
      
        deleteMenu(id, {
            onSuccess: (res:any)=>{
                toast.success("Menu deleted")
                queryClient.invalidateQueries(`menu-${itemName}-${restaurantId}`);
            },
            onError: ()=>{
                toast.error("Something went wrong. Please try again")
            }
        })
      };

      const handleAddMeal = ()=>{
        setCurrentStep((prevState:number)=>prevState+2);
    }
      
    return(
        <>
         <Row style={{display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 20}}>
                        <Button
                        onClick={()=>setCurrentStep((prevState:number)=>prevState+1)}
                        type="default"
                        size="large"
                    >
                        + Сreate
                        </Button>
        </Row>
      
         {              data.length > 0 ?
                        !isLoading &&
                    <Tabs onChange={onChange} type='card' size="large">
                        {
                            data.map((value:any, index: number)=>
                                <TabPane tab={value.name} key={value.id}>
                                           {
                                                !isLoading  && !mealLoading ? 
                                            <>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <Row style={{
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "flex-start", 
                                                    marginBottom: 20}}>
                                                <Button
                                                onClick={handleAddMeal}
                                                type="default"
                                                size="middle"
                                            >
                                                + Add meal
                                                </Button>
                                             </Row>
                                             <Row style={{display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 16}}>
                                                <Button
                                                type="primary"
                                                ghost
                                                onClick={()=>handleEditMenu(value.id)}
                                                size="middle"
                                                style={{marginRight:'10px'}}
                                                >
                                                Edit
                                                </Button>
                                                <Button
                                                danger
                                                onClick={()=>handleDeleteMenu(value.id)}
                                                size="middle"
                                                >
                                                Remove
                                                </Button>
                                                </Row>
                                            </div>
                                            
                                                <Table dataSource={initialTab} columns={columns} /> 
                                            </>
                                            : <SpinLoader/>
                                        }
                                </TabPane>
                            )
                        }
                    </Tabs>
                    :
                    <Row style={{
                        marginTop:120
                    }}>
                        <Empty/>
                        </Row>
                    }
        </>
    )


}