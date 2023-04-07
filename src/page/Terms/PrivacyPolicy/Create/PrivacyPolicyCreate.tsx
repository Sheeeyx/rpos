import React from "react";
import {Input, Row, Button, Form } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import { toast } from "react-toastify";
import TextArea from "antd/lib/input/TextArea";
import usePrivacy from "../../../../services/mutation/terms/privacy-policy/create/use-privacy-policy";


export const PrivacyPolicyCreate: React.FC = () => {


    const { mutate, isLoading } = usePrivacy();

    const navigate = useNavigate();
    

    const handleSubmit = (data: any) => {
       
        mutate(data, {
            onSuccess: () => {
                toast.success("Privacy policy created successfully");
                navigate("/terms/privacy-policy/list")
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
                <NavLink to="/terms/privacy-policy/list">Go Back</NavLink>
            </Button>
            <div className="privacy-policy">
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
