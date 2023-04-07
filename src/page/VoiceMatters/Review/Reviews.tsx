import React, { useState } from "react";
import { Typography } from "antd";
import { Route, Routes} from "react-router-dom";
import ReviewsList from "./List/ReviewsList";
const { Title } = Typography;

 export const Reviews = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            <Routes>
                <Route path="list" element={<ReviewsList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

