import { Button, Col, Form, Row, Select, Typography } from "antd";
import UploadImg from "../../../../components/Upload/UploadImg";
import { Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import MultiField from "../../../../components/MultiField/MultiField";
import Map from "../../../../components/Maps/Maps";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetFoodTypeTags } from "../../../../services/queries/use-food-type-tags";
import { useGetItHasTags } from "../../../../services/queries/use-get-it-has-tags";
import { useGetServiceOptionTags } from "../../../../services/queries/use-get-service-option";
import useCreateFoodService from "../../../../services/mutation/food-and-dining/food-service/create/use-create-food-service";
const { Option } = Select;

const { Title } = Typography;

export const FoodServiceCreate= () => {
    const navigate = useNavigate();
    const foodServiceCreate = useCreateFoodService();
    const getFoodTypeTags = useGetFoodTypeTags();
    const getItHasTags = useGetItHasTags();
    const getServiceOptionTags =  useGetServiceOptionTags();
    const  [serviceOptionsList, setserviceOptionsList] = useState([]);
    const  [itHasList, setitHasList] = useState([]);
    const  [foodTypeList, setfoodTypeList] = useState([]);
    const [certificateImg, setCertificateImg] = useState([]);
    const [imgIdList, setImgIdList] = useState([]); 
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [orderSites, setOrderSites] = useState([]);
    const [placeName, setPlaceName] = useState();
    const [typeModel, setTypeModel] = useState();
    const [checkImg, setCheckImg] = useState(false);


    const checkClick = () => {
        if(certificateImg.length === 0){
            setCheckImg(true)
        } else {
            setCheckImg(false)
        }
    }


    const onSubmit = (data) => {
    
        foodServiceCreate.mutate(
            {...data,
                it_has: itHasList,
                food_type: foodTypeList,
                service_option: serviceOptionsList,
                files: imgIdList,
                certificate_file: certificateImg[0],
                latitude: location.latitude,
                longitude: location.longitude,
                type_model: typeModel,
                place_name: placeName,
                order_sites: orderSites,
                good_for: [],
                reserve_sites: ["google.com"]
            },

            {
                onSuccess: (res) => {
                    toast.success("Food Service has been successfully created!");
                    navigate("/food-and-dining/food-service/list");
                },
        
                onError: (e) => {
                    toast.error("Something went wrong! Try again");
                },
            }
        );
    }

    return (
        <div>
            <Title level={3} style={{ marginBottom: 30 }}>
                Food Service
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
                <NavLink to="/food-and-dining/food-service/list">Go Back</NavLink>
            </Button>
            <div>
                <Form  onFinish={onSubmit}>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem
                                label={"Name"}
                                name="name"
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
                                label={"Country"}
                                name="country"
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
                    style={{ marginBottom: 10 }}>
                    <Col span={9}>
                            <FormItem
                                label={"Kosher Label"}
                                name="certificate_name"
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
                            <FormItem
                                    name="Type Model options"
                                    label = 'Food Service type'
                                    rules={[
                                    {
                                        required: true,
                                        message: "Please enter Food Service type",
                                    }
                                    ]}
                                >
                                <Select 
                                size="large"
                                label={"Food Service type"}
                                style={{ width: '100%'}}
                                onChange={(value) => {
                                setTypeModel(value)
                                }} >
                                    <Option key={'dairy'}>Dairy</Option>
                                    <Option key={'pareve'}>Parevee</Option>
                                    <Option key={'meat'}>Meat</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style = {{margin: "18px 0"}}>
                        <FormItem>
                            <Title level={4}>Upload Certificate</Title>
                           <UploadImg setImgIdList = {setCertificateImg} onesType cropSize = {false}/>
                           {(checkImg && certificateImg.length === 0) &&
                                <p style={{color: 'red'}}>Upload Certificate please!</p>
                            }
                        </FormItem>
                    </Row>
                    <Row>
                    <Col style={{ width: "100%", marginBottom: 20 }}>
                        <FormItem
                            label={"What note should pay attention"}
                            name="please_note"
                        >
                            <TextArea showCount maxLength={400} />
                        </FormItem>
                    </Col>
                    </Row>
                    <Row>
                        <FormItem>
                            <Title level={4}>Add images</Title>
                           <UploadImg setImgIdList = {setImgIdList} cropSize = {1.53 / 1}/>
                        </FormItem>
                    </Row>
                    {
                            (imgIdList.length > 0 && imgIdList.length < 3) &&
                            <div style={{color: 'red', padding: '0 0 20px'}}>
                                Please insert three images !
                            </div>
                        }
                    <Row style={{ width: "100%", marginBottom: 40 }}>
                            
                        <Row style={{ width: "100%", marginBottom: 10 }}>
                        <Title level={4}>Food types</Title>
                        </Row>
                        <Col span={24}>
                        <FormItem
                            name="Food types options"
                            rules={[
                            {
                                required: true,
                                message: "Please enter Food types",
                            }
                            ]}
                        >
                        <Select
                                onChange={(value) => {
                                   for(let item of value){
                                    setfoodTypeList([...foodTypeList, parseInt(item)])
                                   }
                                    
                                }} 
                                getPopupContainer={trigger => trigger.parentNode}
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                    >
                            {getFoodTypeTags.data && (getFoodTypeTags.data.results).map((item, index)=>
                                <Select.Option key={item.id}>
                                    {item.name}
                                </Select.Option>
                            )} 
                    </Select>
                        </FormItem>
                        
                    </Col>
                    </Row>
                    <Row style={{ width: "100%", marginBottom: 40 }}>
                            
                        <Row style={{ width: "100%", marginBottom: 10 }}>
                        <Title level={4}>Service options</Title>
                        </Row>
                        <Col span={24}>
                        <FormItem
                            name="Service options"
                            rules={[
                            {
                                required: true,
                                message: "Please enter Service options",
                            }
                            ]}
                        >
                            <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    getPopupContainer={trigger => trigger.parentNode}
                                    placeholder="Please select"
                                    onChange={(value) => {
                                        for(let item of value){
                                        setserviceOptionsList([...serviceOptionsList, parseInt(item)])
                                        }
                                        
                                    }} 
                        >
                                {getServiceOptionTags.data && getServiceOptionTags.data.results.map((item, index)=>
                                    <Select key={item.id}>
                                        {item.name}
                                    </Select>
                                )} 
                            </Select>
                        </FormItem>
                    </Col>
                    </Row>
                    <Row style={{ width: "100%", marginBottom: 40 }}>
                            
                            <Row style={{ width: "100%", marginBottom: 10 }}>
                            <Title level={4}>It has</Title>
                            </Row>
                            <Col span={24}>
                            <FormItem
                            name="It has options"
                            rules={[
                            {
                                required: true,
                                message: "Please enter It has options",
                            }
                            ]}
                            >
                                <Select
                                        mode="multiple"
                                        allowClear
                                        getPopupContainer={trigger => trigger.parentNode}
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={(value) => {
                                            for(let item of value){
                                            setitHasList([...itHasList, parseInt(item)])
                                            }
                                            
                                        }} 
                            >
                                    {getItHasTags.data && getItHasTags.data.results.map((item, index)=>
                                        <Select   key={item.id}>
                                            {item.name}
                                        </Select>
                                    )} 
                                </Select>
                            </FormItem>
                        </Col>
                        </Row>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem
                                name="website"
                                label={"Website URL"}
                                rules={[
                                {
                                    required: true,
                                    message: "Please enter Website",
                                }
                                ]}
                            >
                                    <Input />
                             </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Facebook URL"} name="facebook_url">
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem label={"Twitter URL"} name="twitter_url">
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Instargam URL"} name="instagram_url">
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 16 }}>
                        <Title level={4}>Order sites</Title>
                        <MultiField
                            label="Website"
                            setValue={setOrderSites}
                        />
                    </div>
                    <div style={{ marginTop: 50 }}>
                            <Title level={4}>Address</Title>
                            <Map setLocation={setLocation} setPlaceName = {setPlaceName}/>
                    </div>

                    <Row justify="end" style={{ marginTop: 40 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: 120, fontSize: 18 }}
                            disabled = {!(imgIdList.length > 2)}
                            onClick={checkClick}
                        >
                            Save
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
