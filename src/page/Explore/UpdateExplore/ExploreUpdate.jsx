import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { toast } from "react-toastify";
import UploadImg from "../../../components/Upload/UploadImg";
import { useGetExploreTags } from "../../../services/queries/use-get-explore-tags";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetRetrivew } from "../../../services/queries/use-get-explore-retrivew";
import useUpdateExplore from "../../../services/mutation/explore/create-explore/update/use-update-explore";
import Map from "../../../components/Maps/Maps";
import queryClient from "../../../configs/react-query.config";
import { SpinLoader } from "../../../components/Spin/spin";
import Wsiwyg from "../../../components/Wsiwyg/Wsiwyg";

const { Option } = Select;

const ExploreUpdate = () => {
    const { mutate } = useUpdateExplore();
    const [imgIdList, setImgIdList] = useState();
    const [selectTags, setSelectTags] = useState([]);
    const { data: tagsList } = useGetExploreTags();
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [options, setOptions] = useState([]);
    const [checkImg, setCheckImg] = useState(false);
    const [placeName, setPlaceName] = useState();

    
    const checkClick = () => {
        if(imgIdList.length === 0){
            setCheckImg(true)
        } else {
            setCheckImg(false)
        }
    }

    const navigate = useNavigate();

    const params = useParams();

    const detail = useGetRetrivew(params.id);

    const [value, setValue] = useState({description: ""});


    const handleChange = (value)=>{
        setValue({description: value})
    }
    

    useEffect(()=>{

        if(detail.data){
            setLocation({ latitude: parseInt(detail.data.latitude), longitude: parseInt(detail.data.longitude) })
        }
    
    }, [detail.data])


    useEffect(()=>{
        detail?.data?.images.map((item)=>{
            setImgIdList((prev)=>prev ? [...prev ,item.id] : [item.id])
        })
    },[detail?.data?.images]);


    const onFinish = (data, id) => {
        mutate(
            {
                data: {
                    ...data,
                    images: imgIdList,
                    tag: selectTags,
                    place_name: placeName,
                    ...location,
                },
                id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`explore${id}`);
                    toast.success("Explore updated successfully");
                    navigate("/explore/explore-list");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };


    useEffect(()=>{
        if(detail.data?.tags){
            detail.data?.tags.map((item)=>{
                setOptions((prevTags)=>[...prevTags ,item.id])
                setSelectTags((prevTags)=>[...prevTags ,item.id])
    
                })
        }
        console.log(detail.data?.tags);
        
    },[detail.data?.tags]);   

    return (
        // <>
        //     { options.length !== 0  &&
        <div>
            <Title level={2} style={{ marginBottom: 50, gap: 25 }}>
                Update Explore
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
                <NavLink to="/explore/explore-list"> Go Back</NavLink>
            </Button>
                {!detail.isLoading && detail.data ? (
                    <Form onFinish={(data) => onFinish(data, params.id)}>
                        <Row justify="start" gutter={30}>
                            <Col span={9}>
                                <FormItem
                                    label={"Title"}
                                    name="title"
                                    initialValue={detail.data.title}
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
                            <Col style={{ width: "100%", marginBottom: 20 }}>
                                <FormItem
                                    label={"Description"}
                                    name="description"
                                    initialValue={detail.data.description}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your description!",
                                        },
                                    ]}
                                >
                                    <Wsiwyg value={value.description?.editorHtml} onChange = {handleChange}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row justify="start" gutter={30}>
                            <Col span={9}>
                                <FormItem
                                    label={"Country"}
                                    name="country"
                                    initialValue={detail.data.country}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your country!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={9}>
                                <FormItem
                                    label={"City"}
                                    name="city"
                                    initialValue={detail.data.city}
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
                        <Row style = {{marginTop: 30}}>
                            <FormItem name="images">
                                <Title level={4}>Add images</Title>
                                <UploadImg setImgIdList={setImgIdList} files = {detail.data.images} cropSize = {false}/>
                                {
                                    (checkImg && imgIdList.length === 0) &&
                                <p style={{color: 'red'}}>Upload image please!</p>
                                }
                            </FormItem>
                        </Row>
                        <Row
                            style={{
                                marginTop: "50px",
                                gap: 25,
                            }}
                        >
                         <Title level={4}>Explore Tags</Title>
                         {
                            
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: "100%"}}
                                placeholder="Please select"
                                getPopupContainer={trigger => trigger.parentNode}
                                defaultValue={options}
                                onChange={(value) => {
                                        setSelectTags(value);
                                }}
                            >
                            {console.log( tagsList?.results.length === 0  )}
                                {tagsList?.results?.map((item) => (
                                    <Option value={item.id} label={item.name}>
                                    <div className="demo-option-label-item">
                                        {item.name}
                                        
                                    </div>
                                    </Option>
                                ))}
                            </Select>
                         }
                         {selectTags.length === 0 && tagsList?.results.length !== 0  &&
                           <p style={{color:'red', marginTop:'6px'}}>Please select explore tags!</p>
                         }
                         { tagsList?.results.length === 0  &&
                           <p style={{color:'red', marginTop:'6px'}}>Please create explore tags!</p>

                         }
                        </Row>

                        <div style={{ marginTop: 50 }}>
                            <Title level={4}>Address</Title>
                            <Map setLocation={setLocation} location = {location} 
                               defaultAddress = {{
                                lat: +detail.data.latitude,
                                lng: +detail.data.longitude
                                }}
                                defaultPlaceName = {detail.data?.place_name}
                                setPlaceName ={setPlaceName}
                            />
                        </div>
                       
                        <Row justify="end" style={{ marginTop: 40 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: 120, fontSize: 18 }}
                                disabled = {!(selectTags.length > 0)}
                                onClick={checkClick}
                            >
                                Save
                            </Button>
                        </Row>
                    </Form>
                ) : <SpinLoader/>
                }
            </div>
            // }
        // </>
    );
};

export default ExploreUpdate;
