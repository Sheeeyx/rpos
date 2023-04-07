import React from "react";
import {Route, Routes} from "react-router-dom";
import ChabadList from "./ChabadList/ChabadList";

 export const Chabad = () => {
    const [page, setPage] = React.useState(1);
    return (
        <>
            <Routes>
                <Route path="list" element={<ChabadList page={page} setPage = {setPage} />} />
            </Routes>
        </>
    );
};

