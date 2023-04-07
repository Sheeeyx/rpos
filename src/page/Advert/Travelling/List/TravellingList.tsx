import React from "react";
import { Button, Col, Collapse, Empty, Row, Image, Popconfirm } from "antd";
// import "./RestaurantList.sass";
import { toast } from "react-toastify";
import Title from "antd/lib/typography/Title";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { SpinLoader } from "../../../../components/Spin/spin";
import { useGetTravalling } from "../../../../services/queries/use-get-travelling";
import useDeleteTravaling from "../../../../services/mutation/use-delete-travalling";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
// list
const TravellingList = ({page, setPage}:any) => {

    const { data: resList, isLoading } = useGetTravalling(page);
    
    const { mutate } = useDeleteTravaling();

    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`travalling-deals-page=${page}`);
                toast.success("Travalling deals deleted successfully");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };


    const columns = [
        {
            title: "Image",
            dataIndex: "file",
            key: "file",
            width: 140,
            render: (linkImg:any) => <Image src={linkImg.file} alt = "photo"/>,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'Algorithm',
            dataIndex: 'algorithm',
            key: 'algorithm',
          },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'startDate',
          },
          {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'endDate',
            render: (key:any) => (key ===''|| key === null) ? 'Not Given' : <div>{key}</div>,
          },
        {
            title:'Actions',
            dataIndex:'id',  
            width: 100,
            render:(dataIndex:any) =>{
                return (
                    <>
                        <NavLink to = {`/advert/travelling/update/${dataIndex}/`}><EditOutlined/></NavLink>
                        <Popconfirm title="Sure to delete?" okText='Confirm' onConfirm={() =>handleDelete(dataIndex)}>
                          <DeleteOutlined style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                        </Popconfirm>
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
            <div className="wrapper">
            <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                Travelling Advertising Deals
            </Title>
            
            </div>
                {!isLoading &&
                <>
                <Row>
                  <ExportCSVButton data = {resList.results} name = "Travelling_Advertising_Deals"/>
                  <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/advert/travelling/create">+ Create</NavLink>
                </Button>
                </Row> 
                </>
                    
                }
            </div>
    
                {!isLoading ? (
                
                <Row style={{overflow: "hidden"}}>
                    <Table 
                        style={{width: "100vw"}} 
                        dataSource={resList.results} 
                        columns={columns}
                        pagination={{
                            showTotal: total => `Total ${total} Items`,
                            total:  resList.count,
                            current: page,
                            onChange: (page) => setPage(page),
                            pageSize: 25,
                            }} />
                </Row>
               
                ) : <SpinLoader/>
                }
           
        </Row>
    );
};

export default TravellingList;
