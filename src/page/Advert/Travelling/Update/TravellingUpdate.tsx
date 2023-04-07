import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Row, Input, Form, DatePicker, Typography } from "antd";
// import "./RestaurantList.sass";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";
import UploadImg from "../../../../components/Upload/UploadImg";
import moment from "moment";
import { AlgorithmList } from "../../components/algorithm/algorithm";
import TextArea from "antd/lib/input/TextArea";
import { CategoryList } from "../../components/category";
import { SpinLoader } from "../../../../components/Spin/spin";
import { useGetDetailTravelling } from "../../../../services/queries/use-detail-travelling";
import useUpdateTravelling from "../../../../services/mutation/use-update-travelling";
import queryClient from "../../../../configs/react-query.config";

const Datapickers: any = DatePicker

const { Title } = Typography;

const TravellingUpdate = () => {


    const [imgId, setImgId] = useState([]);
    const {id} = useParams();
    const {data, isLoading} = useGetDetailTravelling(id as string);
    const navigate = useNavigate();
    const { mutate } = useUpdateTravelling();
    const [category, setCategory] = useState([])
    const [status, setStatus] = useState(null);
    const [initialDate, setInitialDate] = useState<any>()

    const dataPick = (data:any,dateString:any) => {
        setInitialDate(dateString)
    }

    console.log(data)

    useEffect(()=>{

        if(data?.file.id){
            
            setImgId([data.file.id] as any);
          
        }

        if(data?.category){
            setCategory(new Set(data?.category) as any)
        }

    }, [isLoading])
    
    const onSubmit = (data:any) => {
        
        const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');
        const expStartDate = moment.utc(data.startDate).format('YYYY-MM-DD');
        const expEndDate = (data.endDate) ? (data.endDate).format('YYYY-MM-DD') : null;
        const categories = [...category]

        
      mutate({
        id:  id,
        data: {
        title: data.title,
        description: data.description || null,
        price: data.price,
        button_name: data.button_name || null,
        algorithm: status,
        url: data.url || null,
        phone_number:  data.phone_number,
        credit_card: data.credit_card || null,
        address:  data.address,
        email:  data.email,
        file: imgId[0],
        category: categories.length> 0 ? categories : ["food_dining"],
        exp_start_date: expStartDate,
        exp_end_date: expEndDate,
        start_date: startDate,
        end_date: expEndDate,
        }
      } as any, {
            onSuccess: () => {
                queryClient.invalidateQueries(`detail-travelling-${id}`);
                toast.success("Travelling Deal update successfully");
                navigate("/advert/travelling/list");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    return (
        <Row>
            <Title style={{ marginBottom: "40px", fontSize: "28px" }}>
                Update Travelling Deals 
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
                <NavLink to="/advert/travelling/list">Go Back</NavLink>
            </Button>
            {!isLoading ? 
            <Row>
                    <Form  onFinish={onSubmit} style={{width: "100%"}}>
                    <Row justify="start" gutter={[30, 20]}>
                        <Col span={9}>
                            <FormItem
                                label={"Ad Name"}
                                name="title"
                                initialValue={data.title}
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
                                initialValue={data.url}
                                rules={[
                                    {
                                        required: false,
                                        type:'url',
                                        message: `Please enter correct URL!
                                        example: "https://example.com"`,
                                    },
                                ]}
                            >
                                <Input/>
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Price $"}
                                name="price"
                                initialValue ={data.price}
                                rules={[
                                    {
                                        required: false,
                                        message: "Please enter price",
                                    },
                                ]}
                            >
                                <Input type="number" />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Button name"}
                                name="button_name"
                                initialValue={data.button_name}
                                rules={[
                                    {
                                        required: false,
                                        message: "Please enter button name",
                                    },
                                ]}
                            >
                                <Input/>
                            </FormItem>
                        </Col>
                    <Col span={24}>
                    <FormItem>
                            <Title level={4}>Add image</Title>
                            <UploadImg setImgIdList = {setImgId} onesType files = {[data.file] as any} cropSize = {1.8 / 1}/>
                            </FormItem>
                    </Col>
                    <Col span={18}>
                                <FormItem
                                    label={"Description"}
                                    name="description"
                                    initialValue={data.description}
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                "Please input your description",
                                        },
                                    ]}
                                >
                                    <TextArea showCount maxLength={700}/>
                                </FormItem>
                            </Col>

                    <Col span={24}>
                    <FormItem>
                            <Title level={4} style={{marginBottom: 20}}>Select your advertising algorithm</Title>
                            <AlgorithmList setStatus = {setStatus} defaultValue = {data.algorithm}/>
                            </FormItem>
                    </Col>
                    {/* <Col span={24} style={{marginBottom: 20}}>
                    <Title level={4} style={{marginBottom: 10}}>Select Category</Title>
                        <CategoryList setCategory = {setCategory} category = {category}/>
                    
                    </Col> */}
                        
                        

                    <Col span={9} style={{marginBottom:10}}>
                            <Title level={4}>Select your advertising dates</Title>
                            <FormItem
                                label={"Set deal start-end dates"}
                                name="startDate"
                                initialValue={moment(data.start_date, "YYYY-MM-DD")}
                            >
                                
                                <Datapickers
                                    defaultValue={moment(data.start_date, "YYYY-MM-DD")}
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode} 
                                    format={'YYYY-MM-DD'}/>
                            
                            </FormItem>
                            <FormItem
                                label={"Set deal start-end dates"}
                                name="endDate"
                              
                            >
                                
                                <Datapickers 
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode}
                                    defaultValue={data.end_date ? moment(data.end_date, "YYYY-MM-DD") : false}
                                    disabledDate={(current:any) => {
                                        let customDate = moment(initialDate).format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD").add(1, 'day');
                                      }} 
                                    // defaultValue={moment()}  
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
                                initialValue={data.email || ""}
                            >
                                <Input/>
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"In store address (optional)"}
                                name="address"
                                initialValue={data.address || ""}
                            >
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Phone number (optional)"}
                                name="phone_number"
                                initialValue={data.phone_number || ""}
                            >
                                <Input/>
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem
                                label={"Category"}
                                name="credit_card"
                                initialValue={data.credit_card || ""}
                            >
                                <Input/>
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
             :
             <SpinLoader/>

         }
     
        </Row>
    );
};

export default TravellingUpdate;
