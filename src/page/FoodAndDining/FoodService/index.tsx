import React, { useState } from "react";
import { Typography } from "antd";
import {Route, Routes } from "react-router-dom";
import FoodServiceList from "./List/FoodServiceList";
import { FoodServiceUpdate } from "./Update/FoodServiceUpdate";


const { Title } = Typography;

 export const FoodService = () => {
    const [page, setPage] = useState(1);
    return (
        <>
           
            <Routes>
                <Route path="update/:id" element={<FoodServiceUpdate />} />
                <Route path="list" element={<FoodServiceList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};
