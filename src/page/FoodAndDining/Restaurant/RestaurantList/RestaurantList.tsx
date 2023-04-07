import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Modal, Row, Input, Table, Typography, Popconfirm } from "antd";
import "./RestaurantList.sass";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetRestaurantList } from "../../../../services/queries/use-get-restaurant-list";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import useDeleteRestaurantList from "../../../../services/mutation/food-and-dining/restaurant/delete/use-delete-restaurant-list";
import { RestaurantUpdate } from "../RestaurantUpdate/RestaurantUpdate";
import { SpinLoader } from "../../../../components/Spin/spin";
import { useGetRestaurantMenuList } from "../../../../services/queries/use-get-restaurant-meal";
import { Menu } from "../../Menu";
import useGetRestaurantMealList from "../../../../services/mutation/use-get-meal";
import useDeleteMenu from "../../../../services/mutation/use-delete-menu";
import useDeleteMeal from "../../../../services/mutation/use-delete-meal";
import useCreateRestaurantMenu from "../../../../services/mutation/use-create-menu";
import useCreateRestaurantMeal from "../../../../services/mutation/use-create-meal";
import useUpdateRestaurantMeal from "../../../../services/mutation/food-and-dining/restaurant/update/meal/use-update-meal";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
import useSearchRestaurant from "../../../../services/mutation/food-and-dining/restaurant/use-search-restaurant";
import { useGetRestaurantDetailMeal } from "../../../../services/queries/food-and-dining/restaurant/meal/use-get-restaurant-meal-detail";
import { ImportCSVButton } from "../../../../components/Button/ImportCSVButton";
import useUpdateRestaurantMenu from "../../../../services/mutation/food-and-dining/restaurant/update/menu/use-menu-update";


const { Search } = Input;
const {Title} = Typography;

const RestaurantList = ({page, setPage}:any) => {
    const { data: resList, isLoading } = useGetRestaurantList(page);
    const { mutate } = useDeleteRestaurantList(resList);
    const searchReastaurant = useSearchRestaurant();

    const [reastaurant, setReastaurant] = useState<any>();

    const navigate = useNavigate();

    const handleUpdate = (id:any) => {
        navigate(`/food-and-dining/restaurant/update/${id}/`);
    }

    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`restaurant-page=${page}`);
                toast.success("Restaurant deleted successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    
    const handleSearch = (value:any)=>{
       
          setTimeout(()=>{
            searchReastaurant.mutate(value, {
              onSuccess:(res)=> {
                setReastaurant(res);
              }
            })
          }, 600) ;
    }
      
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
            getMenuList = {useGetRestaurantMenuList} 
            getMealList = {useGetRestaurantMealList}
            deleteMenuItem = {useDeleteMenu}
            deleteMealItem = {useDeleteMeal}
            createMenuItem = {useCreateRestaurantMenu}
            createMealItem = {useCreateRestaurantMeal}
            updateMealItem = {useUpdateRestaurantMeal}
            updateDetail = {useGetRestaurantDetailMeal}
            useUpdateMenu = {useUpdateRestaurantMenu}
            itemName = {"restaurant"}
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
        },
      ];

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
              <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                Restaurants
              </Title>
                
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ImportCSVButton typeMode="Restaurant" page={page} updateMode = "restaurant"/>
                    <ExportCSVButton data = {resList.results} name = "Restaurants"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/food-and-dining/restaurant/create">+ Create</NavLink>
                </Button>
            </div>
        
               
                {
                    !isLoading ?
                    <Table 
                      style={{width: "100vw"}} 
                      dataSource={reastaurant?.count> 0 ? reastaurant?.results : reastaurant?.results || resList?.results} 
                      columns={columns}
                      pagination={{
                        showTotal: total => `Total ${total} Items`,
                        total: reastaurant?.count===0 ? 0 : reastaurant?.count || resList.count,
                        current: page,
                        onChange: (page) => setPage(page),
                        pageSize: 25,
                        }}  /> : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default RestaurantList;
