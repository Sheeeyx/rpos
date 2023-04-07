import React from "react";
import { Button, Collapse, Rate, Row , Typography} from "antd";
import { NavLink } from "react-router-dom";
import { Table } from "antd";
import { useGetReviewsList } from "../../../../services/queries/use-get-reviews-list";
import { SpinLoader } from "../../../../components/Spin/spin";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
const { Title } = Typography;


const ReviewsList = ({page, setPage}:any) => {

    const { data: resList, isLoading } = useGetReviewsList(page);
   

    const columns = [
        {
            title: "Email",
            dataIndex: "user",
            key: "user",
            id: "id",
            width: "33.333333%",
            render: (user:any, id:any) => {
                return(
                        <div key={id}>
                            <a target='_blank' rel="noreferrer" href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                    
                )
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Rate",
            dataIndex: "rate",
            key: "rate",
            data: "id",
            width: 250,
            render: (dataIndex:number, data: any) => {
                return(
                        <div key={data.id}>
                            <Rate value={dataIndex} disabled/> 
                            <span style={{marginLeft: 15}}>{dataIndex}</span>
                        </div>
                    
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
                    width: "100%"
                }}>
                <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                   Reviews
                </Title>
                    {!isLoading && <ExportCSVButton data = {resList.results} name="Review"/>}
                </div>
                {!isLoading ? (
                     <Table
                     dataSource={resList.results} 
                     columns={columns}
                     style={{width: "100vw"}}
                     pagination={{
                       showTotal: total => `Total ${total} Items`,
                       total: resList.count,
                       current: page,
                       onChange: (page) => setPage(page),
                       pageSize: 25,
                       }}
                       />
                  
                ) : <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default ReviewsList;
