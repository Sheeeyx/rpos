import React from "react";
import { Button, Collapse, Row} from "antd";
import { NavLink } from "react-router-dom";
import { useGetIdeasList } from "../../../../services/queries/use-get-ideas-list";
import { Table, Typography } from "antd";
import { SpinLoader } from "../../../../components/Spin/spin";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
const { Title } = Typography;


const IdeasList = ({page, setPage}:any) => {


    const { data: resList, isLoading } = useGetIdeasList(page);
    
    const columns = [
        {
            title: "Email",
            dataIndex: "user",
            key: "user",
            render: (user:any, key:any) => {
                return(
                        <div key={key.id}>
                            <a target='_blank' rel = "noreferrer" href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                    
                )
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
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
                    Ideas
                </Title>
                    {!isLoading && <ExportCSVButton data = {resList.results} name="Ideas"/>}
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
                ): <SpinLoader/>
                }
            </Row>
        </>
    );
};

export default IdeasList;
