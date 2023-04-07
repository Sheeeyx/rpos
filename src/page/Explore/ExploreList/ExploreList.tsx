import React, { useState } from "react";
import { Button, Col, Collapse, Empty, Row , Image, Popconfirm} from "antd";
import "./ExploreList.sass";
import { toast } from "react-toastify";
import queryClient from "../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetExploreList } from "../../../services/queries/use-get-explore-list";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined, CameraOutlined, DownloadOutlined } from "@ant-design/icons";
import useDeleteExploreList from "../../../services/mutation/explore/create-explore/delete/use-delete-explore-list";
import Title from "antd/lib/typography/Title";
import { SpinLoader } from "../../../components/Spin/spin";
import {ExportCSVButton} from "../../../components/Button/ExportCSVButton"
import Search from "antd/lib/input/Search";
import useSearchExplore from "../../../services/mutation/explore/search/search-explore";

const { Panel } = Collapse;

const ExploreList = ({page, setPage}:any) => {
    const { data: resList, isLoading } = useGetExploreList(page);
    const { mutate } = useDeleteExploreList(resList);
    const [exploreList, setExploreList] = useState<any>();
    const searchExplore = useSearchExplore();

    const handleSearch = (value:any)=>{
        setTimeout(()=>{
         
            searchExplore.mutate(value, {
                onSuccess:(res)=> {
                    setExploreList(res);
                }
              })
       }, 1000) ;
      }

    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`exploreList-page=${page}`);
                toast.success("Explore deleted successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };
    
    
    const columns = [
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            width:140,
            render: (linkImg:any) => linkImg?.file ? <Image src={linkImg.file} alt = "photo"/> : <CameraOutlined style={{ fontSize: 25, marginLeft: 20}} />,
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        
        {
            title: "Tag",
            dataIndex: "id",
            width: 100,
            render: (dataIndex: any) => {
                return (
                    <>
                        <NavLink to = {`/explore/explore-update/${dataIndex}/`}><EditOutlined/></NavLink>
                        <Popconfirm title="Sure to delete?" okText='Confirm' onConfirm={() =>handleDelete(dataIndex)}>
                          <DeleteOutlined style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                        </Popconfirm>
                    </>
                );
            },
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
                Explore
              </Title>
                
              
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e:any)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ExportCSVButton data = {resList.results} name = "Explore"/>
                    </> }
                    <Button
                type="default"
                size="large"
            >
                <NavLink to="/explore/create-explore">+ Create</NavLink>
            </Button>
            </div>
        
        </Row>
           
                {!isLoading ? (
                <Row style={{overflow: "hidden-x"}}>
                    <Table 
                      pagination={{
                        showTotal: total => `Total ${total} Items`,
                        total: exploreList?.count===0 ? 0 : exploreList?.count || resList.count,
                        current: page,
                        onChange: (page) => setPage(page),
                        pageSize: 25,
                        }}
                        style = {{width: "100vw"}} 
                        dataSource={exploreList?.results || resList.results} 
                        columns={columns}
                         />
                </Row>
                ) : <SpinLoader/>
                }
        </>
    );
};

export default ExploreList;
