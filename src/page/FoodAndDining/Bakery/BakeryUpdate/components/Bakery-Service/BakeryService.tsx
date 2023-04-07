import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { useGetServiceOptionTags } from "../../../../../../services/queries/use-get-service-option";
import { toast } from "react-toastify";
import queryClient from "../../../../../../configs/react-query.config";
import useUpdateBakeryServiceOption from "../../../../../../services/mutation/food-and-dining/bakery/update/service-options/use-update-service-option";

const { Title } = Typography;
const { Option } = Select;



export const BakeryServiceOption = ({dataService}:any) => {

    const { id } = useParams();
    const  [ serviceOptionsList, setserviceOptionsList ] = useState([]);
    const getServiceOptionTags =  useGetServiceOptionTags();
    const { mutate, isLoading } = useUpdateBakeryServiceOption(id);
    const serviceOptions = [] as any

        useEffect(()=>{
            dataService.map((item:any)=>{
                serviceOptions.push(item.id)
            })
            
        },[dataService]);


        const handleSubmit = () => {
                mutate(
                    { service_option: serviceOptionsList},
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries(`details-bakery${id}`);
                            toast.success("Service Options updated successfully");
                        },
                        onError: () => {
                            toast.error("Something went wrong. Please try again");
                        },
                    }
                );
            };


    return (
        <>
            <Row style={{ width: "100%", marginBottom: 40 }}>
                <Row style={{ width: "100%", marginBottom: 10 }}>
                <Title level={4}>Service options</Title>
                </Row>
                <Col span={24}>
                <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={serviceOptions}
                        onChange={(value) => {
                                setserviceOptionsList(value)
                        }} 
            >
                    {getServiceOptionTags.data && getServiceOptionTags.data.results.map((item:any, index:any)=>
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
                disabled = {!(serviceOptionsList.length > 0)}
                style={{ width: 120, fontSize: 18 }}
                onClick = {handleSubmit}
            >
                Save
            </Button>
        </Row>
        </>
    )
}