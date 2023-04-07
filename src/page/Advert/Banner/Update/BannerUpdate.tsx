import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { toast } from "react-toastify";
import UploadImg from "../../../../components/Upload/UploadImg";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import queryClient from "../../../../configs/react-query.config";
import useUpdateChabad from "../../../../services/mutation/jewish-resources/chabad/update/use-update-chabad";
import moment from "moment";
import useUpdateBanner from "../../../../services/mutation/advertisement/banner/update/use-update-banner";
import { useDetailsBanner } from "../../../../services/queries/use-detail-banner";
import { SpinLoader } from "../../../../components/Spin/spin";

const RangePicker: any = DatePicker.RangePicker

const { Title } = Typography;

const BannerUpdate = () => {

    const { mutate } = useUpdateBanner();
    
    const [imgId, setImgId] = useState([]);

    const params = useParams();

    const navigate = useNavigate()

    const detail = useDetailsBanner(params.id as string);

    useEffect(()=>{

        if(detail.data?.file.id){

            setImgId([detail.data.file.id] as any);
          
        }

    }, [detail.data?.file])


    const onSubmit = (data:any) => {
      mutate({data : {
        title: data.title,
        algorithm: "regular",
        url: data.url,
        file: imgId[0],
      } ,
      id: params.id} as any, {
            onSuccess: () => {
                queryClient.invalidateQueries(`banner${params.id}`);
                toast.success("Banner update successfully");
                navigate("/advert/banner/list");
            },  
            onError: () => {
                toast.error("Something went wrong. Please try again");
            },
        });
    };

    
    

    return (
        <>
         <div className="wrapper">
            <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                Update Banner
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
                <NavLink to="/advert/banner/list">Go Back</NavLink>
        </Button>
        {!detail.isLoading ?
        (
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
                       <UploadImg setImgIdList = {setImgId} onesType files = {[detail.data.file] as any} cropSize = {3 / 1} type = "gif"/>
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
       </Row>) : <SpinLoader/>
        }
       
        </>
    );
};

export default BannerUpdate;
