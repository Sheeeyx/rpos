import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Input, Popconfirm, Row, Typography } from "antd";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import useDeleteRestaurantList from "../../../../services/mutation/food-and-dining/restaurant/delete/use-delete-restaurant-list";
import { useGetBakeryList } from "../../../../services/queries/use-get-bakery-list";
import { SpinLoader } from "../../../../components/Spin/spin";
import { Menu } from "../../Menu";
import { useGetSupermarkets } from "../../../../services/queries/use-get-supermarkets";
import useDeleteSupermarkets from "../../../../services/mutation/food-and-dining/supermarket/delete/use-delete-supermarkets";
import { useGetSuperMarketMenuList } from "../../../../services/queries/food-and-dining/supermarket/menu/use-get-menu";
import useGetSuperMarketMealList from "../../../../services/mutation/food-and-dining/supermarket/meal/use-get-meal";
import useSuperMarketDeleteMenu from "../../../../services/mutation/food-and-dining/supermarket/menu/delete/use-delete-menu";
import useSuperMarketDeleteMeal from "../../../../services/mutation/food-and-dining/supermarket/meal/delete/use-delete-meal";
import useCreateSuperMarketMenu from "../../../../services/mutation/food-and-dining/supermarket/menu/create/use-create-menu";
import useCreateSupermarketMeal from "../../../../services/mutation/food-and-dining/supermarket/meal/create/use-create-meal";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
import useSearchSupermarkets from "../../../../services/mutation/food-and-dining/supermarket/use-search-supermarket";
import useUpdateSupermarketMeal from "../../../../services/mutation/food-and-dining/supermarket/update/meal/use-update-meal";
import { useGetSupermarketDetailMeal } from "../../../../services/queries/food-and-dining/supermarket/meal/use-get-meal-detail";
import { ImportCSVButton } from "../../../../components/Button/ImportCSVButton";
import useUpdateSupermarketMenu from "../../../../services/mutation/food-and-dining/supermarket/update/menu/use-update-menu";

const { Title } = Typography;
const {Search} = Input

const SupermarketsList = ({page, setPage}:any) => {

    const {data: resList, isLoading,refetch} = useGetSupermarkets(page);

    const {mutate} = useDeleteSupermarkets();

    const navigate = useNavigate();

    const handleUpdate = (id:any) => {
        navigate(`/food-and-dining/supermarkets/update/${id}/`);
    }

     const handleDelete = (id: any) => {
         mutate(id, {
             onSuccess: () => {
                queryClient.invalidateQueries(`supermarkets-page=${page}`);
                refetch()
                toast.success("SupermarketsList deleted successfully");
             },
             onError: () => {
                 toast.error("Something went wrong. Please try again");
             },
         });
     };
    

     const searchSupermarkets = useSearchSupermarkets();

     const [supermarket, setSuperMarket] = useState<any>();

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Note',
          dataIndex: 'please_note',
          key: 'note',
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
            getMenuList = {useGetSuperMarketMenuList} 
            getMealList = {useGetSuperMarketMealList}
            deleteMenuItem = {useSuperMarketDeleteMenu}
            deleteMealItem = {useSuperMarketDeleteMeal}
            createMenuItem = {useCreateSuperMarketMenu}
            createMealItem = {useCreateSupermarketMeal}
            updateMealItem = {useUpdateSupermarketMeal}
            updateDetail = {useGetSupermarketDetailMeal}
            useUpdateMenu = {useUpdateSupermarketMenu}
            itemName = {"supermarket"}
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
            searchSupermarkets.mutate(value, {
              onSuccess:(res)=> {
                setSuperMarket(res);
              }
            })
          }, 600) ;
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
             
                <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                    Supermarkets
                </Title>
          
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ImportCSVButton typeMode="SuperMarket"  page={page} updateMode = "supermarkent"/>
                    <ExportCSVButton data = {resList.results} name = "Supermarkets"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/food-and-dining/supermarkets/create">+ Create</NavLink>
                </Button>
            </div>
                {
                    !isLoading ?
                    <Table 
                        style={{width: "100vw"}} 
                        dataSource={supermarket?.count > 0 ? supermarket?.results : supermarket?.results || resList?.results} 
                        columns={columns}  
                        pagination={{
                            showTotal: total => `Total ${total} Items`,
                            total: supermarket?.count===0 ? 0 : supermarket?.count || resList.count,
                            current: page,
                            onChange: (page) => setPage(page),
                            pageSize: 25}} />
                      
                    : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default SupermarketsList;
