import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Input, Row, Table, Typography } from "antd";
import { SpinLoader } from "../../../components/Spin/spin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom";
import { UseGetUsersList } from "../../../services/queries/users/use-get-user";
const { Title } = Typography;

const UsersList = () => {

    
    const { data: resList, isLoading } = UseGetUsersList()
    console.log(resList)
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Имя пользователя",
            dataIndex: "username",
            key: "id",
        },
        {
            title: "Имя",
            dataIndex: "lname",
            key: "id",
        },
        {
            title: "Ugroup",
            dataIndex: "ugroup",
            key: "id",
        },
        {
            title: "Urights",
            dataIndex: "urights",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "user",
            id: "id",
            render: (user:any, userId:any) => {
                return(
                        <div key={userId.id}>
                            <a target='_blank' rel = "noreferrer" href={`mailto:${user}`}>{user}</a>
                        </div>
                )
            }
        },
        {
            title:'Actions',
            dataIndex:'id',
            width: 100,
            render:(dataIndex:any) =>{
                return (
                    <>
                        <NavLink to = {`/users/update/${dataIndex}/`}><EditOutlined/></NavLink>
                        {/* <Popconfirm title="Sure to delete?" okText='Confirm' onConfirm={() =>handleDelete(dataIndex)}>
                          <DeleteOutlined style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                        </Popconfirm> */}
                    </>
                )
            }
        }
    ];
             
    return (
        <Row>
            <div className="wrapper" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                marginBottom: 30
            }}>
              <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                Пользователи
              </Title>
                
                <NavLink to="/users/create">+ Создавать</NavLink>
                
            </div>

            <Row style={{overflow: "hidden"}}>
            {
                    !isLoading ?
                    <Table 
                      style={{width: "100vw"}} 
                      dataSource={resList.data} 
                      columns={columns}
                      pagination={{
                        showTotal: total => `Total ${total} Items`,
                        total: resList.data.length===0 ? 0 : resList.data.length || resList.data.length,
                        current: 1,
                        pageSize: 25,
                        }}  /> : <SpinLoader/>
                }
            </Row>
        </Row>
    );
};

export default UsersList;
