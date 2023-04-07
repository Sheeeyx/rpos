import React, { RefObject, useRef } from "react";
import { Input, Row, Button, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { toast } from "react-toastify";
import useCreateFaq from "../../../../services/mutation/terms/faq/create/use-create-faq";
import { useNavigate, NavLink } from "react-router-dom";
import "../Faq.sass";

const { TextArea } = Input;

export const FaqCreate: React.FC = () => {
    const { mutate, isLoading } = useCreateFaq();
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("FAQ created successfully");
                navigate("/terms/faq/list");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
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
                <NavLink to="/terms/faq/list">Go Back</NavLink>
            </Button>
            <div className="faq">
               
                <Form onFinish={handleSubmit}>
                    <div>
                        <FormItem
                            name="title"
                            label="Title:"
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
            </div>
        </>
    );
};
