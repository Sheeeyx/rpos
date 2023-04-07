import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useGetItHasTags } from "../../../../../../services/queries/use-get-it-has-tags";
import { toast } from "react-toastify";
import queryClient from "../../../../../../configs/react-query.config";
import { useParams } from "react-router-dom";
import useUpdateFoodServiceItHas from "../../../../../../services/mutation/food-and-dining/food-service/update/it-has/use-update-ithas";

const { Title } = Typography;
const { Option } = Select;



export const FoodServiceItHas = ({dataItHas}:any) => {
    const {id} = useParams();
    const  [itHasList, setitHasList] = useState([]);
    const getItHasTags = useGetItHasTags();
    const { mutate, isLoading } = useUpdateFoodServiceItHas(id);
    const itHasOptions = [] as any

    useEffect(()=>{
        dataItHas.map((item:any)=>{
            itHasOptions.push(item.id)
    })
    },[dataItHas]);

    const handleSubmit = () => {
        mutate(
            { it_has: itHasList},
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`detail-food-service${id}`);
                    toast.success("It-Has updated successfully");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        );
    };

    return (
        <>
                <div>
                    <Row style={{ width: "100%", marginBottom: 40 }}>
                        <Row style={{ width: "100%", marginBottom: 10 }}>
                        <Title level={4}>It has</Title>
                        </Row>
                        <Col span={24}>
                        <Select
                                mode="multiple"
                                allowClear
                                defaultValue = {itHasOptions}
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={(value) => {
                                        setitHasList(value)
                                    }} 
                    >
                            {getItHasTags.data && (getItHasTags.data.results).map((item:any)=>
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
                            disabled = {!(itHasList.length > 0)}
                            style={{ width: 120, fontSize: 18 }}
                        >
                            Save
                        </Button>
                    </Row>
                </div>
        </>
    )
}