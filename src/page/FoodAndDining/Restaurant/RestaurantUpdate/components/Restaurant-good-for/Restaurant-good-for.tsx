import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useGetGoodForTags } from "../../../../../../services/queries/use-get-good-for";
import queryClient from "../../../../../../configs/react-query.config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useUpdateGoodForOption from '../../../../../../services/mutation/food-and-dining/restaurant/update/good-for/use-update-good-for'

const { Title } = Typography;
const { Option } = Select


export const RestaurantGoodFor = ({dataGoodFor}:any) => {
    const getGoodForTags =   useGetGoodForTags();
    const  [goodForList, setgoodForList] = useState([]);
    const [options, setOptions] = useState([]);
    const { mutate, isLoading } = useUpdateGoodForOption();
    const { id } = useParams();

    const goodFor = [] as any


    useEffect(()=>{
        dataGoodFor.map((item:any)=>{
           goodFor.push(item.id)
        })
    },[dataGoodFor]);

    
    const handleSubmit = () => {
        mutate(
            { good_for: goodForList, 
                id
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`detail-restaurant${id}`);
                    toast.success("Good for updated successfully");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    return (
        <>
            <Row style={{ width: "100%", marginBottom: 20 }}>
                <Row style={{ width: "100%", marginBottom: 10 }}>
                <Title level={4}>Good for</Title>
                </Row>
                <Col span={24}>
                <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={goodFor}
                        onChange={(value) => {
                                setgoodForList(value)
                            }}
                >
                    {getGoodForTags.data && (getGoodForTags.data.results).map((item:any)=>
                                <Option value={item.id} label={item.name}>
                                    <div className="demo-option-label-item">
                                        {item.name}
                                    </div>
                              </Option>
                            )}
            </Select>
            </Col>
            </Row>
            <Row justify="end" style={{ marginTop: 40 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit}
                    disabled = {!(goodForList.length > 0)}
                    style={{ width: 120, fontSize: 18 }}
                >
                    Save
                </Button>
            </Row>
            </>
    )
}