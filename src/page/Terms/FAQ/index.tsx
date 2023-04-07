import React, { RefObject, useRef, useState } from "react";
import { Typography, Input, Row, Button, Form } from "antd";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { FaqCreate } from "./FaqCreate";
import FaqList from "./FaqList";
import "./Faq.sass";
import { FaqUpdate } from "./FaqUpdate";

const { Title } = Typography;

 export const Faq = () => {
   
    return (
        <>
            <div className="wrapper">
                <Title style={{ marginBottom: "26px", fontSize: "30px" }}>
                    FAQ
                </Title>
                
            </div>
            <Routes>
                <Route path="update/:id" element={<FaqUpdate />} />
                <Route path="list" element={<FaqList />} />
                <Route path="create" element={<FaqCreate />} />
            </Routes>
        </>
    );
};

