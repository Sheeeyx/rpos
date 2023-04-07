import React, {useState } from "react";
import { Route, Routes } from "react-router-dom";
import TakeoutList from "./List/TakeoutList";
import { TakeOutUpdate } from "./Update/TakeoutUpdate";

 export const Takeout = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            <Routes>
                <Route path="update/:id" element={<TakeOutUpdate />} />
                <Route path="list" element={<TakeoutList page = {page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

