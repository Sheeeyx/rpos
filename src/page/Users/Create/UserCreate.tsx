import React, {useState} from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { toast } from "react-toastify";
import moment from "moment";
import UploadImg from "../../../components/Upload/UploadImg";
import useCreateUser from "../../../services/mutation/users/create-users";
import { NavLink } from "react-router-dom";
const { Option } = Select;
const { Title } = Typography;

const Datapickers: any = DatePicker


export const UserCreate = () => {
    const [status, setStatus] = useState();
    const [ugroup, setUgroup] = useState();
    const [initialDate, setInitialDate] = useState<any>(null)
    const [imgId, setImgId] = useState([]);
    const dataPick = (data:any,dateString:any) => {
        setInitialDate(dateString)
    }
    const createUser = useCreateUser();
    console.log(createUser);
    const onSubmit = (data:any) => {
    
        createUser.mutate(
            {
                ...data,
                ugroup: ugroup,
                status: status,
                // id: 5
            },
            {
                onSuccess: (res) => {
                    toast.success("Bakery has been successfully created!");
                    // navigate("/food-and-dining/bakery/list");
                },
        
                onError: (e) => {
                    toast.error("Something went wrong! Try again");
                },
            }
        );
    }
    // const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');


    return(
        <div className="restaurant">
             <div className="wrapper">
                <Title style={{ marginBottom: "40px", fontSize: "24px" }}>
                    Создать пользователей
                </Title>
            </div>
            <Button
                style={{
                    position: "absolute",
                    top: "29px",
                    right: "32px",
                }}
                type="default"
                size="large"
            >
                <NavLink to="/users/list">Назад</NavLink>
            </Button>
            <Form onFinish={onSubmit}>
                <Row justify="start" gutter={30}>
                            <Col span={8}>
                                <FormItem
                                    label={"Фамилия"}
                                    name="fname"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter fname",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label={"Имя"}
                                    name="lname"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter Имя",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label={"Отчество"}
                                    name="surname"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter Отчество",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                </Row>
                <Row justify="start" gutter={30}>
                            <Col span={8}>
                                <FormItem
                                    label="Имя пользователя"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter имя пользователя",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label={"Электронная почта"}
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter Электронная почта",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="Пароль"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter Пароль",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                </Row>
                <Row justify="start" gutter={30}>
                            <Col span={8}>
                                <FormItem
                                    label={"urights"}
                                    name="urights"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter urights",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                            <FormItem
                                name="Ugroup"
                                label = 'Ugroup'
                                rules={[
                                {
                                    required: true,
                                    message: "Please enter Status type",
                                }
                                ]}
                            >
                                <Select 
                                size="large"
                                style={{ width: '100%'}}
                                onChange={(value) => {
                                    setUgroup(value)
                                }} >
                                    <Option key={'admin'}>Admin</Option>
                                    <Option key={'user'}>User</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span={8}>
                                
                            <FormItem
                                name="Status type"
                                label = 'Тип статуса'
                                rules={[
                                {
                                    required: true,
                                    message: "Please enter Status type",
                                }
                                ]}
                            >
                                <Select 
                                size="large"
                                style={{ width: '100%'}}
                                onChange={(value) => {
                                    setStatus(value)
                                }} >
                                    <Option key={'1'}>Активный</Option>
                                    <Option key={'0'}>Заблокирован</Option>
                                </Select>
                            </FormItem>
                            </Col>
                </Row>
                <Row justify="start" gutter={30}>
                    <Col span={24}>
                       <FormItem>
                            <Title level={4}>Add image</Title>
                            <UploadImg setImgIdList = {setImgId} onesType cropSize = {3 / 1} type = "gif"/>
                            </FormItem>
                    </Col>
                </Row>
                <Row>
                <Col span={8}>
                            <FormItem
                                label={"Дата рождения"}
                                name="bod"
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
                                    
                                    onChange = {dataPick}
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                            </Col>
                </Row>
                <Row>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: 120, fontSize: 18, marginLeft: "auto" }}
                        
                    >
                        Сохранить
                    </Button>
                </Row>
                        {/* <Row justify="start" gutter={30}>
                            <Col span={9}>
                                <FormItem
                                    label={"Name"}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter name of your bakery",
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
                                        label = 'Bakery type'
                                        rules={[
                                        {
                                            required: true,
                                            message: "Please enter Bakery type",
                                        }
                                        ]}
                                    >
                                    <Select 
                                    size="large"
                                    style={{ width: '100%'}}
                                    onChange={(value) => {
                                    setTypeModel(value)
                                    }} >
                                        <Option key={'kosher_bakery'}>Kosher Bakery</Option>
                                        <Option key={'kosher_grocery'}>Kosher Grocery</Option>
                                        <Option key={'some_kosher_items'}>Some Kosher Items</Option>
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
                                    name="Food Types"
                                    rules={[
                                    {
                                        required: true,
                                        message: "Please enter Food types !",
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
                                    message: "Please enter It has",
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
                            <Title level={4}>Reserve table</Title>
                            <MultiField
                                label="Website"
                                setValue={setReverseTable}
                            />
                        </div>
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
                        </Row> */}
            </Form>
        </div>
    )
}

export default UserCreate;