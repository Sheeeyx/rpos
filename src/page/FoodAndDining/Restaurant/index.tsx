import React, { RefObject, useRef, useState } from "react";
import { Typography, Input, Row, Button, Form } from "antd";
import { Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import RestaurantList from "./RestaurantList/RestaurantList";
import { RestaurantUpdate } from "./RestaurantUpdate/RestaurantUpdate"

 export const Restaurant = () => {
    const [page, setPage] = useState(1);
    return (
        <>
          
            <Routes>
                <Route path="update/:id" element={<RestaurantUpdate />} />
                <Route path="list" element={<RestaurantList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

