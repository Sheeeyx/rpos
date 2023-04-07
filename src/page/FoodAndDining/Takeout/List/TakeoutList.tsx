import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Input, Popconfirm, Row, Typography } from "antd";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { SpinLoader } from "../../../../components/Spin/spin";
import { Menu } from "../../Menu";
import { useGetTakeout } from "../../../../services/queries/use-get-takeout";
import useDeleteTakeout from "../../../../services/mutation/food-and-dining/takeout/delete/use-delete-takeout";
import { useGetTakeOutMenuList } from "../../../../services/queries/food-and-dining/take-out/menu/use-get-menu";
import useGetTakeOutMealList from "../../../../services/queries/food-and-dining/take-out/meal/use-get-meal";
import useTakeOutDeleteMenu from "../../../../services/mutation/food-and-dining/takeout/menu/delete/use-delete-menu";
import useTakeOutDeleteMeal from "../../../../services/mutation/food-and-dining/takeout/meal/delete/use-delete-meal";
import useCreateTakeOutMenu from "../../../../services/mutation/food-and-dining/takeout/menu/create/use-create-menu";
import useCreateTakeOutMeal from "../../../../services/mutation/food-and-dining/takeout/meal/create/use-create-meal";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
import useSearchTakeout from "../../../../services/mutation/food-and-dining/takeout/use-search-takeout";
import useUpdateTakeoutMeal from "../../../../services/mutation/food-and-dining/takeout/update/meal/use-update-meal";
import { useGetTakeOutDetailMeal } from "../../../../services/queries/food-and-dining/take-out/meal/detail/use-get-meal-detail";
import { ImportCSVButton } from "../../../../components/Button/ImportCSVButton";
import useUpdateTakeoutMenu from "../../../../services/mutation/food-and-dining/takeout/update/menu/use-update-menu";

const { Search } = Input;
const {Title} = Typography;

const TakeoutList = ({page, setPage}:any) => {

    const {data: resList, isLoading, refetch} = useGetTakeout(page);

    const {mutate} = useDeleteTakeout();

    const navigate = useNavigate();

    const handleUpdate = (id:any) => {
        navigate(`/food-and-dining/takeout/update/${id}/`);
    }

     const handleDelete = (id: any) => {
         mutate(id, {
             onSuccess: () => {
                queryClient.invalidateQueries(`takeout-page=${page}`);
                refetch()
                toast.success("Takeout deleted successfully");
             },
             onError: ( ) => {
                toast.error("Something went wrong. Please try again");
             },
         });
     };
    
     const [takeout, setTakeout] = useState<any>();

     const searchTakeout = useSearchTakeout();

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
            getMenuList = {useGetTakeOutMenuList} 
            getMealList = {useGetTakeOutMealList}
            deleteMenuItem = {useTakeOutDeleteMenu}
            deleteMealItem = {useTakeOutDeleteMeal}
            createMenuItem = {useCreateTakeOutMenu}
            createMealItem = {useCreateTakeOutMeal}
            updateMealItem = {useUpdateTakeoutMeal}
            updateDetail = {useGetTakeOutDetailMeal}
            useUpdateMenu = {useUpdateTakeoutMenu}
            itemName = {"take_out"}
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
            searchTakeout.mutate(value, {
              onSuccess:(res)=> {
                setTakeout(res);
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
                  Takeout
                </Title>
          
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ImportCSVButton typeMode = "TakeOut" page={page} updateMode="takeout"/>
                    <ExportCSVButton data = {resList.results} name = "Takeout"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/food-and-dining/takeout/create">+ Create</NavLink>
                </Button>
            </div>
        
                {
                    !isLoading ?
                    <Table 
                        style={{width: "100vw"}} 
                        dataSource={takeout?.count > 0 ? takeout?.results : takeout?.results || resList?.results} 
                        columns={columns}
                        pagination={{
                            showTotal: total => `Total ${total} Items`,
                            total: takeout?.count===0 ? 0 : takeout?.count || resList.count,
                            current: page,
                            onChange: (page) => setPage(page),
                            pageSize: 25}} />
                    : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default TakeoutList;
