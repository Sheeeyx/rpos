import React, { useState, useEffect } from "react";
import { Button, Row, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import UploadImg from "../../../../../../components/Upload/UploadImg";
import useUpdateMedia from "../../../../../../services/mutation/food-and-dining/restaurant/update/media/use-update-media";
import { useParams } from "react-router-dom";
import queryClient from "../../../../../../configs/react-query.config";
import { toast } from "react-toastify";
import useUpdateBakeryMedia from "../../../../../../services/mutation/food-and-dining/bakery/update/media/use-update-bakery-media";
import useUpdateSupermarketMedia from "../../../../../../services/mutation/food-and-dining/supermarket/update/media/use-update-supermarket-media";

const { Title } = Typography;


export const SupermarketMedia = ({media}:any) => {
    const [imgIdList, setImgIdList] = useState([]);
    const params = useParams();
    const {mutate} = useUpdateSupermarketMedia();


    const onFinish = (id:any) => {
        mutate (
            {
                files: imgIdList,
                id
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(`detail-supermarket${id}`);
                    toast.success("Media updated successfully");
                },
                onError: () => {
                    toast.error("Something went wrong. Please try again");
                },
            }
        )
    }

    
    useEffect(()=>{
        media.map((item:any)=>{
            setImgIdList((prev):any=>[...prev ,item.id])
        })
    },[]);

    return (
        <>
            <Row style = {{marginTop: 30}}>
                <FormItem name="images">
                    <Title level={4}>Add images</Title>
                    <UploadImg setImgIdList={setImgIdList} files = {media} cropSize = {1.53 / 1}/>
                </FormItem>
            </Row>
            {
                (imgIdList.length > 0 && imgIdList.length < 3) &&
                <div style={{color: 'red', padding: '0 0 20px'}}>
                    Please insert three images !
                </div>
            }
            <Row justify="end" style={{ marginTop: 40 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 120, fontSize: 18 }}
                    onClick={() => onFinish(params.id)}
                    disabled = {!(imgIdList.length > 2)}
                >
                    Save
                </Button>
            </Row>
        </>
    )
}