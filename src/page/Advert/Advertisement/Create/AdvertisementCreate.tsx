import React, { useState } from "react";
import { Button, Col, Collapse, Row, Input, Form, DatePicker, Typography } from "antd";
// import "./RestaurantList.sass";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import UploadImg from "../../../../components/Upload/UploadImg";
import moment from "moment";
import useCreateAdvertisement from "../../../../services/mutation/advertisement/ads/create/use-create-advertisement";
import { AlgorithmList } from "../../components/algorithm/algorithm";

const Datapickers: any = DatePicker

const { Title } = Typography;

const AdvertisementCreate = () => {


    const [imgId, setImgId] = useState([]);
    const navigate = useNavigate();
    const { mutate } = useCreateAdvertisement();
    const [status, setStatus] = useState(null);
    const [initialDate, setInitialDate] = useState<any>(null)
    
    const dataPick = (data:any,dateString:any) => {
        setInitialDate(dateString)
    }

    const onSubmit = (data:any) => {
        const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');
        const endDate = (data.endDate) ? (data.endDate).format('YYYY-MM-DD') : null;


      mutate({
        title: data.title,
        algorithm: status,
        url: data.url,
        file: imgId[0],
        start_date: startDate,
        end_date: endDate
      } as any, {
            onSuccess: () => {
                toast.success("Advertisement create successfully");
                navigate("/advert/advertisement/list");
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
                <NavLink to="/advert/advertisement/list">Go Back</NavLink>
            </Button>
            <Row>

             <Form  onFinish={onSubmit} style={{width: "100%"}}>
                    <Row justify="start" gutter={[30, 20]}>
                        <Col span={9}>
                            <FormItem
                                label={"Title"}
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter title",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Url"}
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
                       <Col span={24}>
                       <FormItem>
                            <Title level={4}>Add image</Title>
                            <UploadImg setImgIdList = {setImgId} onesType cropSize = {2 / 1}/>
                            </FormItem>
                       </Col>

                       <Col span={24}>
                       <FormItem>
                            <Title level={4} style={{marginBottom: 20}}>Select your advertising algorithm</Title>
                            <AlgorithmList setStatus = {setStatus}/>
                            </FormItem>
                       </Col>
                        

                        <Col span={9}>
                            <Title level={4}>Date time</Title>
                            <FormItem
                                label={"Start time"}
                                name="startDate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter time",
                                    },
                                ]}
                            >
                                
                                 <Datapickers 
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode} 
                                    // defaultValue={moment()}  
                                    disabledDate={(current:any) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                      }} 
                                    onChange = {dataPick}
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                            <FormItem
                                label={"End time"}
                                name="endDate"
                            >
                                
                                 <Datapickers 
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode}
                                    disabledDate={(current:any) => {
                                        let customDate = moment(initialDate).format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD").add(1, 'day') ;
                                      }} 
                                    // defaultValue={moment()}  
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
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
        </>
    );
};

export default AdvertisementCreate;
