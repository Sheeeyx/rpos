import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Route, Routes } from "react-router-dom";
import AdvertisementList from "./List/AdvertisementList";
import AdvertisementCreate from "./Create/AdvertisementCreate";
import AdvertisementUpdate from "./Update/AdvertisemetnUpdate";



const Advertisement = ()=>{
    const [page, setPage] = useState(1);
    return(
        <>
        <Routes>
            <Route path="create" element={<AdvertisementCreate/>} />
            <Route path="list" element={<AdvertisementList page = {page} setPage = {setPage}/>} />
            <Route path="update/:id" element={<AdvertisementUpdate/>} />
        </Routes>
    </>
    );


}

export default Advertisement;