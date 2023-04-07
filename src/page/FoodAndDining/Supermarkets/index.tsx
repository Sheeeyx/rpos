import React, { RefObject, useRef, useState } from "react";
import { Typography, Input, Row, Button, Form } from "antd";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import SupermarketsList from "./List/SupermarketsList";
import { SuperMarketUpdate } from "./Update/SuperMarketUpdate";


const { Title } = Typography;

 export const Supermarkets = () => {
    const [page, setPage] = useState();
    return (
        <>
            <Routes>
                <Route path="update/:id" element={<SuperMarketUpdate />} />
                <Route path="list" element={<SupermarketsList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

