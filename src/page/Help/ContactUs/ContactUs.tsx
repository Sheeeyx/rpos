import React, { useState } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Title from "antd/lib/typography/Title";
import { toast } from "react-toastify";
import useCreateContactUs from "../../../services/mutation/help/contact-us/use-create-contact-us";
import { useGetContactUs } from "../../../services/queries/use-get-contact-us";
import { SpinLoader } from "../../../components/Spin/spin";
import queryClient from "../../../configs/react-query.config";

const ContactUs = () => {
    const [value, setValue] = useState({ description: "" as any });
    const { mutate, isLoading } = useCreateContactUs();
    const { data: contactUs, isLoading: loadingContanct } = useGetContactUs();

    const handleSubmit = (data: any) => {
        console.log(data)
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(`contact`);
                toast.success("Contact Us created successfully");
            },
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };
    const handleChange = (value: any) => {
        setValue({ description: value });
    };

    return (
        <>
            <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                Contact Us
            </Title>

            <div className="contact">
                {!loadingContanct ? (
                    <Form onFinish={handleSubmit}>
                        <div style={{ maxWidth: "700px", width: "100%" }}>
                          <Row gutter={[30, 20]}>
                        <Col span = {12}>
                        <FormItem
                                name="email"
                                label = "Email"
                                initialValue={contactUs?.email}
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
                          <Col span = {12}>
                          <FormItem
                                name="phone_number"
                                label = "Phone number"
                                initialValue={contactUs?.phone_number}
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
                            <Col span = {12}>
                            <FormItem
                                name="place_name"
                                label = "Address"
                                initialValue={contactUs?.place_name}
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
                            <Col span = {12}>
                            <FormItem
                                name="facebook_url"
                                label = "Facebook"
                                initialValue={contactUs?.facebook_url}
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
                           <Col span = {12}>
                           <FormItem
                                name="twitter_url"
                                label = "Twitter"
                                initialValue={contactUs?.twitter_url}
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
                            <Col span = {12}>
                            <FormItem
                                name="telegram_url"
                                label = "Telegram"
                                initialValue={contactUs?.telegram_url}
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
                ) : <SpinLoader/>
                }
            </div>
        </>
    );
};

export default ContactUs;
