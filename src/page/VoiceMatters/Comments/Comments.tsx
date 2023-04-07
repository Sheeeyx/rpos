import React, { useState } from "react";
import { Typography } from "antd";
import { Route, Routes } from "react-router-dom";
import IdeasList from "./List/CommentsList";


const { Title } = Typography;

 export const Comments = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            <Routes>
                <Route path="list" element={<IdeasList  page = {page} setPage = {setPage}/>} />
            </Routes>
        </>
    );
};

