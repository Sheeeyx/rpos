import React, { useState } from "react";
import { Button, Col, Row, Select, Typography, Form, RadioChangeEvent, Radio } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import UploadImg from "../../../../components/Upload/UploadImg";
import { Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import "./Restaurant.sass";
import TextArea from "antd/lib/input/TextArea";
import MultiField from "../../../../components/MultiField/MultiField";
import useCreateResaurant from "../../../../services/mutation/food-and-dining/restaurant/create/use-create-restaurant";
import { toast } from "react-toastify";
import { useGetFoodTypeTags } from "../../../../services/queries/use-food-type-tags";
import { useGetGoodForTags } from "../../../../services/queries/use-get-good-for";
import { useGetItHasTags } from "../../../../services/queries/use-get-it-has-tags";
import { useGetServiceOptionTags } from "../../../../services/queries/use-get-service-option";
import Map from "../../../../components/Maps/Maps";
const { Option } = Select;


const { Title } = Typography;

const RestaurantCreate = (props) => {

    const CreteRestaurant = useCreateResaurant();
    const  [goodForList, setgoodForList] = useState([]);
    const  [serviceOptionsList, setserviceOptionsList] = useState([]);
    const  [itHasList, setitHasList] = useState([]);
    const  [foodTypeList, setfoodTypeList] = useState([]);
    const [certificateImg, setCertificateImg] = useState([]);
    const getFoodTypeTags = useGetFoodTypeTags();
    const getGoodForTags =   useGetGoodForTags();
    const getItHasTags = useGetItHasTags();
    const getServiceOptionTags =  useGetServiceOptionTags();
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [placeName, setPlaceName] = useState();
    const [typeModel, setTypeModel] = useState();
    
    const [imgIdList, setImgIdList] = useState([]); 
    const [reverseTable, setReverseTable] = useState();
    const [orderSites, setOrderSites] = useState();
    const [checkImg, setCheckImg] = useState(false);


    const navigate = useNavigate()
    const checkClick = () => {
        if(certificateImg.length === 0){
            setCheckImg(true)
        } else {
            setCheckImg(false)
        }
    }

    const onSubmit = (data) => {
        
    console.log(orderSites, 'oreder')
    console.log(reverseTable, 'reserve')
           CreteRestaurant.mutate(  
               {...data,
               it_has: itHasList,
               good_for: goodForList,
               food_type: foodTypeList,
               service_option: serviceOptionsList,
               files: imgIdList,
               certificate_file: certificateImg[0],
               latitude: location.latitude,
               longitude: location.longitude,
               type_model: typeModel,
               place_name: placeName,
               reserve_sites: reverseTable,
               order_sites: orderSites,
               },
   
               {
                   onSuccess: (res) => {
                       toast.success("Restaurant has been successfully created");
                       navigate("/food-and-dining/restaurant/list");
                   },
           
                   onError: (e) => {
                       toast.error("Something went wrong! Try again");
                   },
               }
           );
    }

    return (
        <div className="restaurant">
            <Title level={3} style={{ marginBottom: 30 }}>
                Restaurant
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
                <NavLink to="/food-and-dining/restaurant/list">Go Back</NavLink>
            </Button>
            <div>
                <Form  onFinish={onSubmit}>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem
                                label={"Name of your restaurant"}
                                name="name"
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
                    style={{ marginBottom: 10 }}
                    >
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
                                label = 'Restaurant type'
                                rules={[
                                {
                                    required: true,
                                    message: "Please enter Restaurant type",
                                }
                                ]}
                            >
                                <Select 
                                required
                                size="large"
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
                                label={"Description"}
                                name="type_model"
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
                                        required
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
                                required
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
                                    required
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
                                    <Select required   key={item.id}>
                                        {item.name}
                                    </Select>
                                )}
                            </Select>
                            </FormItem>
                        </Col>
                        </Row>
                        <Row style={{ width: "100%", marginBottom: 20 }}>
                            
                            <Row style={{ width: "100%", marginBottom: 10 }}>
                            <Title level={4}>Good for</Title>
                            </Row>
                            <Col span={24}>
                            <FormItem
                            name="Good for options"
                            rules={[
                            {
                                required: true,
                                message: "Please enter Good for options",
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
                                         setgoodForList([...goodForList, parseInt(item)])
                                        }
                                         
                                     }} 
                        >
                                {getGoodForTags.data && getGoodForTags.data.results.map((item, index)=>
                                    <Select  key={item.id}>
                                        {item.name}
                                    </Select>
                                )}  
                        </Select>
                        </FormItem>
                        </Col>
                        </Row>
                    <Col style={{ width: "100%", marginBottom: 20 }}>
                        <FormItem
                            label={"What note should pay attention"}
                            name="please_note"
                        >
                            <TextArea showCount maxLength={400} />
                        </FormItem>
                    </Col>
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
                        <Title level={4}>Reserve table</Title>
                            <MultiField
                                label="Reserve table"
                                setValue = {setReverseTable}
                            />
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <Title level={4}>Order sites</Title>
                        <MultiField
                            label="Order sites"
                            setValue= {setOrderSites}
                        />
                    </div>

                    <div style={{ marginTop: 50 }}>
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

export default RestaurantCreate;