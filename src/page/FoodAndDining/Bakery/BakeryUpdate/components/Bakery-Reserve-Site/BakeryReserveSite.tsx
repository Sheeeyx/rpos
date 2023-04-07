import React from "react";
import { Row, Button, Typography, Input } from "antd";
import MultiField from "../../../../../../components/MultiField/MultiField";

const { Title } = Typography;

interface ReserveSiteProps{
    data: any
}


export const BakeryReserveSite: React.FC<ReserveSiteProps> = ({data}) => {
    return(
        <>
            <div style={{ marginTop: 16 }}>
                <Title level={4}>Reserve sites</Title>
                <MultiField
                    label="Website"
                    defaultValue={data}
                />
            </div>
            <Row justify="end" style={{ marginTop: 40 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 120, fontSize: 18 }}
                >
                    Save
                </Button>
            </Row>
        </>
    )
}