import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Modal, Row, Form, Col, Input } from 'antd'
import { MenuList } from "./List/MenuList";
import { MenuCreate } from "./Create/MenuCreate";
import { AddMeal } from "./AddMeal/AddMeal";
import { UpdateMeal } from "./UpdateMeal/UpdateMeal";
import { MenuUpdate } from "./UpdateMenu/MenuUpdate";
 
const renderStep = (
    step: number,
    setCurrentStep: Dispatch<SetStateAction<number>>,
    setInitialTab:any,
    mutate?: any,
    isLoading?: boolean,
    data?: any,
    initialTab?:any,
    mealLoading?: boolean,
    id?: number,
    deleteMeal? :any,
    setMenuId?: any,
    menuId?:any,
    deleteMenu?: any,
    createMealItem?:any,
    createMenuItem?:any,
    itemName?: any,
    updateMealItem?:any,
    setMealId?:any,
    mealId?:any,
    updateDetail?:any,
    useUpdateMenu?:any,
  ) => {
    switch (step) {
      case 0:
        return (<MenuList
            setInitialTab = {setInitialTab} 
            mutate = {mutate}
            isLoading = {isLoading}
            data={data}
            initialTab = {initialTab} 
            mealLoading = {mealLoading}
            setCurrentStep = {setCurrentStep}
            step = {step}
            restaurantId = {id}
            deleteMeal = {deleteMeal}
            setMenuId = {setMenuId}
            deleteMenu = {deleteMenu}
            itemName = {itemName}
            setMealId = {setMealId}
            />
        )
			case 1: 
					return(
							<MenuCreate
                            restaurantId = {id}
							setCurrentStep = {setCurrentStep}
                            useCreateMenu = {createMenuItem}
                            useCreateMeal = {createMealItem}
                            itemName = {itemName}
							/>
					)
        case 2: 
        return(
                <AddMeal
                menuId = {menuId}
                setCurrentStep = {setCurrentStep}
                AddMealItem = {createMealItem}
                />
					)
        case 3: 
        return(
                <UpdateMeal
                menuId = {menuId}
                setCurrentStep = {setCurrentStep}
                updateMealItem = {updateMealItem}
                mealId = {mealId}
                updateDetail = {updateDetail}
                itemName = {itemName}
                />
					)
        case 4: 
        return(
                <MenuUpdate
                Id = {id}
                setCurrentStep = {setCurrentStep}
                useUpdateMenu = {useUpdateMenu}
                itemName = {itemName}
                menuId={menuId}
                />
                    )
			default: 
					return null;
    }
  };

export const Menu = ({title, id, getMenuList, getMealList,deleteMenuItem, deleteMealItem,createMealItem,createMenuItem,itemName,updateMealItem,updateDetail,useUpdateMenu}:any) => {
    const { data: resList, isLoading } = getMenuList(id);
    const {mutate, isLoading: mealLoading} = getMealList();
    const [initialTab, setInitialTab] = useState(null);
    const {mutate: deleteMeal, isLoading: deleteMealLoading} = deleteMealItem();
    const {mutate: deleteMenu, isLoading: deleteMenuLoading} = deleteMenuItem(id);

    const [step, setCurrentStep] = useState(0);

    const [menuId, setMenuId]= useState();
    const [mealId, setMealId]= useState();
    const [visible, setVisible] = useState(false);
    
    
    useEffect(()=>{
        if(!step && !isLoading && resList && resList.results.length > 0 &&  resList.results[0].id){
            mutate(resList.results[0].id, {
                onSuccess: (res:any)=>{
                    setInitialTab(res.results)
                    setMenuId(resList.results[0].id)
                }
            })
        }
    }, [isLoading, step, deleteMealLoading, deleteMeal, deleteMenuLoading, resList, mutate]);

    return (
        <>
            <Button onClick={() => setVisible(true)}>
                Menu
            </Button>
            {

            <Modal
                title={title}
                centered
                visible={visible}
                footer={null}
                bodyStyle={{minHeight:"330px"}}
                onCancel={() => {
                        setCurrentStep(0);
                        setVisible(false)}}
                width = {850}
                
                >
                    {
                        !isLoading &&
                        renderStep( 
                            step,
                            setCurrentStep,
                            setInitialTab,
                            mutate,
                            isLoading,
                            resList.results,
                            initialTab,
                            mealLoading,
                            id,
                            deleteMeal,
                            setMenuId,
                            menuId,
                            deleteMenu,
                            createMealItem,
                            createMenuItem,
                            itemName,
                            updateMealItem,
                            setMealId,
                            mealId,
                            updateDetail,
                            useUpdateMenu,
                        )
                    }
            </Modal>
            }
        </>
    )
}