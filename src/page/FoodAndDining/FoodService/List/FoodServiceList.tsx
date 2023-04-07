import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Modal, Row, Input, Table, Typography, Popconfirm } from "antd";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { SpinLoader } from "../../../../components/Spin/spin";
import { Menu } from "../../Menu";
import { useGetFoodService } from "../../../../services/queries/use-get-food-service";
import useDeleteFoodService from "../../../../services/mutation/food-and-dining/food-service/delete/use-delete-food-service";
import { useGetFoodServiceMenuList } from "../../../../services/queries/food-and-dining/food-service/menu/use-get-meal";
import useGetFoodServiceMealList from "../../../../services/queries/food-and-dining/food-service/meal/use-get-meal";
import useFoodServiceDeleteMenu from "../../../../services/mutation/food-and-dining/food-service/menu/delete/use-delete-menu";
import useFoodServiceDeleteMeal from "../../../../services/mutation/food-and-dining/food-service/meal/delete/use-delete-meal";
import useCreateFoodServiceMenu from "../../../../services/mutation/food-and-dining/food-service/menu/create/use-create-menu";
import useCreateFoodServiceMeal from "../../../../services/mutation/food-and-dining/food-service/meal/create/use-create-meal";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
import useSearchFoodService from "../../../../services/mutation/food-and-dining/food-service/use-search-food-service";
import { useGetFoodServiceDetailMeal } from "../../../../services/queries/food-and-dining/food-service/meal/detail/use-get-meal-detail";
import useUpdateFoodServiceMeal from "../../../../services/mutation/food-and-dining/food-service/update/meal/use-update-meal";
import { ImportCSVButton } from "../../../../components/Button/ImportCSVButton";
import useUpdateFoodServiceMenu from "../../../../services/mutation/food-and-dining/food-service/update/menu/use-menu-update";
const { Title } = Typography;
const {Search} = Input;

const FoodServiceList = ({page, setPage}:any) => {
    const { data: resList, isLoading } = useGetFoodService(page);
    const { mutate } = useDeleteFoodService();

    const navigate = useNavigate();
    const [foodService, setFoodService] = useState<any>();
    const searchFoodService =  useSearchFoodService()

    const handleUpdate = (id:any) => {
        navigate(`/food-and-dining/food-service/update/${id}/`);
    }



    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`food-service-page=${page}`);
                toast.success("Food Service deleted successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };
    

      
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Note',
          dataIndex: 'please_note',
          key: 'please_note',
        },
        {
          title: 'Address',
          dataIndex: 'place_name',
          key: 'place_name',
        },
        {
            title: 'Menu',
            dataIndex: 'id',
            key: 'id',
            render:(dataIndex:any) =><Menu id={dataIndex} 
            title="Menu" 
            key={dataIndex} 
            getMenuList = {useGetFoodServiceMenuList} 
            getMealList = {useGetFoodServiceMealList}
            deleteMenuItem = {useFoodServiceDeleteMenu}
            deleteMealItem = {useFoodServiceDeleteMeal}
            createMenuItem = {useCreateFoodServiceMenu}
            createMealItem = {useCreateFoodServiceMeal}
            updateMealItem = {useUpdateFoodServiceMeal}
            updateDetail = {useGetFoodServiceDetailMeal}
            useUpdateMenu = {useUpdateFoodServiceMenu}
            itemName = {"food_service"}
            />
          },
        {
            title:'Actions',
            dataIndex:'id',
            width: 100,
            render:(dataIndex:any) =>{
                return (
                    <>
                        <EditOutlined onClick={()=>handleUpdate(dataIndex)} style={{color: "#1890ff", cursor: "pointer"}}/>
                        <Popconfirm title="Sure to delete?" okText='Confirm' onConfirm={() =>handleDelete(dataIndex)}>
                          <DeleteOutlined style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                        </Popconfirm>
                    </>
                )
            }
        }
      ];

      const handleSearch = (value:any)=>{
       
          setTimeout(()=>{
            searchFoodService.mutate(value, {
              onSuccess:(res)=> {
                setFoodService(res);
              }
            })
          }, 1000) ;
    }
      

    return (
        <>
            <Row>
                
                
            <div className="wrapper" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                marginBottom: 30
            }}>
              <Title style={{width: '50%', fontSize: "30px" }}>
                    Food Service
              </Title>
                
              
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ImportCSVButton typeMode="FoodService" page={page} updateMode = "bakery"/>
                    <ExportCSVButton data = {resList.results} name = "FoodService"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/food-and-dining/food-service/create">+ Create</NavLink>
                </Button>
            </div>
              
                {
                    !isLoading ?
                    <Table 
                        style={{width: "100vw"}} 
                        dataSource={foodService?.results || resList.results} 
                        columns={columns} 
                        pagination={{
                            showTotal: total => `Total ${total} Items`,
                            total: foodService?.count===0 ? 0 : foodService?.count || resList.count,
                            current: page,
                            onChange: (page) => setPage(page),
                            pageSize: 25,
                            }} /> : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default FoodServiceList;

