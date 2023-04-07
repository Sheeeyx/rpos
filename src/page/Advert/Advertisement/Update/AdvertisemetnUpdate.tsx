import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { toast } from "react-toastify";
import UploadImg from "../../../../components/Upload/UploadImg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import queryClient from "../../../../configs/react-query.config";
import useUpdateChabad from "../../../../services/mutation/jewish-resources/chabad/update/use-update-chabad";
import useUpdateAdvertisement from "../../../../services/mutation/advertisement/ads/update/use-update-advertisement";
import moment from "moment";
import { useDetailsAdvetisement } from "../../../../services/queries/use-detail-advertisment";
import { AlgorithmList } from "../../components/algorithm/algorithm";
import { SpinLoader } from "../../../../components/Spin/spin";

const Datapickers: any = DatePicker

const { Title } = Typography;

const AdvertisementUpdate = () => {

    const { mutate } = useUpdateAdvertisement();
    
    const [imgId, setImgId] = useState([]);
    const [status, setStatus] = useState(null);
    const [initialDate, setInitialDate] = useState<any>()

    const dataPick = (data:any,dateString:any) => {
        setInitialDate(dateString)
    }


    const params = useParams();

    const navigate = useNavigate()

    const detail = useDetailsAdvetisement(params.id as string);

    useEffect(()=>{

        if(detail.data?.file.id){

            setImgId([detail.data.file.id] as any);
          
        }

    }, [detail.data?.file])


    const onSubmit = (data:any) => {
        

        const startDate = moment.utc(data.startDate).format('YYYY-MM-DD');
        const endDate = (data.endDate) ? (data.endDate).format('YYYY-MM-DD') : null;


       
      mutate({data : {
        title: data.title,
        algorithm: status,
        url: data.url,
        file: imgId[0],
        start_date: startDate,
        end_date: endDate
      } ,
      id: params.id} as any, {
            onSuccess: () => {
                queryClient.invalidateQueries(`advertisement${params.id}`);
                toast.success("Advertisement update successfully");
                navigate("/advert/advertisement/list");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    console.log(detail);
    

    return (
        <>
        <Button
                style={{
                    position: "absolute",
                    top: "29px",
                    right: "32px",
                }}
                type="default"
                size="large"
            >
                <NavLink to="/advert/advertisement/list">Go Back</NavLink>
        </Button>
        {!detail.isLoading ? (
        
        <Row>

        <Form  onFinish={onSubmit} style={{width: "100%"}}>
               <Row justify="start" gutter={[30, 20]}>
                   <Col span={9}>
                       <FormItem
                           label="Title"
                           name="title"
                           initialValue = {detail.data.title}
                           rules={[
                               {
                                   required: true,
                                   message:
                                       "Please enter title",
                               },
                           ]}
                       >
                           <Input />
                       </FormItem>
                   </Col>
                   <Col span={9}>
                       <FormItem
                           label={"Url"}
                           name="url"
                           initialValue = {detail.data.url}
                           rules={[
                               {
                                   required: true,
                                   type:'url',
                                   message: `Please enter correct URL!
                                        example: "https://example.com"`,
                               },
                           ]}
                       >
                           <Input />
                       </FormItem>
                   </Col>
                  <Col span={24}>
                  <FormItem>
                       <Title level={4}>Add image</Title>
                       <UploadImg setImgIdList = {setImgId} onesType files = {[detail.data.file] as any} cropSize = {2 / 1}/>
                       </FormItem>
                  </Col>

                  <Col span={24}>
                       <FormItem>
                            <Title level={4} style={{marginBottom: 20}}>Select your advertising algorithm</Title>
                            <AlgorithmList setStatus = {setStatus} defaultValue = {detail.data.algorithm} />
                        </FormItem>
                    </Col>

                   <Col span={9}>
                      
                       <FormItem
                                label={"Start time"}
                                name="startDate"
                                initialValue = {moment(detail.data.start_date, "YYYY-MM-DD")}
                                rules={[
                                    {
                                        
                                        required: true,
                                        message: "Please enter time",
                                    },
                                ]}
                            >
                                
                                 <Datapickers 
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode} 
                                    defaultValue={moment(detail.data.start_date, "YYYY-MM-DD")}
                                    disabledDate={(current:any) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                      }} 
                                    onChange = {dataPick}
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                            <FormItem
                                label={"End time"}
                                name="endDate"
                            >
                                
                                 <Datapickers 
                                    getPopupContainer={(triggerNode:any) => triggerNode.parentNode}
                                    defaultValue={detail.data.end_date ? moment(detail.data.end_date, "YYYY-MM-DD") : false}
                                    disabledDate={(current:any) => {
                                        let customDate = moment(initialDate).format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD").add(1, 'day');
                                      }} 
                                    // defaultValue={moment()}  
                                    format={'YYYY-MM-DD'} /* showTime  *//>
                              
                            </FormItem>
                   </Col>
               </Row>
               <Row justify="end" style={{ marginTop: 40 }}>
                   <Button
                       type="primary"
                       htmlType="submit"
                       style={{ width: 120, fontSize: 18 }}
                   >
                       Save
                   </Button>
               </Row>
           </Form>
       </Row> ) : <SpinLoader />
        }
       
        </>
    );
};

export default AdvertisementUpdate;
