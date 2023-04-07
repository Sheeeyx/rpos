import React from "react";
import { Button, Typography, Row} from "antd";
import { NavLink } from "react-router-dom";
import { useGetCommentsList } from "../../../../services/queries/use-get-comments-list";
import { Table } from "antd";
import { ExportCSVButton } from "../../../../components/Button/ExportCSVButton";
const { Title } = Typography;


const CommentsList = ({page, setPage}:any) => {
    const { data: resList, isLoading } = useGetCommentsList(page);
    
    const columns = [
        {
            title: "Email",
            dataIndex: "user",
            key: "user",
            render: (user:any, key:any) => {
                return(
                        <div key={key.id}>
                            <a target='_blank' href={`mailto:${user.email}`}>{user.email}</a>
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
                    Comments
                </Title>
                {!isLoading && <ExportCSVButton data = {resList.results} name="Comments"/>}
                </div>
                {!isLoading && (
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
                )}
            </Row>
        </>
    );
};

export default CommentsList;
