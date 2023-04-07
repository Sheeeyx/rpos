import React from "react";
import { Button, Col, Collapse, Empty, Row, Image, Popconfirm } from "antd";
// import "./RestaurantList.sass";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "antd";
import useDeleteBanner from "../../../../services/mutation/advertisement/banner/delete/use-delete-banner";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useBannerList } from "../../../../services/queries/use-get-banner";
import { SpinLoader } from "../../../../components/Spin/spin";
import Title from "antd/lib/typography/Title";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";


// list
const BannerList = ({page, setPage}:any) => {

    const { data: resList, isLoading } = useBannerList(page);
    const {mutate} = useDeleteBanner();

    const handleDelete = (id: any) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(`banner-page=${page}`);
                toast.success("Banner deleted successfully");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    }
   
    const columns = [
        {
            title: "Image",
            dataIndex: "file",
            key: "file",
            width: 120,
            render: (linkImg:any) => <Image src={linkImg.file} alt = "photo"/>,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: (url:any) => <a href={url}>{url.slice(0, 25)}{url.length > 25 ? <span>...</span> : null}</a>,
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
                        <NavLink to = {`/advert/banner/update/${dataIndex}/`}><EditOutlined/></NavLink>
                        <Popconfirm title="Sure to delete?" okText='Confirm' onConfirm={() =>handleDelete(dataIndex)}>
                          <DeleteOutlined style={{color: "#ff3131", marginLeft:12, cursor: "pointer"}}/>
                        </Popconfirm>
                    </>
                )
            }
        }
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
            <div className="wrapper">
            <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                Banner
            </Title>
            
            </div>
                {!isLoading &&
                <>
                <Row>
                  <ExportCSVButton data = {resList?.results} name = "Banner"/>
                    {console.log(resList, page)
                    }
                  <Button
                    type="default"
                    size="large"
                >
                    <NavLink to="/advert/banner/create">+ Create</NavLink>
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
        </>
    );
};

export default BannerList;
