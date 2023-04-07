import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { toast } from "react-toastify";
import UploadImg from "../../../../components/Upload/UploadImg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetRetrivew } from "../../../../services/queries/use-get-chabad-retriview";
import Map from "../../../../components/Maps/Maps";
import queryClient from "../../../../configs/react-query.config";
import useUpdateChabad from "../../../../services/mutation/jewish-resources/chabad/update/use-update-chabad";
import { SpinLoader } from "../../../../components/Spin/spin";

const ChabadUpdate = () => {
    const { mutate } = useUpdateChabad();
    const [imgIdList, setImgIdList] = useState([]); 
    const [selectTags, setSelectTags] = useState([]);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [placeName, setPlaceName] = useState();


    const navigate = useNavigate();

    const params = useParams();

    const detail = useGetRetrivew(params.id);

    const onFinish = (data, id) => {
        mutate(
            {
                data: {
                    ...data,
                    files: imgIdList,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    place_name: placeName,
                    tag: selectTags,
                    ...location,
                },
                id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`chabad${id}`);
                    toast.success("Chabad updated successfully");
                    navigate("/jewish-resources/chabad/list");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    useEffect(()=>{
        detail.data?.files.map((item)=>{
            setImgIdList((prev)=>[...prev ,item.id])
        })
    },[detail.data?.files]);


    return (
        <div>
            <Title level={2} style={{ marginBottom: 50, gap: 25 }}>
                Update Chabad
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
                <NavLink to="/jewish-resources/chabad/list"> Go Back</NavLink>
            </Button>
            {!detail.isLoading ? (

            <Form  onFinish={(data) => onFinish(data, params.id)}>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem
                                label={"Name"}
                                name="name"
                                initialValue={detail.data.name}
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
                                initialValue={detail.data.country}
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
                                initialValue={detail.data.phone_number}
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
                                initialValue={detail.data.city}
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
                    <Row>
                        <FormItem>
                            <Title level={4}>Add images</Title>
                            <UploadImg setImgIdList={setImgIdList} files = {detail.data?.files} cropSize = {1.55 / 1}/>
                        </FormItem>
                    </Row>
                    {
                    (imgIdList.length > 0 && imgIdList.length < 3) &&
                    <div style={{color: 'red', padding: '0 0 20px'}}>
                        Please insert three images !
                    </div>
                    }
                    <Row>
                        <Col style={{ width: "100%", marginBottom: 20 }}>
                            <FormItem
                                label={"Description"}
                                name="type_model"
                                initialValue={detail.data.description}
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
                   
                    <Col style={{ width: "100%", marginBottom: 20 }}>
                        <FormItem
                            label={"What note should pay attention"}
                            name="please_note"
                            initialValue={detail.data.please_note}
                        >
                            <TextArea showCount maxLength={400} />
                        </FormItem>
                    </Col>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem label={"Website URL"} name="website" initialValue={detail.data.website}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Facebook URL"} name="facebook_url" initialValue={detail.data.facebook_url}>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row justify="start" gutter={30}>
                        <Col span={9}>
                            <FormItem label={"Twitter URL"} name="twitter_url" initialValue={detail.data.twitter_url}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={9}>
                            <FormItem label={"Instargam URL"} name="instagram_url" initialValue={detail.data.instagram_url}>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>

                    <div style={{marginTop: 50}}>
                        <Title level={4}>Address</Title>
                        <Map setLocation = {setLocation} setPlaceName = {setPlaceName}
                            defaultAddress = {{
                                lat: +detail.data.latitude,
                                lng: +detail.data.longitude
                            }}
                            defaultPlaceName = {detail.data.place_name}
                        />
                    </div>

                    <Row justify="end" style={{ marginTop: 40 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: 120, fontSize: 18 }}
                            disabled = {!(imgIdList.length > 2)}
                        >
                            Save
                        </Button>
                    </Row>
                </Form>
                ) : <SpinLoader/>
                }
        </div>
    );
};

export default ChabadUpdate;
