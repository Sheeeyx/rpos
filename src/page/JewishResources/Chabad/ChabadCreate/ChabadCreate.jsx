import { Button, Col, Form, Row, Select, Typography } from "antd";
import UploadImg from "../../../../components/Upload/UploadImg";
import { Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
// import "./Restaurant.sass";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import useCreateChabad from "../../../../services/mutation/jewish-resources/chabad/create/use-create-chabad";
import Map  from "../../../../components/Maps/Maps";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetFoodTypeTags } from "../../../../services/queries/use-food-type-tags";
import { useGetGoodForTags } from "../../../../services/queries/use-get-good-for";
import { useGetItHasTags } from "../../../../services/queries/use-get-it-has-tags";
import { useGetServiceOptionTags } from "../../../../services/queries/use-get-service-option";


const { Title } = Typography;

export const ChabadCreate = () => {
    
    const navigate = useNavigate();
    const CreteChabad = useCreateChabad();
    const [selectTags, setSelectTags] = useState([]);
    const [location, setLocation] = useState({latitude: 0, longitude: 0});
    const [imgIdList, setImgIdList] = useState([]); 
    const [placeName, setPlaceName] = useState();

    
    const onSubmit = (data) => {
        
        CreteChabad.mutate(
            {
                ...data,
                latitude: location.latitude,
                longitude: location.longitude,
                creator: "Johnson",
                place_name: placeName,
                files: imgIdList,
                ...location,
            },
            {
                onSuccess: () => {
                    toast.success("Chabad created successfully");
                    navigate("/jewish-resources/chabad/list");
                },
                onError: () => {
                    toast.error("Error creating Chabad");
                },
            }
        );
    };

   
    return (
        <div className="restaurant">
            <Title level={3} style={{ marginBottom: 30 }}>
                Chabad Create
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
                <NavLink to="/jewish-resources/chabad/list">Go Back</NavLink>
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
                    <Row>
                        <FormItem>
                            <Title level={4}>Add images</Title>
                            <UploadImg setImgIdList = {setImgIdList} cropSize = {1.55 / 1}/>
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

                    <div style={{marginTop: 50}}>
                        <Title level={4}>Address</Title>
                        <Map setLocation = {setLocation} setPlaceName = {setPlaceName}/>
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
            </div>
        </div>
    );
};
