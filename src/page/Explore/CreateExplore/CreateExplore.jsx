import React, { useState,useRef } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { toast } from "react-toastify";
import UploadImg from "../../../components/Upload/UploadImg";
import useCreateExplore from "../../../services/mutation/explore/create-explore/create/use-create-explore";
import { useGetExploreTags } from "../../../services/queries/use-get-explore-tags";
import { NavLink, useNavigate } from "react-router-dom";
import "./CreateExplore.sass";
import Map  from "../../../components/Maps/Maps";
import Wsiwyg from "../../../components/Wsiwyg/Wsiwyg";


const CreateExplore = () => {
    const createExplore = useCreateExplore();
    const [imgIdList, setImgIdList] = useState([]);
    const [selectTags, setSelectTags] = useState([]);
    const [placeName, setPlaceName] = useState();
    const { data: tagsList } = useGetExploreTags();
    const [checkImg, setCheckImg] = useState(false);
    const [location, setLocation] = useState({latitude: 0, longitude: 0});
    const navigate = useNavigate();


    const [value, setValue] = useState({description: ""});


    const handleChange = (value)=>{
        setValue({description: value})
    }


    const checkClick = () => {
        if(imgIdList.length === 0){
            setCheckImg(true)
        } else {
            setCheckImg(false)
        }
    }
    
    const onFinish = (data) => {
        console.log(data)
        createExplore.mutate(
            {
                ...data,
                images: imgIdList,
                tag: selectTags,
                ...location,
                place_name: placeName,
            },
            {
                onSuccess: () => {
                    toast.success("Explore created successfully");
                    navigate("/explore/explore-list");
                },
                onError: () => {
                    toast.error("Error creating explore");
                },
            }
        );
    };

    return (
        <div>
            <Title level={2} style={{ marginBottom: 50, gap: 25 }}>
                Explore
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
                <NavLink to="/explore/explore-list">Go Back</NavLink>
            </Button>
            <Form onFinish={onFinish}>
                <Row justify="start" gutter={30}>
                    <Col span={9}>
                        <FormItem
                            label={"Title"}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your title!",
                                },
                            ]}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: "100%", marginBottom: 40 }}>
                        <FormItem
                            label={"Description"}
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description!",
                                },
                            ]}
                        >
                            <Wsiwyg value={value.description?.editorHtml} onChange = {handleChange}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row justify="start" gutter={30}>
                    <Col span={9} style={{marginBottom: 40 }}>
                        <FormItem
                            label={"Country"}
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your country!",
                                },
                            ]}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={9} style={{marginBottom: 20 }}>
                        <FormItem
                            label={"City"}
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your city!",
                                },
                            ]}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                <Col span={24}  style ={{marginTop: 10}}>
                    <FormItem name="images">
                        <Title level={4}>Add images</Title>
                        <UploadImg setImgIdList={setImgIdList} cropSize = {false}/>
                        {(checkImg && imgIdList.length === 0) &&
                                <p style={{color: 'red'}}>Upload image please!</p>
                            }
                    </FormItem>

                </Col>
                </Row>

                <Row style={{ marginTop: 30, gap: 25 }}>
                    <Col span={24}>
                        <Title level={4}>Explore Tags</Title>
                    </Col>
                    <Col span={24}>
                        <FormItem
                                name="Explore tags"
                                rules={[
                                {
                                    required: true,
                                    message: "Please enter Explore tags !",
                                }
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    getPopupContainer={trigger => trigger.parentNode}
                                    onChange={(value) => {
                                        for (let item of value) {
                                            setSelectTags([...selectTags, item]);
                                        }
                                    }}
                                >
                                        {tagsList?.results?.map((tag) => (
                                            <Select.Option key={tag.id} value={tag.id}>
                                                {tag.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                        </FormItem>
                    </Col>
                </Row>
                    <div style={{marginTop: 50}}>
                        <Title level={4}>Address</Title>
                        <Map setLocation = {setLocation} setPlaceName = {setPlaceName}/>
                    </div>
               
                <Row justify="end" style={{ marginTop: 40 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: 120, fontSize: 18 }}
                        onClick={checkClick}
                    >
                        Save
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default CreateExplore;
