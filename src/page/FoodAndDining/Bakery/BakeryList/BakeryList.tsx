import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Input, Popconfirm, Row, Typography } from "antd";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useGetBakeryList } from "../../../../services/queries/use-get-bakery-list";
import { SpinLoader } from "../../../../components/Spin/spin";
import { Menu } from "../../Menu";
import useDeleteBekery from "../../../../services/mutation/food-and-dining/bakery/delete/use-delete-bakery";
import { useGetBekeryMenuList } from "../../../../services/queries/food-and-dining/bakery/menu/use-get-bakery-menu";
import useGetBakeryMealList from "../../../../services/queries/food-and-dining/bakery/meal/use-get-meal";
import useBakeryDeleteMenu from "../../../../services/mutation/food-and-dining/bakery/menu/delete/use-delete-menu";
import useBakeryDeleteMeal from "../../../../services/mutation/food-and-dining/bakery/meal/delete/use-delete-meal";
import useCreateBakeryMenu from "../../../../services/mutation/food-and-dining/bakery/menu/create/use-create-menu";
import useCreateBakeryMeal from "../../../../services/mutation/food-and-dining/bakery/meal/create/use-create-meal";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
import useSearchBakery from "../../../../services/mutation/food-and-dining/bakery/use-search-bakery";
import useUpdateBakeryDetail from "../../../../services/mutation/food-and-dining/bakery/update/detail/use-update-detail";
import useUpdateBakeryMeal from "../../../../services/mutation/food-and-dining/bakery/update/meal/use-update-meal";
import { ImportCSVButton } from "../../../../components/Button/ImportCSVButton";
import useUpdateBakeryMedia from "../../../../services/mutation/food-and-dining/bakery/update/media/use-update-bakery-media";
import useUpdateBakeryMenu from "../../../../services/mutation/food-and-dining/bakery/update/menu/use-menu-update";
import getStoredState from "redux-persist/es/getStoredState";
const  {Title} = Typography

const  {Search} = Input

const BakeryList = ({page, setPage}:any) => {

    const {data: bakeryList, isLoading, refetch} = useGetBakeryList(page);

    const {mutate} = useDeleteBekery();

    const navigate = useNavigate();

    const searchReastaurant = useSearchBakery();
    const [bakerys, setBakerys]  = useState<any>();

    const handleUpdate = (id:any) => {
        navigate(`/food-and-dining/bakery/update/${id}/`);
    }

     const handleDelete = (id: any) => {
         mutate(id, {
             onSuccess: () => {
                 queryClient.invalidateQueries(`bakery-page=${page}`);
                 refetch()
                 toast.success("Bakery deleted successfully");
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
            getMenuList = {useGetBekeryMenuList} 
            getMealList = {useGetBakeryMealList}
            deleteMenuItem = {useBakeryDeleteMenu}
            deleteMealItem = {useBakeryDeleteMeal}
            createMenuItem = {useCreateBakeryMenu}
            createMealItem = {useCreateBakeryMeal}
            updateMealItem = {useUpdateBakeryMeal}
            updateDetail = {useUpdateBakeryDetail}
            useUpdateMenu = {useUpdateBakeryMenu}
            itemName = {"bakery"}
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
         
              searchReastaurant.mutate(value, {
                onSuccess:(res)=> {
                  setBakerys(res);
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
              <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                Bakeries
              </Title>
                
              
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ImportCSVButton typeMode="Bakery" page={page} updateMode = "bakery"/>
                    <ExportCSVButton data = {bakeryList.results} name = "Bakeries"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/food-and-dining/bakery/create">+ Create</NavLink>
                </Button>
            </div>
           
                
                {
                    !isLoading ?
                    <Table 
                        style = {{ width: '100vw'}}
                        dataSource={ bakerys?.results || bakeryList.results} 
                        columns={columns}
                        pagination={{
                          showTotal: total => `Total ${total} Items`,
                          total: bakerys?.count===0 ? 0 : bakerys?.count || bakeryList.count,
                          current: page,
                          onChange: (page) => setPage(page),
                          pageSize: 25,
                          }} />
                    : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default BakeryList;
