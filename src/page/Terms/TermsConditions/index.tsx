import React from "react";
import { Typography} from "antd";
import {Route, Routes } from "react-router-dom";
import { TermsConditionsList } from "./List/TermsList";
import { TermsCreate } from "./Create/termsCreate";
import { TermsConditionUpdate } from "./Update";

const { Title } = Typography;

export const TermsConditions: React.FC = () => {
 

    return (
        <>
            <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                Terms and Conditions
            </Title>
            <Routes>
                <Route path="update/:id" element={<TermsConditionUpdate />} />
                <Route path="list" element={<TermsConditionsList />} />
                <Route path="create" element={<TermsCreate />} />
            </Routes>
           
        </>
    );
};
