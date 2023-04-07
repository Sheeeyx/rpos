import React, { useState } from "react";
import { Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import FormItem from "antd/lib/form/FormItem";
import queryClient from "../../../configs/react-query.config";
import { Col, Input, Row, Typography } from "antd";
import { SpinLoader } from "../../../components/Spin/spin";
import useCreateAboutApp from "../../../services/mutation/about-app/create/use-create";
import { toast } from "react-toastify";
import { useGetAboutApp } from "../../../services/queries/use-get-about-app";
const { Title } = Typography;

const AboutAppList = () => {

    const [value, setValue] = useState({ description: "" as any });
    const { mutate, isLoading } = useCreateAboutApp();
    const { data: contactUs, isLoading: loadingContanct } = useGetAboutApp();

    const handleSubmit = (data: any) => {
        console.log(data)
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(`about-app`);
                toast.success("About App created successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    console.log(contactUs);
    
    const handleChange = (value: any) => {
        setValue({ description: value });
    };


    return (
        <>
            <div className="wrapper" style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
            }}>
                <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                    About App
                </Title>
                </div>
                <div>
                {!loadingContanct ? (
                    <Form onFinish={handleSubmit}>
                        <div style={{ maxWidth: "700px", width: "100%" }}>
                          <Row gutter={[30, 20]}>
                        <Col span = {24}>
                            <FormItem
                                label={"Description"}
                                name="description"
                                initialValue={contactUs?.description}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter country",
                                    },
                                ]}
                            >
                                <TextArea showCount maxLength={700} />
                            </FormItem>
                        </Col>
                          <Col span = {24}>
                          <FormItem
                                name="version"
                                label = "Version"
                                initialValue={contactUs?.version}
                                rules={[
                                    {
                                        required: true,
                                        message: "Is required field",
                                    },
                                ]}
                            >
                               <Input/>
                            </FormItem>
                          </Col>
                            <Col span = {24}>
                            <FormItem
                                name="address"
                                label = "Address"
                                initialValue={contactUs?.address}
                                rules={[
                                    {
                                        required: true,
                                        message: "Is required field",
                                    },
                                ]}
                            >
                               <Input/>
                            </FormItem>
                            </Col>
                        </Row>
                            
                        </div>
                        <Row justify="start" style={{ marginTop: 40 }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={isLoading}
                                style={{ width: 120, fontSize: 18, height: 40 }}
                            >
                                Save
                            </Button>
                        </Row>
                    </Form>
                ) : 
                    <SpinLoader/>
                }
            </div>
        </>
    );
};

export default AboutAppList;
