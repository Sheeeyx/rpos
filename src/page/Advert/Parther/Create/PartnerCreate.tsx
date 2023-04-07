import React, { useState } from "react";
import { Button, Col, Row, Input, Form, DatePicker, Typography } from "antd";
// import "./RestaurantList.sass";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import UploadImg from "../../../../components/Upload/UploadImg";
import moment from "moment";
import { AlgorithmList } from "../../components/algorithm/algorithm";
import TextArea from "antd/lib/input/TextArea";
import { CategoryList } from "../../components/category";
import useCreatePartner from "../../../../services/mutation/advertisement/partner/use-create-partner";

const Datapickers: any = DatePicker

const { Title } = Typography;

const PartnerCreate = () => {


    const [imgId, setImgId] = useState([]);
    const navigate = useNavigate();
    const { mutate } = useCreatePartner();
    const [status, setStatus] = useState(null);
    
    const onSubmit = (data:any) => {
    
        const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');

        const endDate = (data.endDate) ? (data.endDate).format('YYYY-MM-DD') : null;

        
      mutate({
          
        title: data.title,
        description: data.description,
        price: data.price,
        button_name: data.button_name,
        algorithm: status,
        url: data.url,
        phone_number:  data.phone_number,
        address:  data.address,
        email:  data.email,
        file: imgId[0],
        start_date: startDate,
        end_date: endDate
      } as any, {
            onSuccess: () => {
                toast.success("Partner Deal create successfully");
                navigate("/advert/partner/list");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    return (
        <Row>
            <Title style={{ marginBottom: "40px", fontSize: "28px" }}>
                Create Partner Advertising Deals
            </Title>
            <Button
                style={{
                    position: "absolute",
                    top: "29px",
                    right: "32px",
                }}
                type="default"
                size="large"
            >
                <NavLink to="/advert/partner/list">Go Back</NavLink>
            </Button>
            <Row>

             <Form  onFinish={onSubmit} style={{width: "100%"}}>
                    <Row justify="start" gutter={[30, 20]}>
                        <Col span={9}>
                            <FormItem
                                label={"Ad Name"}
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter name",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"URL"}
                                name="url"
                                rules={[
                                    {
                                        required: true,
                                        type:'url',
                                        message: `Please enter correct URL!
                                        example: "https://example.com"`,
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Price $"}
                                name="price"
                            >
                                <Input type="number" />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Button name"}
                                name="button_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter button name",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                       <Col span={24}>
                       <FormItem>
                            <Title level={4}>Add image</Title>
                            <UploadImg setImgIdList = {setImgId} onesType cropSize = {1.8 / 1}/>
                            </FormItem>
                       </Col>
                       <Col span={18}>
                                <FormItem
                                    label={"Description"}
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your description",
                                        },
                                    ]}
                                >
                                    <TextArea showCount maxLength={700} />
                                </FormItem>
                            </Col>

                       <Col span={24}>
                       <FormItem>
                            <Title level={4} style={{marginBottom: 20}}>Select your advertising algorithm</Title>
                            <AlgorithmList setStatus = {setStatus}/>
                            </FormItem>
                       </Col>
                        <Col span={9} style={{marginBottom:10}}>
                            <Title level={4}>Select your advertising dates</Title>
                            <FormItem
                                label={"Set deal start date"}
                                name="startDate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter date",
                                    },
                                ]}
                            >
                                
                                 <Datapickers
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode} 
                                    disabledDate={(current:any) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                      }}  
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                            <FormItem
                                label={"Set deal end date"}
                                name="endDate"
                            >
                                
                                 <Datapickers
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode} 
                                    
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                        </Col>
                    
                
                        <Col span={24}>
                        <Title level={4}>Personal informations</Title>
                        </Col>
                            
                            <Col span={9}>
                            <FormItem
                                label={"Email (optional)"}
                                name="email"
                            >
                                <Input type="email"/>
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"In store address (optional)"}
                                name="address"
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Phone number (optional)"}
                                name="phone_number"
                            >
                                <Input />
                            </FormItem>
                        </Col>
                       
                    </Row>
                    
                    
                    <Row justify="end" style={{ marginTop: 40 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: 120, fontSize: 18 }}
                        >
                            Save
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Row>
    );
};

export default PartnerCreate;
