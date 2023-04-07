import React from "react";
import { Typography} from "antd";
import {Route, Routes } from "react-router-dom";
import {LegalNoticesCreate  } from "./Create";
import {LegalNoticesList} from "./List/LegalNoticesList";
import { LegalNoticeUpdate } from "./Update";
const { Title } = Typography;

 export const LegalNotices = () => {
   
    return (
        <>
            <div className="wrapper">
                <Title style={{ marginBottom: "40px", fontSize: "30px" }}>
                  Legal Notices
                </Title>
                
            </div>
            <Routes>
                <Route path="update/:id" element={<LegalNoticeUpdate />} />
                <Route path="list" element={<LegalNoticesList />} />
                <Route path="create" element={<LegalNoticesCreate />} />
            </Routes>
        </>
    );
};

