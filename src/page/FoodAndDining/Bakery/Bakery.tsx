import React, { RefObject, useRef, useState } from "react";
import { Typography, Input, Row, Button, Form } from "antd";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import BakeryList from "./BakeryList/BakeryList";
import { BakeryUpdate } from "./BakeryUpdate/BakeryUpdate";

const { Title } = Typography;

 export const Bakery = () => {
    const [page, setPage] = useState();
    return (
        <>
            <div className="wrapper">
               
            </div>
            <Routes>
                <Route path="update/:id" element={<BakeryUpdate />} />
                <Route path="list" element={<BakeryList page = {page} setPage = {setPage} />} />
                {/* <Route path="create" element={<FaqCreate />} /> */}
            </Routes>
        </>
    );
};

