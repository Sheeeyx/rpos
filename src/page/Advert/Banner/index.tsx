import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Route, Routes } from "react-router-dom";
import BannerList from "./List/BannerList";
import BannerCreate from "./Create/BannerCreate";
import BannerUpdate from "./Update/BannerUpdate";




const Banner = ()=>{
    const [page, setPage] = useState(1);
    return(
        <>
        <Routes>
            <Route path="create" element={<BannerCreate/>} />
            <Route path="list" element={<BannerList page = {page} setPage = {setPage}/>} />
            <Route path="update/:id" element={<BannerUpdate/>} />
        </Routes>
    </>
    );


}

export default Banner;