import React, { useState } from "react";
import { Typography } from "antd";
import { Route, Routes } from "react-router-dom";
import IdeasList from "./List/IdeasList";


const { Title } = Typography;

 export const Ideas = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            <Routes>
                <Route path="list" element={<IdeasList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

