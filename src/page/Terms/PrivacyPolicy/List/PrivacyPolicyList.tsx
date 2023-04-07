import React from "react";
import { Button, Col, Collapse, Empty, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useGetLegalNotices } from "../../../../services/queries/use-get-legal-notices";
import useDeleteFaqList from "../../../../services/mutation/terms/faq/delete/use-delete-faq-list";
import { toast } from "react-toastify";
import queryClient from "../../../../configs/react-query.config";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetPrivacyPolicy } from "../../../../services/queries/use-get-privacy-policy";
import useDeletePrivacyPolicy from "../../../../services/mutation/terms/privacy-policy/delete/use-delete-privacy-policy";
import { SpinLoader } from "../../../../components/Spin/spin";
const { Panel } = Collapse;

export const PrivacyPolicyList = () => {

    const { data: policyList, isLoading } = useGetPrivacyPolicy();

    const { mutate } = useDeletePrivacyPolicy();
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries("privacy-policy");
                toast.success("Privacy Policy deleted successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    const handleUpdate = (id: string) => {
        navigate(`/terms/privacy-policy/update/${id}/`);
    };


    return (
        <>
            <Row>
                <Button
                    style={{
                        position: "absolute",
                        top: "29px",
                        right: "32px",
                    }}
                    type="default"
                    size="large"
                >
                    <NavLink to="/terms/privacy-policy/create">+ Create</NavLink>
                </Button>
                {
                    !isLoading ? 
                    <>
                        {policyList?.count > 0 ? (
                        <Col span={18}>
                            {" "}
                                <div className="list-wrapper">
                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={["1"]}
                                        expandIcon={({ isActive }) => (
                                            <CaretRightOutlined
                                                rotate={isActive ? 90 : 0}
                                            />
                                        )}
                                        className="site-collapse-custom-collapse"
                                    >
                                        {!isLoading &&
                                            policyList?.results?.map((res: any) => {
                                                return (
                                                    <>
                                                        <Panel
                                                            className="site-collapse-custom-panel"
                                                            header={res.title}
                                                            key={res.id}
                                                        >
                                                            <p>{res.description}</p>
                                                        </Panel>
                                                        <div className="group-button">
                                                            <Button
                                                                style={{
                                                                    borderRadius: "6px",
                                                                }}
                                                                danger
                                                                onClick={() =>
                                                                    handleDelete(res.id)
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                            <Button
                                                            onClick={() =>
                                                                handleUpdate(res.id)
                                                            }
                                                            type="primary"
                                                            style={{
                                                                borderRadius: "6px",
                                                            }}
                                                            >
                                                                Update
                                                            </Button>
                                                        </div>
                                                    </>
                                                );
                                            })
                                            }
                                    </Collapse>
                                </div>
                        </Col>  ) : (
                                <Empty/>
                            )}
                    </> : <SpinLoader />
                }
            </Row>
        </>
    );
};
