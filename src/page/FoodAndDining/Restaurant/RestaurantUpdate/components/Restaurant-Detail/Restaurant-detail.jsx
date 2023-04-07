import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Select, Typography, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import queryClient from '../../../../../../configs/react-query.config';
import UploadImg from '../../../../../../components/Upload/UploadImg';
import TextArea from "antd/lib/input/TextArea";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUpdateDetail from '../../../../../../services/mutation/food-and-dining/restaurant/update/detail/use-update-detail';
import Map from '../../../../../../components/Maps/Maps';
import MultiField from '../../../../../../components/MultiField/MultiField';
const { Option } = Select;

const { Title } = Typography;


export const RestaurantDetail = ({data=[]}) => {

    const params = useParams();
    const { mutate } = useUpdateDetail();
    const [certificateImg, setCertificateImg] = useState([]);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [placeName, setPlaceName] = useState();
    const [reserveSites, setReserveSites] = useState();
    const [orderSites, setOrderSites] = useState();
    const [typeModel, setTypeModel] = useState();

    const onFinish = (data, id) => {
        console.log(orderSites,'orderSites')
        console.log(reserveSites,'reserveSites')

        mutate(
            {
                data: {
                    ...data,
                    certificate_file: certificateImg[0],
                    latitude: location.latitude,
                    longitude: location.longitude,
                    place_name: placeName,
                    type_model: typeModel,
                    order_sites: orderSites,
                    reserve_sites: reserveSites
                },
                id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`detail-restaurant${params.id}`);
                    toast.success("Details update successfully");
                }, 
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    useEffect(()=>{

        if(data?.certificate_file?.id){
            setCertificateImg([data.certificate_file.id]);
        }

    }, [data?.certificate_file])

    useEffect(()=>{
       setTypeModel(data?.type_model)
    },[data?.type_model]);
    
    return (
        <div>
            <Form onFinish={(data) => onFinish(data, params.id)}>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem
                                label={"Name of your restaurant"}
                                name="name"
                                initialValue = {data.name}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter name of your restaurant",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Country"}
                                name="country"
                                initialValue = {data.country}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter country",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row
                        justify="start"
                        gutter={30}
                        style={{ marginBottom: 10 }}
                    >
                        <Col span={9}>
                            <FormItem
                                label={"Phone number"}
                                name="phone_number"
                                initialValue = {data.phone_number}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter phone number",
                                    },
                                ]}
                            >
                                <Input defaultValue="+1" />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"City"}
                                name="city"
                                initialValue = {data.city}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter country",
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row
                        justify="start"
                        gutter={30}
                        style={{ marginBottom: 10 }}
                    >
                        <Col span={9}>
                                <FormItem
                                    label={"Kosher Label"}
                                    name="certificate_name"
                                    initialValue={data.certificate_name}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter Kosher Label",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={9}>
                                <p className="type">Restaurant type :</p>
                                <Select 
                                className='type-select'
                                size="large"
                                label={"Certificate name"}
                                defaultValue= {data.type_model}
                                style={{ width: '100%', borderRadius: '6px'}}
                                onChange={(value) => {
                                setTypeModel(value)
                                }} >
                                    <Option key={'dairy'}>Dairy</Option>
                                    <Option key={'pareve'}>Parevee</Option>
                                    <Option key={'meat'}>Meat</Option>
                                </Select>
                        </Col>
                    </Row>
                    <Row style = {{margin: "18px 0"}}>
                        <FormItem>
                            <Title level={4}>Upload Certificate</Title>
                           <UploadImg setImgIdList = {setCertificateImg} files = {[data.certificate_file]} onesType cropSize = {false}/>
                        </FormItem>
                    </Row>
                    <Col style={{ width: "100%", marginBottom: 20 }}>
                        <FormItem
                            label={"What note should pay attention"}
                            name="please_note"
                            initialValue = {data.please_note}
                        >
                            <TextArea showCount maxLength={400} />
                        </FormItem>
                    </Col>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem label={"Website URL"} name="website" initialValue={data.website}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Facebook URL"} name="facebook_url" initialValue={data.facebook_url}>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem label={"Twitter URL"} name="twitter_url" initialValue={data.twitter_url}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Instargam URL"} name="instagram_url" initialValue={data.instagram_url}>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 16 }}>
                        <Title level={4}>Reserve table</Title>
                        <MultiField
                            setValue={setReserveSites}
                            defaultValue = {data.reserve_sites}
                        />
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Title level={4}>Order sites</Title>
                        <MultiField
                            setValue={setOrderSites}
                            defaultValue = {data.order_sites}
                        />
                    </div>
                    <div style={{ marginTop: 50 }}>
                            <Title level={4}>Address</Title>
                            <Map setLocation={setLocation} setPlaceName = {setPlaceName} defaultAddress = {{
                                lat: +data.latitude,
                                lng: +data.longitude
                            }}
                            defaultPlaceName = {data.place_name}
                            />
                    </div>
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
        </div>
    )
}