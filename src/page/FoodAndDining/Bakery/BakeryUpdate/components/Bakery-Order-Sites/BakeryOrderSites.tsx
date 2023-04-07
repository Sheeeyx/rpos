import React from "react";
import { Row, Button, Typography, Input } from "antd";
import MultiField from "../../../../../../components/MultiField/MultiField";

const { Title } = Typography;




export const BakeryOrderSite = ({order}:any) => {
    return(
        <>
            <div style={{ marginTop: 16 }}>
                <Title level={4}>Order sites</Title>
                <MultiField
                    label="Website"
                    defaultValue= {order}
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