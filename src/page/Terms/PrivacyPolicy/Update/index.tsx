import React, { RefObject, useRef } from "react";
import { Input, Row, Button, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { toast } from "react-toastify";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import queryClient from "../../../../configs/react-query.config";
import { SpinLoader } from "../../../../components/Spin/spin";
import useUpdatePrivacyPolicy from "../../../../services/mutation/terms/privacy-policy/update/use-update";
import { useGetDetailsPrivacyPolicy } from "../../../../services/queries/use-get-detail-privacy";

const { TextArea } = Input;

export const PrivacyPolicyUpdate: React.FC = () => {
    const { mutate, isLoading } = useUpdatePrivacyPolicy();

    const navigate = useNavigate();

    const params = useParams();

    const detail = useGetDetailsPrivacyPolicy(params.id as string);

    const handleSubmit = (data: any, id: string | undefined) => {
        mutate(
            { data, id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`privacy-policy${id}`);
                    toast.success("Privacy Policy updated successfully");
                    navigate("/terms/privacy-policy/list");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    return (
        <>
            <Button
                style={{
                    position: "absolute",
                    top: "29px",
                    right: "32px",
                }}
                type="default"
                size="large"
            >
                <NavLink to="/terms/privacy-policy/list">Go Back</NavLink>
            </Button>
            <div className="faq">
                {!detail.isLoading ? (
                    <Form
                        onFinish={(data: any) => handleSubmit(data, params.id)}
                    >
                        <div>
                            <FormItem
                                name="title"
                                label="Title:"
                                initialValue={detail.data.title}
                                rules={[
                                    {
                                        required: true,
                                        message: "Is required field",
                                    },
                                ]}
                            >
                                <Input
                                    name="title"
                                    style={{ marginBottom: "18px" }}
                                />
                            </FormItem>

                            <FormItem
                                name="description"
                                label="Description:"
                                initialValue={detail.data.description}
                                rules={[
                                    {
                                        required: true,
                                        message: "Is required field",
                                    },
                                ]}
                            >
                                <TextArea
                                    name="description"
                                    style={{ marginBottom: "18px" }}
                                />
                            </FormItem>
                        </div>

                        <Row justify="start" style={{ marginTop: 40 }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={isLoading}
                                style={{ width: 120, fontSize: 18 }}
                            >
                                Save
                            </Button>
                        </Row>
                    </Form>
                ) : <SpinLoader/>
                }
            </div>
        </>
    );
};
