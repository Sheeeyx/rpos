import React, { useState } from "react";
import { Button, Col, Typography, Row, Image, Popconfirm } from "antd";
import Search from "antd/lib/input/Search";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined, CameraOutlined } from "@ant-design/icons"
import { useGetChabadList } from "../../../../services/queries/use-get-chabad-list";
import useSearchChabad from "../../../../services/mutation/jewish-resources/chabad/search-chabad";
import useDeleteChabadList from "../../../../services/mutation/jewish-resources/chabad/delete/use-delete-chabad-list";
import { SpinLoader } from "../../../../components/Spin/spin";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";

const  {Title} = Typography
// list
const ChabadList = ({page, setPage}:any) => {
    const { data: resList, isLoading } = useGetChabadList(page);
    const { mutate } = useDeleteChabadList(resList); 
    const [chabad, setChabad] = useState<any>();
    const searchChabad = useSearchChabad();

    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`chabadList-page=${page}`);
                toast.success("Chabad deleted successfully");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    const columns = [
        {
            title: "Files",
            dataIndex: "files",
            key: "files",
            width: 140,
            render: (linkImg:any) =>    
                
                linkImg[0]?.file ? <Image src={ linkImg[0]?.file} alt = "photo"/> :<CameraOutlined style={{ fontSize: 25, marginLeft: 20}} />
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',  
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: 'Place name',
            dataIndex: 'place_name',
            key: 'place_name',
          },
          {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
          },
        {
            title:'Actions',
            dataIndex:'id',
            width: 100,
            render:(dataIndex:any) =>{
                return (
                    <>
                        <NavLink to = {`/jewish-resources/chabad/chabad-update/${dataIndex}/`}><EditOutlined/></NavLink>
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
         
            searchChabad.mutate(value, {
                onSuccess:(res)=> {
                    setChabad(res);
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
                Chabad
              </Title>
                
                {!isLoading &&
                    <>
                     <Row style={{width: '100%',justifyContent: "flex-end", marginRight: 40}}>
                    <Col span={12}>
                      
                        <Search onChange = {(e)=> handleSearch(e.target.value)} placeholder="Search..."  enterButton/>
                    </Col>
                    </Row> 
                    <ExportCSVButton data = {resList.results} name = "Chabad"/>
                    </> }
                    <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/jewish-resources/chabad/create">+ Create</NavLink>
                </Button>
            </div>
               
                {!isLoading ? (
                <Row style={{overflow: "hidden"}}>
                    <Table 
                        style={{width: "100vw"}} 
                        dataSource={chabad?.results || resList.results} 
                        columns={columns}
                        pagination={{
                            showTotal: total => `Total ${total} Items`,
                            total: chabad?.count===0 ? 0 : chabad?.count || resList.count,
                            current: page,
                            onChange: (page) => setPage(page),
                            pageSize: 25}} />
                </Row>
                ) : <SpinLoader />
                }
            </Row>
        </>
    );
};

export default ChabadList;
