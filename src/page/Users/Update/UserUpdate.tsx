import React, {useEffect, useState} from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { toast } from "react-toastify";
import moment from "moment";
import UploadImg from "../../../components/Upload/UploadImg";
import useCreateUser from "../../../services/mutation/users/create-users";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useDetailUsers from "../../../services/mutation/users/detail-get";
import CustomModal from "../../../components/Modal/modal";
import PasswordInput from "./components/password";
import useUpdateUser from "../../../services/mutation/users/user-update";
import useChangeUserPassword from "../../../services/mutation/users/user-password";
const { Option } = Select;
const { Title } = Typography;

const Datapickers: any = DatePicker


export const UserUpdate = () => {
    const { mutate } = useUpdateUser();
    const changePassword = useChangeUserPassword()
    const [status, setStatus] = useState<any>();
    const [password,setPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [ugroup, setUgroup] = useState();
    const [initialDate, setInitialDate] = useState<any>(null)
    const [imgId, setImgId] = useState([]);
    const [resList, setResList] = useState([]) as any;
    const dataPick = (data:any,dateString:any) => {
        setInitialDate(dateString)
    }
    const params  = useParams();
    const navigate = useNavigate();
    const useDetailGet = useDetailUsers();
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    const handleModalOk = () => {
      console.log('Modal OK button clicked');
      handleCloseModal();
      changePassword.mutate(
        {
            id: params.id,
            old: password,
            new: newPassword,
            check: newPassword

        } as any
        ,
        {
            onSuccess: (res) => {
                toast.success("Пароль успешно изменен!");
            },
    
            onError: (e) => {
                toast.error("Проверьте старый пароль!");
            },
        }
    );
    };

    useEffect(()=>{
        useDetailGet.mutate(
            params.id as any,
            {
                onSuccess: (res) => {
                    setResList(res.data);
                    setStatus(res.data.user.status);
                    setUgroup(res.data.user.ugroup);
                    // toast.success("Bakery has been successfully created!");
                },
        
                onError: (e) => {
                    toast.error("Something went wrong! Try again");
                },
            }
        );
    },[])

    const onSubmit = (data:any) => {
    
        mutate(
            {
                ...data,
                id: params.id,
                ugroup: ugroup,
                status: status,
                img: "httpsjdfksjf"
            },
            {
                onSuccess: (res) => {
                    toast.success("Bakery has been successfully created!");
                    navigate("/users/list");
                },
        
                onError: (e) => {
                    toast.error("Something went wrong! Try again");
                },
            }
        );
    }
    // const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');
    console.log(resList?.status)
    console.log(resList)
    return(
        <div className="restaurant">
        {
            resList?.status && 
            <>
                <div className="wrapper">
                <Title style={{ marginBottom: "40px", fontSize: "24px" }}>
                    Обновлять пользователей
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
                                    initialValue={resList?.user?.fname}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter fname",
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
                                    initialValue={resList?.user?.lname}
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
                                    initialValue={resList?.user?.surname}
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
                                    initialValue={resList?.user?.username}
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
                                    initialValue={resList?.user?.email}
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
                </Row>
                <Row justify="start" gutter={30}>
                            <Col span={8}>
                                <FormItem
                                    label={"urights"}
                                    name="urights"
                                    initialValue={resList?.user?.urights}
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message:
                                    //             "Please enter urights",
                                    //     },
                                    // ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                            <FormItem
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
                                defaultValue={resList?.user?.ugroup}
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
                                defaultValue={resList?.user?.status === 1 ? 'Активный' : 'Заблокирован'}
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
                                // initialValue={resList?.user?.bod}
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
                                    defaultValue={moment(resList?.user?.bod, "YYYY-MM-DD")}
                                    onChange = {dataPick}
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                            </Col>
                </Row>
                <Row>
                    <Button onClick={handleOpenModal}>Изменить пароль</Button>
                    <CustomModal
                        title="Изменить пароль"
                        visible={modalVisible}
                        onOk={handleModalOk}
                        onCancel={handleCloseModal}
                    >
                         <PasswordInput setPassword={setPassword} setNewPassword={setNewPassword}/>
                    </CustomModal>
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
                </Form>
            </>
        }
        </div>
    )
}

export default UserUpdate;