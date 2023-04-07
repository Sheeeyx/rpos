import React from "react";
import { Typography} from "antd";
import {Route, Routes } from "react-router-dom";
import { PrivacyPolicyCreate } from "./Create/PrivacyPolicyCreate";
import {PrivacyPolicyList} from "./List/PrivacyPolicyList";
import { PrivacyPolicyUpdate } from "./Update";

const { Title } = Typography;

export const PrivacyPolicy: React.FC = () => {
 

    return (
        <>
            <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                Privacy Policy
            </Title>
            <Routes>
                <Route path="update/:id" element={<PrivacyPolicyUpdate />} />
                <Route path="list" element={<PrivacyPolicyList />} />
                <Route path="create" element={<PrivacyPolicyCreate />} />
            </Routes>
           
        </>
    );
};
